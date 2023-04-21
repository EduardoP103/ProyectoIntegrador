sap.ui.define(
    ["./BaseController","../util/util", "sap/ui/export/library",'sap/m/MessageBox'],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, util ,exportLibrary,MessageBox) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},
            onOpenViewImage: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                debugger;
                var oProduct = oButton.getParent().getBindingContext("localModel");
                debugger;
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("localModel").setProperty("/selectedRowView", oSelectObj);
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
            },
            createColumnConfigTableProducts: function () {
                var aCols = [];
                aCols.push({
                    label: "ProductoFinal X Precio",
                    property: ["product", "price"],
                    type: EdmType.String,
                    template: "{0} {1}",
                });
                aCols.push({
                    label: "SupplierNombre",
                    property: ["supplier"],
                    type: EdmType.String,
                    template: "{0}",
                });
                //dimension
                aCols.push({
                    label: "dimension",
                    property: ["dimension"],
                    type: EdmType.String,
                    template: "{0}",
                });
                //weight
                aCols.push({
                    label: "weight",
                    property: ["weight"],
                    type: EdmType.String,
                    template: "{0}",
                });
                //price
                aCols.push({
                    label: "price",
                    property: ["price"],
                    type: EdmType.String,
                    template: "{0}",
                });
                return aCols;
            },
            createColumnConfigTableSupplier: function () {
                var aCols = [];
                return aCols;
            },
            createColumnConfigTableUnitOfMeasurement: function () {
                var aCols = [];
                return aCols;
            },
            onExportSpreadSheetXLSX: function () {
                debugger;
                let aCols;
                let oSettings;
                let oTable;
                let fileName = "";
                let path = "";
                const selectedIconTabBar = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");
                if (selectedIconTabBar === "0") {
                    oTable = this.getView().byId("idProductsTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "ProductoDataExcel.xlsx";
                    aCols = this.createColumnConfigTableProducts();
                } else if (selectedIconTabBar === "1") {
                    oTable = this.getView().byId("idSupplierTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "ProveedorDataExcel.xlsx";
                    aCols = this.createColumnConfigTableSupplier();
                } else if (selectedIconTabBar === "2") {
                    oTable = this.getView().byId("idUnitOfMeasurementTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "UnidadMedidaDataExcel.xlsx";
                    aCols = this.createColumnConfigTableUnitOfMeasurement();
                }
                if (this.getView().getModel("localModel").getProperty(path).length > 0) {
                    util.utilController.exportSpreadSheetXLSX(aCols, oTable, fileName);
                } else {
                    util.utilUI.messageBox("No existen registros para descargar", "WARNING", "Alerta");
                }
            },
            onPressShowMessageBox: function(){
                debugger;
                let msg = "MENSAJE";
                let icon = "WARNING";
                let title = "TITULO";
                util.utilUI.messageBox(msg, icon, title)
            },
            onRealizarObtKeysObject : function(){
                debugger;
                let obj = {"nombre" : "Guillermo"}
                let respuesta = util.utilController.obtenerKeysObject(obj)
                alert(JSON.stringify(respuesta))
            }
            
        });
    }
);
