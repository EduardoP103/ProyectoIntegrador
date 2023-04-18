/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["com/pe/proyectoIntegrador/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
