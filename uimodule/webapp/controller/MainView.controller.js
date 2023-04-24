sap.ui.define(
    ["./BaseController", "../util/util", "sap/ui/export/library", 'sap/m/MessageBox',
	"sap/ui/core/util/ExportTypeCSV"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, util, exportLibrary, MessageBox) {
        "use strict";
        let EdmType = exportLibrary.EdmType;
        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () { },

            onAddProduct: function () {
                if (!this.oMPProduct) {
                    this.oMPProduct = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarProducto"
                    });
                }
                this.oMPProduct.then(function (oDialog) {
                    this.oDialogProduct = oDialog;
                    this.oDialogProduct.open();
                }.bind(this));
            },
            closeDialogProduct: function () {
                this.oDialogProduct.close();
                this.oClean();
            },
             onAddProductOfTable: function () {
                 let name = this.getView().getModel("localModel").getProperty("/addProduct").name;
                 let description = this.getView().getModel("localModel").getProperty("/addProduct").description;
                 let image = this.getView().getModel("localModel").getProperty("/addProduct").image;
                 let salePrice = this.getView().getModel("localModel").getProperty("/addProduct").salePrice;
                 let purchasePrice = this.getView().getModel("localModel").getProperty("/addProduct").purchasePrice;
                 let stock = this.getView().getModel("localModel").getProperty("/addProduct").stock;
                 let unitOfMeasurementName = this.getView().getModel("localModel").getProperty("/addProduct").unitOfMeasurementName;
                 let supplierName = this.getView().getModel("localModel").getProperty("/addProduct").supplierName;
                 let statusName = this.getView().getModel("localModel").getProperty("/addProduct").statusName;
                 let oRespuesta = {
                     valid: true,
                     mensaje: ""
                 };
                 let items = this.getView().getModel("localModel").getProperty("/listOfProducts");
                 let obj = this.getView().getModel("localModel").getProperty("/addProduct");


                 let completeList = [];
                 items.forEach((element) => {
                     completeList.push(element);
                 });
                 completeList.push(obj);

                 let list = [...items, ...[obj]];
                 this.getView().getModel("localModel").setProperty("/listOfProducts", list);
                 this.getView().getModel("localModel").refresh();

                 MessageBox.success("Producto Ingresado");
                 this.oClean();

             },

                oClean: function () {
                this.getView().getModel("localModel").setProperty("/addProduct", {
                    name: "",
                    description: "",
                    image: "",
                    salePrice: "",
                    purchasePrice: "",
                    stock: "",
                    unitOfMeasurementName: "",
                    supplierName: "",
                    statusName: "",
                });
            },


                // onPressDelete: function(oEvent) {
                //     debugger
                //     const oTable = this.getView().byId("idProductsTable");
                //     const oSelectedItem = oTable.getSelectedItem();
                //     oTable.removeItem(oSelectedItem);
                // },
                // onPressEdit: function(oEvent) {
                //     debugger
                //     const oTable = this.getView().byId("idProductsTable");
                //     const oSelectedItem = oTable.getSelectedItem();
                //     const oContext = oSelectedItem.getBindingContext("localModel");
                //     const sPath = oContext.getPath();
                //     const oProduct = oContext.getModel().getProperty(sPath);
                // },


                onOpenViewImage: function (oEvent) {
                let oButton = oEvent.getSource(),
                    oView = this.getView();
                debugger;
                let oProduct = oButton.getParent().getBindingContext("localModel");
                debugger;
                let oSelectObj = oProduct.getObject();
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
                let aCols = [];
                aCols.push({
                    label: "Producto",
                    property: ["name"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Description",
                    property: ["description"],
                    type: EdmType.String,
                    template: "{0}",
                });
                //dimension
                aCols.push({
                    label: "PrecioV",
                    property: ["salePrice"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "PrecioC",
                    property: ["purchasePrice"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "UnidadM",
                    property: ["stock"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Proveedor",
                    property: ["unitOfMeasurementName"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Activo",
                    property: ["statusName"],
                    type: EdmType.String,
                    template: "{0}",
                });
                return aCols;
            },
            createColumnConfigTableSupplier: function () {
                let aColsSupplier = [];

                aColsSupplier.push({
                    label: "Proveedor",
                    property: ["name"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aColsSupplier.push({
                    label: "Telefono",
                    property: ["phone"],
                    type: EdmType.Double,
                    template: "{0}",
                });

                aColsSupplier.push({
                    label: "Dirección",
                    property: ["address"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aColsSupplier.push({
                    label: "Estado",
                    property: ["state"],
                    type: EdmType.String,
                    template: "{0}",
                })
                return aColsSupplier;
            },
            createColumnConfigTableUnitOfMeasurement: function () {
                var aCols = [];
                return aCols;
            },
            // XLSX
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
            // CSV

            // onDataExport: function(oEvent){
            //    let selectedIconTabBar = this.getView().getModel("localModel").getProperty("/selectedIconTabBar") 
            //    if (selectedIconTabBar === "0"){
            //     let oExport = new Export({
            //         exportType: new ExportTypeCSV({
            //             separatorChar: ";"
            //         }),

            //         models: this.getView().getModel("localModel"),

            //         rows: {
            //             path: "/listOfProducts"
            //         },

            //         columns: [{
            //             name: "Nombre",
            //             template: {
            //                 content: {"name"}
            //             }
            //         },
            //          {
            //             name : "Description",
            //             template: {
            //                 content: {"description"}
            //             }
            //         },
            //         {
            //             name: 
            //         }
                
                
            //     ]
            //     })
            //    }
            // },


            onPressShowMessageBox: function () {
                debugger;
                let msg = "MENSAJE";
                let icon = "WARNING";
                let title = "TITULO";
                util.utilUI.messageBox(msg, icon, title)
            },
            onRealizarObtKeysObject: function () {
                debugger;
                let obj = { "nombre": "Eduardo" }
                let respuesta = util.utilController.obtenerKeysObject(obj)
                alert(JSON.stringify(respuesta))
            }

        });
    }
);

