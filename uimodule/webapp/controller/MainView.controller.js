sap.ui.define(
    ["./BaseController",
    'sap/ui/core/Fragment'],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function() {},


            onOpenViewImage: function(oEvent) {
                var oButton = oEvent.getSource(),
				oView = this.getView();
                debugger;
                var oProduct = oButton.getParent().getBindingContext("localModel")
                
                // create popover
                // if (!this.pPopover) {
                //     this.pPopover = Fragment.load({
                //         id: oView.getId(),
                //         name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                //         controller: this
                //     }).then(function(oPopover) {
                //         oView.addDependent(oPopover);
                //         oPopover.bindElement(oProduct.getPath());
                //         return oPopover;
                //     });
                // }
                // this.pPopover.then(function(oPopover) {
                //     oPopover.openBy(oButton);
                // });
                debugger;
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("localModel").setProperty("/selectedRowView",oSelectObj)
                if (!this.oPopover) {
                    this.oPopover = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                    });
                }
                this.oPopover.then(
                    function (oPop) {
                        this.pPopover = oPop;
                        oPop.openBy(oButton);
                    }.bind(this)
                );

                },

                onCloseViewImage: function () {
                    this.pPopover.close();
                }
        });
    }
);
