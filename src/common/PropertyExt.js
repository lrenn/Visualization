"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3"], factory);
    } else {
        root.common_PropertyExt = factory(root.d3);
    }
}(this, function (d3) {
    var __meta_ = "__meta_";
    var __prop_ = "__prop_";

    function Meta(id, defaultValue, type, description, set, ext) {
        this.id = id;
        this.type = type;
        this.origDefaultValue = defaultValue;
        this.defaultValue = defaultValue;
        this.description = description;
        this.set = set;
        this.ext = ext || {};

        switch (type) {
            case "set":
                this.checkedAssign = function (_) {
                    if (!set || set.indexOf(_) < 0) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "html-color":
                this.checkedAssign = function (_) {
                    if (window.__hpcc_debug && _ && _ !== "red") {
                        var litmus = "red";
                        var d = document.createElement("div");
                        d.style.color = litmus;
                        d.style.color = _;
                        //Element's style.color will be reverted to litmus or set to "" if an invalid color is given
                        if (d.style.color === litmus || d.style.color === "") {
                            console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                        }
                    }
                    return _;
                };
                break;
            case "boolean":
                this.checkedAssign = function (_) {
                    return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
                };
                break;
            case "number":
                this.checkedAssign = function (_) {
                    return Number(_);
                };
                break;
            case "string":
                this.checkedAssign = function (_) {
                    return String(_);
                };
                break;
            case "array":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Array)) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "object":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Object)) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widget":
                this.checkedAssign = function (_) {
                    if (!_._class || _._class.indexOf("common_Widget") < 0) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widgetArray":
                this.checkedAssign = function (_) {
                    if (_.some(function (row) { return (!row._class || row._class.indexOf("common_Widget") < 0); })) {
                        console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            default:
                this.checkedAssign = function (_) {
                    if (window.__hpcc_debug) {
                        console.log("Unchecked property type for '" + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
        }
    }

    function MetaProxy(id, proxy, method, defaultValue) {
        this.id = id;
        this.type = "proxy";
        this.proxy = proxy;
        this.method = method;
        this.defaultValue = defaultValue;
    }

    function PropertyExt() {
        this.publishedProperties().forEach(function (meta) {
            switch (meta.type) {
                case "array":
                case "widgetArray":
                    this[__prop_ + meta.id] = [];
                    break;
            }
        }, this);
    }
    // Publish Properties  ---
    PropertyExt.prototype.publishedProperties = function () {
        var retVal = [];
        for (var key in this) {
            if (key.indexOf(__meta_) === 0) {
                retVal.push(this[key]);
            }
        }
        return retVal;
    };

    PropertyExt.prototype.publishedProperty = function (id) {
        return this[__meta_ + id];
    };

    PropertyExt.prototype.publish = function (id, defaultValue, type, description, set, ext) {
        if (this[__meta_ + id] !== undefined && !ext.override) {
            throw id + " is already published.";
        }
        var meta = this[__meta_ + id] = new Meta(id, defaultValue, type, description, set, ext);
        this[id] = function (_) {
            var isPrototype = this._id === undefined;
            if (!arguments.length) {
                return !isPrototype && this[__prop_ + id] !== undefined ? this[__prop_ + id] : meta.defaultValue;
            }
            if (_ === "" && meta.ext.optional) {
                _ = null;
            } else if (_ !== null) {
                _ = meta.checkedAssign(_);
            }
            if (isPrototype) {
                meta.defaultValue = _;
            } else {
                this.broadcast(id, _, this[__prop_ + id]);
                if (_ === null) {
                    delete this[__prop_ + id];
                } else {
                    this[__prop_ + id] = _;
                }
            }
            return this;
        };
        this[id + "_modified"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                return meta.defaultValue !== defaultValue;
            }
            return this[__prop_ + id] !== undefined;
        };
        this[id + "_exists"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                return meta.defaultValue !== undefined;
            }
            return this[__prop_ + id] !== undefined || meta.defaultValue !== undefined;
        };
        this[id + "_reset"] = function () {
            switch (type) {
                case "widget":
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].target(null);
                    }
                    break;
                case "widgetArray":
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].forEach(function (widget) {
                            widget.target(null);
                        });
                    }
                    break;
            }
            delete this[__prop_ + id];
        };
    };

    PropertyExt.prototype.publishWidget = function (prefix, WidgetType, id) {
        for (var key in WidgetType.prototype) {
            if (key.indexOf("__meta") === 0) {
                var publishItem = WidgetType.prototype[key];
                this.publishProxy(prefix + __prop_ + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    };

    PropertyExt.prototype.publishProxy = function (id, proxy, method, defaultValue) {
        method = method || id;
        if (this[__meta_ + id] !== undefined) {
            throw id + " is already published.";
        }
        this[__meta_ + id] = new MetaProxy(id, proxy, method, defaultValue);
        this[id] = function (_) {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default value of proxied properties is not supported.";
            }
            if (!arguments.length) return !defaultValue || this[id + "_modified"]() ? this[proxy][method]() : defaultValue;
            if (defaultValue && _ === defaultValue) {
                this[proxy][method + "_reset"]();
            } else {
                this[proxy][method](_);
            }
            return this;
        };
        this[id + "_modified"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default values of proxied properties is not supported.";
            }
            return this[proxy][method + "_modified"]() && (!defaultValue || this[proxy][method]() !== defaultValue);
        };
        this[id + "_reset"] = function () {
            var isPrototype = this._id === undefined;
            if (isPrototype) {
                throw "Setting default values of proxied properties is not supported.";
            }
            this[proxy][method + "_reset"]();
        };
    };

    PropertyExt.prototype.watch = function (func) {
        var context = this;
        var idx = this._watchArr.push(func) - 1;
        return {
            remove: function () {
                delete context._watchArr[idx];
            }
        };
    };

    PropertyExt.prototype.broadcast = function (key, newVal, oldVal) {
        if (this._watchArr && newVal !== oldVal) {
            this._watchArr.forEach(function (func) {
                if (func) {
                    setTimeout(function () {
                        func(key, newVal, oldVal);
                    }, 0);
                }
            });
        }
    };

    return PropertyExt;
}));