sap.ui.define(
    ["./BaseController",
        "../util/util",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/Fragment",
        "sap/f/library",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV",
        "sap/m/MessageBox", 
        "sap/ui/export/library"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, util, JSONModel, Fragment, library, Export, ExportTypeCSV, MessageBox, exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () { },
            onOpenViewImage: function (oEvent) {
                
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
                        return oPopover;
                    });
                }
                this.pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onPopoverClose: function (oEvent) {
                this.byId("imgPopover").close();
            },

            onOpenAddDialog: function (oEvent) {
                
                var oButton = oEvent.getSource(),
                oView = this.getView();
                // create popover
                if (!this.oDialogAddProduct) {
                    this.oDialogAddProduct = Fragment.load({
                        id: oView.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.AddProduct",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this.oDialogAddProduct.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onAddProductClose: function (oEvent) {
                this.byId("idAddProductDialog").close();
            },

            onPressPopup: function (oEvent) {
                let message="Mensaje";
                let icon = "WARNING";
                let title = "Titulo";
                
                util.utilUI.messageBox(message,icon,title);
            },
            createColumnConfigTableProducts: function () {
                var aCols = [];
                aCols.push({
                    label: "Producto",
                    property: ["productName"],
                    type: EdmType.String,
                    template: "{0} {1}",
                });
                aCols.push({
                    label: "Provider",
                    property: ["productProvider"],
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
            onExportSpreadSheetXLSX: function(){
                let aCols;
                let oSettings;
                let oTable;
                let fileName = "";
                let path = "";
                const selectedIconTabBar = this.getView().getModel("formModel").getProperty("/selectedIconTabBar");
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
                if (this.getView().getModel("formModel").getProperty(path).length > 0) {
                    util.utilController.exportSpreadSheetXLSX(aCols, oTable, fileName);
                } else {
                    util.utilUI.messageBox("No existen registros para descargar", "WARNING", "Alerta");
                }

            },
            onExportSpreadSheetCSV: function(){
                var oExport = new Export({

                    // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                    exportType : new ExportTypeCSV({
                        separatorChar : ";"
                    }),
                    
                    // Pass in the model created above
                    models : this.getView().getModel("formModel"),
    
                    // binding information for the rows aggregation
                    rows : {
                        path : "/productList"
                    },
    
                    // column definitions with column name and binding info for the content
    
                    columns : [{
                        name : "Product",
                        template : {
                            content : "{productName}"
                        }
                    }, {
                        name : "Provider",
                        template : {
                            content : "{productProvider}"
                        }
                    }, {
                        name : "Description",
                        template : {
                            content : "{productDescription}"                                
                        }
                    }, {
                        name : "Stock",
                        template : {
                            content : "{productStock}"
                        }
                    }, {
                        name : "Price",
                        template : {
                            content : "{productPriceC}"
                        }
                    }]
                });
    
                // download exported file
                oExport.saveFile().catch(function(oError) {
                    MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                }).then(function() {
                    oExport.destroy();
                });
            },
            onAddButton: function(){
                let add_obj={};

            },
            loadSupplier : function(){
                debugger;
                const {supplierList , selectSupplierList} = this.getView().getModel("formModel").getData();
                supplierList.forEach(element => {
                    debugger;
                    let obj = {}
                    obj.key = element.id.toString();
                    obj.text = element.name;
                    selectSupplierList.push(obj)
                });

                this.getView().getModel("formModel").setProperty("/selectSupplierList",selectSupplierList);

            },
            loadMeasurement : function(){
                debugger;
                const {measurementList , selectMeasurementList} = this.getView().getModel("formModel").getData();
                measurementList.forEach(element => {
                    debugger;
                    let obj = {}
                    obj.key = element.id.toString();
                    obj.text = element.name;
                    selectMeasurementList.push(obj)
                });

                this.getView().getModel("formModel").setProperty("/selectMeasurementList",selectMeasurementList);
            },

            onAfterRendering : function(){
                this.loadSupplier();
                this.loadMeasurement();
            }
        });
    });
