sap.ui.define(
    ["./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/Fragment",
        "sap/f/library",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV",
        "sap/m/MessageBox"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, library, Export, ExportTypeCSV, MessageBox) {
        "use strict";

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () { },
            onOpenViewImage: function (oEvent) {
                debugger;
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/selectedRowView", oSelectObj);
                // create popover
                if (!this.pPopover) {
                    this.pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        //oPopover.bindElement("formModel>/productList/imgUrl");
                        return oPopover;
                    });
                }
                this.pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onPopoverClose: function (oEvent) {
                this.pPopover.close();
            }
        });
    });
