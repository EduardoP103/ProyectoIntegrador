sap.ui.define(
    ["./BaseController",
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
    'sap/ui/core/util/Export', 
    'sap/ui/core/util/ExportTypeCSV'],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},
        });
    }
);
