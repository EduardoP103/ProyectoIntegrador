sap.ui.define(
    ["./BaseController",
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/f/library",
	"sap/ui/core/Fragment",
    "sap/ui/core/util/Export", 
    "sap/ui/core/util/ExportTypeCSV",
    "sap/m/MessageBox",
	"sap/ui/core/Fragment"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, library, MessageBox) {
        "use strict";

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},
        });
    }
);
