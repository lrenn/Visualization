"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Choropleth", "topojson", "./us-counties"], factory);
    } else {
        root.map_ChoroplethCounties = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usCounties);
    }
}(this, function (d3, Choropleth, topojson, usCounties) {
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
    ChoroplethCounties.prototype.constructor = ChoroplethCounties;
    ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

    ChoroplethCounties.prototype.testData = function () {
        var rawData = [
            { "county": 1073, "county_name": "JEFFERSON", "weight": 29.946185501741 }, { "county": 1097, "county_name": "MOBILE", "weight": 0.79566003616637 }, { "county": 1117, "county_name": "SHELBY", "weight": 1.5223596574691 }, { "county": 4005, "county_name": "COCONINO", "weight": 27.311773623042 }, { "county": 4013, "county_name": "MARICOPA", "weight": 34.386239749349 }, { "county": 4015, "county_name": "MOHAVE", "weight": 34.670437987486 }, { "county": 4019, "county_name": "PIMA", "weight": 31.969766028563 }, { "county": 4021, "county_name": "PINAL", "weight": 32.050522991908 }, { "county": 4025, "county_name": "YAVAPAI", "weight": 34.134956874683 }, { "county": 4027, "county_name": "YUMA", "weight": 39.511527048619 }, { "county": 5119, "county_name": "PULASKI", "weight": 21.796200345423 }, { "county": 6001, "county_name": "ALAMEDA", "weight": 30.243180376401 }, { "county": 6007, "county_name": "BUTTE", "weight": 32.895132965379 }, { "county": 6009, "county_name": "CALAVERAS", "weight": 31.181727904667 }, { "county": 6013, "county_name": "CONTRA COSTA", "weight": 32.185196670086 }, { "county": 6017, "county_name": "EL DORADO", "weight": 33.085461795452 }, { "county": 6019, "county_name": "FRESNO", "weight": 31.700962642409 }, { "county": 6023, "county_name": "HUMBOLDT", "weight": 31.504164625184 }, { "county": 6025, "county_name": "IMPERIAL", "weight": 33.086419753086 }, { "county": 6029, "county_name": "KERN", "weight": 31.370903445093 }, { "county": 6031, "county_name": "KINGS", "weight": 30.037376826368 }, { "county": 6037, "county_name": "LOS ANGELES", "weight": 32.862228288436 }, { "county": 6039, "county_name": "MADERA", "weight": 31.691553376421 }, { "county": 6041, "county_name": "MARIN", "weight": 33.940594059406 }, { "county": 6045, "county_name": "MENDOCINO", "weight": 32.19390926041 }, { "county": 6047, "county_name": "MERCED", "weight": 17.699115044248 }, { "county": 6053, "county_name": "MONTEREY", "weight": 34.339622641509 }, { "county": 6055, "county_name": "NAPA", "weight": 34.272114240381 }, { "county": 6057, "county_name": "NEVADA", "weight": 34.12581216775 }, { "county": 6059, "county_name": "ORANGE", "weight": 34.094352964946 }, { "county": 6061, "county_name": "PLACER", "weight": 33.368700265252 }, { "county": 6065, "county_name": "RIVERSIDE", "weight": 34.378409504182 }, { "county": 6067, "county_name": "SACRAMENTO", "weight": 31.127455133963 }, { "county": 6071, "county_name": "SAN BERNARDINO", "weight": 28.061278815951 }, { "county": 6073, "county_name": "SAN DIEGO", "weight": 33.416802684537 }, { "county": 6075, "county_name": "SAN FRANCISCO", "weight": 32.679686882265 }, { "county": 6077, "county_name": "SAN JOAQUIN", "weight": 33.220663908788 }, { "county": 6079, "county_name": "SAN LUIS OBISPO", "weight": 34.654426692559 }, { "county": 6081, "county_name": "SAN MATEO", "weight": 38.130056937369 }, { "county": 6083, "county_name": "SANTA BARBARA", "weight": 33.631012786686 }, { "county": 6085, "county_name": "SANTA CLARA", "weight": 23.539289157001 }, { "county": 6087, "county_name": "SANTA CRUZ", "weight": 33.450792851749 }, { "county": 6089, "county_name": "SHASTA", "weight": 33.199951497514 }, { "county": 6095, "county_name": "SOLANO", "weight": 29.988272742503 }, { "county": 6097, "county_name": "SONOMA", "weight": 32.117851341511 }, { "county": 6099, "county_name": "STANISLAUS", "weight": 28.860983743226 }, { "county": 6101, "county_name": "SUTTER", "weight": 30.02277904328 }, { "county": 6107, "county_name": "TULARE", "weight": 30.886966441677 }, { "county": 6111, "county_name": "VENTURA", "weight": 32.241761994195 }, { "county": 6113, "county_name": "YOLO", "weight": 33.095684803002 }, { "county": 8001, "county_name": "ADAMS", "weight": 36.59961064244 }, { "county": 8005, "county_name": "ARAPAHOE", "weight": 35.375019172759 }, { "county": 8013, "county_name": "BOULDER", "weight": 14.409178959917 }, { "county": 8031, "county_name": "DENVER", "weight": 29.526387009472 }, { "county": 8035, "county_name": "DOUGLAS", "weight": 34.816606207175 }, { "county": 8041, "county_name": "EL PASO", "weight": 35.803302523627 }, { "county": 8059, "county_name": "JEFFERSON", "weight": 30.013848159009 }, { "county": 8069, "county_name": "LARIMER", "weight": 31.525663161199 }, { "county": 8077, "county_name": "MESA", "weight": 6.4506267196576 }, { "county": 8101, "county_name": "PUEBLO", "weight": 13.887799136916 }, { "county": 8123, "county_name": "WELD", "weight": 13.152569809794 }, { "county": 9001, "county_name": "FAIRFIELD", "weight": 5.7392073825928 }, { "county": 9003, "county_name": "HARTFORD", "weight": 4.1802067946824 }, { "county": 9005, "county_name": "LITCHFIELD", "weight": 4.0793517742386 }, { "county": 9007, "county_name": "MIDDLESEX", "weight": 5.5014146494813 }, { "county": 9009, "county_name": "NEW HAVEN", "weight": 4.5156537753223 }, { "county": 9011, "county_name": "NEW LONDON", "weight": 5.0602409638554 }, { "county": 10003, "county_name": "NEW CASTLE", "weight": 32.839907589629 }, { "county": 11001, "county_name": "DISTRICT OF COLUMBIA", "weight": 9.2949842160645 }, { "county": 12001, "county_name": "ALACHUA", "weight": 10.877270713336 }, { "county": 12005, "county_name": "BAY", "weight": 36.272040302267 }, { "county": 12009, "county_name": "BREVARD", "weight": 11.407698791795 }, { "county": 12011, "county_name": "BROWARD", "weight": 23.280277164089 }, { "county": 12015, "county_name": "CHARLOTTE", "weight": 12.530881141916 }, { "county": 12017, "county_name": "CITRUS", "weight": 31.700110796504 }, { "county": 12019, "county_name": "CLAY", "weight": 35.153278138286 }, { "county": 12021, "county_name": "COLLIER", "weight": 15.993998499625 }, { "county": 12031, "county_name": "DUVAL", "weight": 34.893654890095 }, { "county": 12033, "county_name": "ESCAMBIA", "weight": 11.185959936182 }, { "county": 12035, "county_name": "FLAGLER", "weight": 18.70760442699 }, { "county": 12053, "county_name": "HERNANDO", "weight": 9.1261739485504 }, { "county": 12055, "county_name": "HIGHLANDS", "weight": 28.057742782152 }, { "county": 12057, "county_name": "HILLSBOROUGH", "weight": 26.866557815051 }, { "county": 12061, "county_name": "INDIAN RIVER", "weight": 10.33669311602 }, { "county": 12069, "county_name": "LAKE", "weight": 13.579952267303 }, { "county": 12071, "county_name": "LEE", "weight": 13.640759797284 }, { "county": 12073, "county_name": "LEON", "weight": 10.285270716088 }, { "county": 12081, "county_name": "MANATEE", "weight": 14.247875510429 }, { "county": 12083, "county_name": "MARION", "weight": 33.329608938547 }, { "county": 12085, "county_name": "MARTIN", "weight": 19.259129213483 }, { "county": 12086, "county_name": "MIAMI-DADE", "weight": 27.092726418329 }, { "county": 12087, "county_name": "MONROE", "weight": 19.3515704154 }, { "county": 12091, "county_name": "OKALOOSA", "weight": 29.375576745617 }, { "county": 12095, "county_name": "ORANGE", "weight": 29.856149076143 }, { "county": 12097, "county_name": "OSCEOLA", "weight": 14.039249514772 }, { "county": 12099, "county_name": "PALM BEACH", "weight": 30.592551486003 }, { "county": 12101, "county_name": "PASCO", "weight": 25.170105355575 }, { "county": 12103, "county_name": "PINELLAS", "weight": 28.425946424618 }, { "county": 12105, "county_name": "POLK", "weight": 28.673352628391 }, { "county": 12109, "county_name": "ST. JOHNS", "weight": 35.882708585248 }, { "county": 12111, "county_name": "ST. LUCIE", "weight": 12.200208550574 }, { "county": 12113, "county_name": "SANTA ROSA", "weight": 13.362801768106 }, { "county": 12115, "county_name": "SARASOTA", "weight": 33.847820200379 }, { "county": 12117, "county_name": "SEMINOLE", "weight": 26.554468579008 }, { "county": 12127, "county_name": "VOLUSIA", "weight": 26.636455186304 }, { "county": 12131, "county_name": "WALTON", "weight": 31.245500359971 }, { "county": 13067, "county_name": "COBB", "weight": 4.539857154585 }, { "county": 13089, "county_name": "DEKALB", "weight": 9.747504403993 }, { "county": 13121, "county_name": "FULTON", "weight": 13.174338679442 }, { "county": 13135, "county_name": "GWINNETT", "weight": 6.4834390415786 }, { "county": 15001, "county_name": "HAWAII", "weight": 15.918023582257 }, { "county": 15003, "county_name": "HONOLULU", "weight": 22.138866719872 }, { "county": 15007, "county_name": "KAUAI", "weight": 63.105998356615 }, { "county": 15009, "county_name": "MAUI", "weight": 27.947348340328 }, { "county": 17031, "county_name": "COOK", "weight": 13.833973012769 }, { "county": 17043, "county_name": "DUPAGE", "weight": 30.967531997975 }, { "county": 17089, "county_name": "KANE", "weight": 33.050309474687 }, { "county": 17097, "county_name": "LAKE", "weight": 11.594933064632 }, { "county": 17111, "county_name": "MCHENRY", "weight": 32.527401676338 }, { "county": 17143, "county_name": "PEORIA", "weight": 4.8459804658152 }, { "county": 17163, "county_name": "ST. CLAIR", "weight": 5.1138238205213 }, { "county": 17197, "county_name": "WILL", "weight": 26.516622872158 }, { "county": 17201, "county_name": "WINNEBAGO", "weight": 5.1221247332227 }, { "county": 18097, "county_name": "MARION", "weight": 12.886209495102 }, { "county": 22033, "county_name": "EAST BATON ROUGE", "weight": 3.0595813204509 }, { "county": 24003, "county_name": "ANNE ARUNDEL", "weight": 6.6849100860047 }, { "county": 24005, "county_name": "BALTIMORE", "weight": 5.1798561151079 }, { "county": 24013, "county_name": "CARROLL", "weight": 7.6580226904376 }, { "county": 24017, "county_name": "CHARLES", "weight": 5.6275122822689 }, { "county": 24021, "county_name": "FREDERICK", "weight": 5.8358521274122 }, { "county": 24025, "county_name": "HARFORD", "weight": 7.137490608565 }, { "county": 24027, "county_name": "HOWARD", "weight": 6.3063063063063 }, { "county": 24031, "county_name": "MONTGOMERY", "weight": 6.4765062307077 }, { "county": 24033, "county_name": "PRINCE GEORGES", "weight": 6.9953804091638 }, { "county": 24043, "county_name": "WASHINGTON", "weight": 7.9417293233083 }, { "county": 24047, "county_name": "WORCESTER", "weight": 16.55126937026 }, { "county": 24510, "county_name": "BALTIMORE CITY", "weight": 8.2386000766381 }, { "county": 25001, "county_name": "BARNSTABLE", "weight": 17.454806656291 }, { "county": 25005, "county_name": "BRISTOL", "weight": 7.4465049928673 }, { "county": 25009, "county_name": "ESSEX", "weight": 12.506881996697 }, { "county": 25013, "county_name": "HAMPDEN", "weight": 8.0384380719951 }, { "county": 25017, "county_name": "MIDDLESEX", "weight": 27.939008042895 }, { "county": 25021, "county_name": "NORFOLK", "weight": 24.315648164361 }, { "county": 25023, "county_name": "PLYMOUTH", "weight": 13.348746653687 }, { "county": 25025, "county_name": "SUFFOLK", "weight": 12.415510494486 }, { "county": 25027, "county_name": "WORCESTER", "weight": 8.4754797441365 }, { "county": 26049, "county_name": "GENESEE", "weight": 7.9543628475012 }, { "county": 26065, "county_name": "INGHAM", "weight": 6.1461497230659 }, { "county": 26075, "county_name": "JACKSON", "weight": 3.9448669201521 }, { "county": 26081, "county_name": "KENT", "weight": 3.5925196850394 }, { "county": 26093, "county_name": "LIVINGSTON", "weight": 4.7977422389464 }, { "county": 26099, "county_name": "MACOMB", "weight": 8.4649655731065 }, { "county": 26145, "county_name": "SAGINAW", "weight": 3.8956266078648 }, { "county": 26161, "county_name": "WASHTENAW", "weight": 12.490241998439 }, { "county": 27003, "county_name": "ANOKA", "weight": 35.361438748102 }, { "county": 27019, "county_name": "CARVER", "weight": 35.444806707033 }, { "county": 27037, "county_name": "DAKOTA", "weight": 3.7469454249253 }, { "county": 27053, "county_name": "HENNEPIN", "weight": 25.479191584629 }, { "county": 27123, "county_name": "RAMSEY", "weight": 27.0296014068 }, { "county": 27137, "county_name": "ST. LOUIS", "weight": 13.218235770165 }, { "county": 27139, "county_name": "SCOTT", "weight": 4.1739130434783 }, { "county": 27163, "county_name": "WASHINGTON", "weight": 2.2402757262432 }, { "county": 27171, "county_name": "WRIGHT", "weight": 32.163742690058 }, { "county": 29095, "county_name": "JACKSON", "weight": 27.766490586482 }, { "county": 29183, "county_name": "ST. CHARLES", "weight": 31.629914829075 }, { "county": 29189, "county_name": "ST. LOUIS", "weight": 43.333848292909 }, { "county": 29510, "county_name": "SAINT LOUIS CITY", "weight": 32.204861111111 }, { "county": 31109, "county_name": "LANCASTER", "weight": 2.2465753424658 }, { "county": 32003, "county_name": "CLARK", "weight": 31.380314013042 }, { "county": 32031, "county_name": "WASHOE", "weight": 24.548452960578 }, { "county": 34001, "county_name": "ATLANTIC", "weight": 25.995919682165 }, { "county": 34003, "county_name": "BERGEN", "weight": 6.9890009165903 }, { "county": 34005, "county_name": "BURLINGTON", "weight": 10.048802129547 }, { "county": 34007, "county_name": "CAMDEN", "weight": 8.2412255187124 }, { "county": 34009, "county_name": "CAPE MAY", "weight": 19.508037018997 }, { "county": 34013, "county_name": "ESSEX", "weight": 9.9226139294927 }, { "county": 34015, "county_name": "GLOUCESTER", "weight": 30.202724105163 }, { "county": 34017, "county_name": "HUDSON", "weight": 24.161710197397 }, { "county": 34021, "county_name": "MERCER", "weight": 8.074222668004 }, { "county": 34023, "county_name": "MIDDLESEX", "weight": 9.2441860465116 }, { "county": 34025, "county_name": "MONMOUTH", "weight": 9.3353822512486 }, { "county": 34027, "county_name": "MORRIS", "weight": 17.225352112676 }, { "county": 34029, "county_name": "OCEAN", "weight": 37.018672038429 }, { "county": 34031, "county_name": "PASSAIC", "weight": 8.7633451957295 }, { "county": 34035, "county_name": "SOMERSET", "weight": 8.638148377764 }, { "county": 34037, "county_name": "SUSSEX", "weight": 29.534510433387 }, { "county": 34039, "county_name": "UNION", "weight": 31.89460476788 }, { "county": 34041, "county_name": "WARREN", "weight": 29.438717067583 }, { "county": 35001, "county_name": "BERNALILLO", "weight": 28.118628359592 }, { "county": 36001, "county_name": "ALBANY", "weight": 3.9375203384315 }, { "county": 36005, "county_name": "BRONX", "weight": 30.396841886557 }, { "county": 36007, "county_name": "BROOME", "weight": 5.097312326228 }, { "county": 36027, "county_name": "DUTCHESS", "weight": 4.2664670658683 }, { "county": 36029, "county_name": "ERIE", "weight": 7.2621727283497 }, { "county": 36047, "county_name": "KINGS", "weight": 17.225350853669 }, { "county": 36055, "county_name": "MONROE", "weight": 7.4890687505814 }, { "county": 36059, "county_name": "NASSAU", "weight": 5.2696619295613 }, { "county": 36061, "county_name": "NEW YORK", "weight": 34.155087404751 }, { "county": 36063, "county_name": "NIAGARA", "weight": 10.821554770318 }, { "county": 36067, "county_name": "ONONDAGA", "weight": 4.6743533811156 }, { "county": 36071, "county_name": "ORANGE", "weight": 8.2626453031731 }, { "county": 36079, "county_name": "PUTNAM", "weight": 14.148471615721 }, { "county": 36081, "county_name": "QUEENS", "weight": 15.364354697103 }, { "county": 36085, "county_name": "RICHMOND", "weight": 6.269637246501 }, { "county": 36087, "county_name": "ROCKLAND", "weight": 27.891763306572 }, { "county": 36091, "county_name": "SARATOGA", "weight": 6.2885689097855 }, { "county": 36093, "county_name": "SCHENECTADY", "weight": 4.4991511035654 }, { "county": 36103, "county_name": "SUFFOLK", "weight": 7.5394862036156 }, { "county": 36111, "county_name": "ULSTER", "weight": 12.761714855434 }, { "county": 36119, "county_name": "WESTCHESTER", "weight": 29.387637203928 }, { "county": 37021, "county_name": "BUNCOMBE", "weight": 11.221203864256 }, { "county": 37063, "county_name": "DURHAM", "weight": 15.128449096099 }, { "county": 37067, "county_name": "FORSYTH", "weight": 9.2007937939744 }, { "county": 37081, "county_name": "GUILFORD", "weight": 28.909542850967 }, { "county": 37119, "county_name": "MECKLENBURG", "weight": 33.987464880052 }, { "county": 37179, "county_name": "UNION", "weight": 26.785714285714 }, { "county": 37183, "county_name": "WAKE", "weight": 8.7896810071831 }, { "county": 39017, "county_name": "BUTLER", "weight": 11.786600496278 }, { "county": 39023, "county_name": "CLARK", "weight": 14.401858304297 }, { "county": 39025, "county_name": "CLERMONT", "weight": 13.625229638702 }, { "county": 39035, "county_name": "CUYAHOGA", "weight": 12.534629658669 }, { "county": 39041, "county_name": "DELAWARE", "weight": 14.716382387941 }, { "county": 39049, "county_name": "FRANKLIN", "weight": 10.798621668187 }, { "county": 39057, "county_name": "GREENE", "weight": 11.068539804172 }, { "county": 39061, "county_name": "HAMILTON", "weight": 36.769337122667 }, { "county": 39085, "county_name": "LAKE", "weight": 12.217071175348 }, { "county": 39093, "county_name": "LORAIN", "weight": 13.587223587224 }, { "county": 39095, "county_name": "LUCAS", "weight": 13.123076923077 }, { "county": 39099, "county_name": "MAHONING", "weight": 31.380076783189 }, { "county": 39103, "county_name": "MEDINA", "weight": 16.013693419551 }, { "county": 39113, "county_name": "MONTGOMERY", "weight": 26.50459988693 }, { "county": 39151, "county_name": "STARK", "weight": 15.11240632806 }, { "county": 39153, "county_name": "SUMMIT", "weight": 13.199693285135 }, { "county": 39155, "county_name": "TRUMBULL", "weight": 29.438246232139 }, { "county": 39165, "county_name": "WARREN", "weight": 13.73673644967 }, { "county": 40109, "county_name": "OKLAHOMA", "weight": 27.656619689332 }, { "county": 40143, "county_name": "TULSA", "weight": 25.915538104015 }, { "county": 41005, "county_name": "CLACKAMAS", "weight": 25.209182578846 }, { "county": 41017, "county_name": "DESCHUTES", "weight": 12.440905697935 }, { "county": 41029, "county_name": "JACKSON", "weight": 27.052127022169 }, { "county": 41039, "county_name": "LANE", "weight": 25.60987654321 }, { "county": 41047, "county_name": "MARION", "weight": 10.069371452596 }, { "county": 41051, "county_name": "MULTNOMAH", "weight": 24.120918984281 }, { "county": 41067, "county_name": "WASHINGTON", "weight": 25.706513525767 }, { "county": 42003, "county_name": "ALLEGHENY", "weight": 22.365269461078 }, { "county": 42011, "county_name": "BERKS", "weight": 24.786427626038 }, { "county": 42017, "county_name": "BUCKS", "weight": 21.367236348479 }, { "county": 42029, "county_name": "CHESTER", "weight": 21.769354602664 }, { "county": 42043, "county_name": "DAUPHIN", "weight": 6.369785794814 }, { "county": 42045, "county_name": "DELAWARE", "weight": 15.37927114255 }, { "county": 42049, "county_name": "ERIE", "weight": 22.071725411728 }, { "county": 42071, "county_name": "LANCASTER", "weight": 20.179372197309 }, { "county": 42077, "county_name": "LEHIGH", "weight": 7.3121191604604 }, { "county": 42091, "county_name": "MONTGOMERY", "weight": 18.260730642241 }, { "county": 42095, "county_name": "NORTHAMPTON", "weight": 8.6726998491704 }, { "county": 42101, "county_name": "PHILADELPHIA", "weight": 7.0216526734423 }, { "county": 42129, "county_name": "WESTMORELAND", "weight": 1.5865820489574 }, { "county": 42133, "county_name": "YORK", "weight": 1.5625 }, { "county": 45013, "county_name": "BEAUFORT", "weight": 29.319371727749 }, { "county": 45015, "county_name": "BERKELEY", "weight": 18.962510897995 }, { "county": 45019, "county_name": "CHARLESTON", "weight": 30.38401077925 }, { "county": 45045, "county_name": "GREENVILLE", "weight": 9.6022727272727 }, { "county": 45051, "county_name": "HORRY", "weight": 6.7260370283572 }, { "county": 45079, "county_name": "RICHLAND", "weight": 31.786731786732 }, { "county": 45083, "county_name": "SPARTANBURG", "weight": 4.8632218844985 }, { "county": 47037, "county_name": "DAVIDSON", "weight": 26.933155217592 }, { "county": 47065, "county_name": "HAMILTON", "weight": 4.0015769761482 }, { "county": 47093, "county_name": "KNOX", "weight": 3.7659811006115 }, { "county": 47157, "county_name": "SHELBY", "weight": 17.265944442103 }, { "county": 47165, "county_name": "SUMNER", "weight": 40.969162995595 }, { "county": 47187, "county_name": "WILLIAMSON", "weight": 11.318009892348 }, { "county": 48029, "county_name": "BEXAR", "weight": 9.6375679095036 }, { "county": 48039, "county_name": "BRAZORIA", "weight": 17.557251908397 }, { "county": 48085, "county_name": "COLLIN", "weight": 9.860788863109 }, { "county": 48113, "county_name": "DALLAS", "weight": 9.6153846153846 }, { "county": 48121, "county_name": "DENTON", "weight": 7.3293172690763 }, { "county": 48141, "county_name": "EL PASO", "weight": 12.724623603691 }, { "county": 48157, "county_name": "FORT BEND", "weight": 12.584009269988 }, { "county": 48167, "county_name": "GALVESTON", "weight": 16.02023608769 }, { "county": 48201, "county_name": "HARRIS", "weight": 4.6453017154967 }, { "county": 48339, "county_name": "MONTGOMERY", "weight": 31.846984275992 }, { "county": 48439, "county_name": "TARRANT", "weight": 7.9620017628048 }, { "county": 48453, "county_name": "TRAVIS", "weight": 13.826591210787 }, { "county": 49011, "county_name": "DAVIS", "weight": 40.058055152395 }, { "county": 49035, "county_name": "SALT LAKE", "weight": 27.558536096065 }, { "county": 49049, "county_name": "UTAH", "weight": 17.96860223189 }, { "county": 49057, "county_name": "WEBER", "weight": 38.2081061863 }, { "county": 51041, "county_name": "CHESTERFIELD", "weight": 24.315143545913 }, { "county": 51059, "county_name": "FAIRFAX", "weight": 7.9613616888681 }, { "county": 51087, "county_name": "HENRICO", "weight": 24.006772009029 }, { "county": 51107, "county_name": "LOUDOUN", "weight": 7.3784722222222 }, { "county": 51153, "county_name": "PRINCE WILLIAM", "weight": 6.8582432232262 }, { "county": 51510, "county_name": "ALEXANDRIA", "weight": 6.0534325329726 }, { "county": 51760, "county_name": "RICHMOND", "weight": 16.079158936302 }, { "county": 53011, "county_name": "CLARK", "weight": 10.591067130249 }, { "county": 53033, "county_name": "KING", "weight": 31.749109104673 }, { "county": 53035, "county_name": "KITSAP", "weight": 13.962395543175 }, { "county": 53053, "county_name": "PIERCE", "weight": 12.965240468639 }, { "county": 53061, "county_name": "SNOHOMISH", "weight": 11.663844199831 }, { "county": 53063, "county_name": "SPOKANE", "weight": 9.5754829477701 }, { "county": 53067, "county_name": "THURSTON", "weight": 11.969351832678 }, { "county": 53073, "county_name": "WHATCOM", "weight": 36.384766672626 }, { "county": 53077, "county_name": "YAKIMA", "weight": 6.7676289635589 }, { "county": 55009, "county_name": "BROWN", "weight": 2.4074631357207 }, { "county": 55079, "county_name": "MILWAUKEE", "weight": 14.943187741061 }, { "county": 55133, "county_name": "WAUKESHA", "weight": 8.5109742618033 }
        ];

        this.columns(["County", "Weight"]);
        var countyData = rawData.map(function (item) {
            return [item.county, item.weight];
        });
        this.data(countyData);
        return this;
    };

    ChoroplethCounties.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    context.click(context.rowToObj(context._dataMap[d.id]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context._columns, 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context._columns, 1);
            })
        ;
    };

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);

        //console.time("ChoroplethCounties.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .style("fill", function (d) {
                var weight = context._dataMap[d.id] ? context._dataMap[d.id][1] : undefined;
                return weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
        //console.timeEnd("ChoroplethCounties.prototype.update");
    };

    return ChoroplethCounties;
}));
