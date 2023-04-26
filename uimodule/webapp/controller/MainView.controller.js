sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/f/library",
        "sap/ui/core/Fragment",
        "sap/m/MessagePopover",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/m/MessageItem",
        "sap/ui/core/message/Message",
        "sap/ui/core/library",
        "sap/ui/core/Core",
        "sap/ui/core/Element",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV",
        "sap/ui/export/Spreadsheet",
        "sap/ui/export/library",
        "sap/base/util/deepExtend",
        "sap/m/ColumnListItem",
        "../util/util",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        JSONModel,
        library,
        Fragment,
        MessagePopover,
        MessageBox,
        MessageToast,
        MessageItem,
        Message,
        coreLibrary,
        Core,
        Element,
        Export,
        ExportTypeCSV,
        Spreadsheet,
        exportLibrary,
        deepExtend,
        ColumnListItem,
        util
    ) {
        "use strict";
        let EdmType = exportLibrary.EdmType;
        let DynamicPageTitleArea = library.DynamicPageTitleArea;

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () { },

            // ----------------------------Dynamic Page -------------------------//


            // ----------------------------Popover image -------------------------//

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

            oCloseImage: function (oEvent) {
                // note: We don't need to chain to the _pPopover promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("myPopover").close();
            },

            // ----------------------------Creación de columnas para exportar datos en XLSX -------------------------//

            createColumnConfigTableProducts: function () {
                let aCols = [];

                aCols.push({
                    label: "Producto",
                    property: ["name"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Descripción",
                    property: ["description"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "image",
                    property: ["image"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "PrecioV",
                    property: ["salePrice"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "purchasePrice",
                    property: ["purchasePrice"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Stock",
                    property: ["stock"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Unidad M.",
                    property: ["unitOfMeasurementName"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "supplierName",
                    property: ["supplierName"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "statusName",
                    property: ["statusName"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols;
            },
            createColumnConfigTableSupplier: function () {
                let aCols = [];

                aCols.push({
                    label: "name",
                    property: ["name"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "phone",
                    property: ["phone"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "address",
                    property: ["address"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "state",
                    property: ["state"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols;
            },
            createColumnConfigTableUnitOfMeasurement: function () {
                let aCols = [];

                aCols.push({
                    label: "name",
                    property: ["name"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "description",
                    property: ["description"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Abreviatura",
                    property: ["abreviatura"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "state",
                    property: ["state"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols;
            },

            // ----------------------------Exportar datos en XLSX -------------------------//

            onExportSpreadSheetXLSX: function () {
                const tabs = [
                    { id: "0", table: "idProductsTable", columns: this.createColumnConfigTableProducts(), fileName: "ListaProductos.xlsx" },
                    { id: "1", table: "listOfSuppliers", columns: this.createColumnConfigTableSupplier(), fileName: "listSupplierName.xlsx" },
                    { id: "2", table: "listOfUnitOfMeasurement", columns: this.createColumnConfigTableUnitOfMeasurement(), fileName: "ListaunitOfMeasurementName.xlsx" },
                ];
                const selectedTab = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");
                const tab = tabs.find((t) => t.id === selectedTab);
                if (!tab) {
                    MessageBox.warning("No existen datos, no se puede crear el documento");
                    return;
                }
                const table = this.getView().byId(tab.table);
                const aCols = tab.columns;
                const fileName = tab.fileName; Property
                if (table.getBinding("items").oList.length > 0) {
                    util.utilController.exportSpreadSheetXLSX(table, aCols, fileName);
                } else {
                    MessageBox.warning("No existen datos, no se puede crear el documento");
                }
            },

            // ----------------------------Exportar datos en CSV -------------------------//

            onDataExport: function (oEvent) {

                var selectedTab = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");

                if (selectedTab === "0") {

                    var oExport = new Export({

                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ","
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("localModel"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listOfProducts"
                        },

                        // column definitions with column name and binding info for the content

                        columns: [{
                            name: "name",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "description",
                            template: {
                                content: "{description}"
                            }
                        }, {
                            name: "image",
                            template: {
                                content: "{image}"
                            }
                        }, {
                            name: "Precio V.",
                            template: {
                                content: "{salePrice}"
                            }
                        }, {
                            name: "Precio C.",
                            template: {
                                content: "{purchasePrice}"
                            }
                        }, {
                            name: "Stock",
                            template: {
                                content: "{stock}"
                            }
                        }, {
                            name: "Unidad M.",
                            template: {
                                content: "{unitOfMeasurementName}"
                            }
                        }, {
                            name: "Proveedores",
                            template: {
                                content: "{supplierName}"
                            }
                        }, {
                            name: "Estado",
                            template: {
                                content: "{statusName}"
                            }
                        }]
                    });

                } else if (selectedTab === "1") {

                    let oExport = new Export({

                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ","
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("localModel"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listOfSuppliers"
                        },

                        // column definitions with column name and binding info for the content

                        columns: [{
                            name: "name",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "phone",
                            template: {
                                content: "{phone}"
                            }
                        }, {
                            name: "address",
                            template: {
                                content: "{address}"
                            }
                        }, {
                            name: "state",
                            template: {
                                content: "{state}"
                            }
                        }]
                    });

                } else if (selectedTab === "2") {

                    let oExport = new Export({

                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ","
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("localModel"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listOfUnitOfMeasurement"
                        },

                        // column definitions with column name and binding info for the content

                        columns: [{
                            name: "name",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "description",
                            template: {
                                content: "{description}"
                            }
                        }, {
                            name: "Abreviatura",
                            template: {
                                content: "{abbreviation}"
                            }
                        }, {
                            name: "state",
                            template: {
                                content: "{state}"
                            }
                        }]
                    });

                }
                // download exported file
                oExport.saveFile().catch(function (oError) {
                    MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                }).then(function () {
                    oExport.destroy();
                });
            },

            // ----------------------------Abrir Fragment Agregar Producto -------------------------//
            onaddProduct: function () {

                if (!this.oMPProducto) {
                    this.oMPProducto = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarProducto"
                    });
                }
                this.oMPProducto.then(function (oDialog) {
                    this.oDialogProducto = oDialog;
                    this.oDialogProducto.open();

                }.bind(this));

            },
            closeDialogProducto: function () {
                //this.getView().getModel("localModel").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
                this.oDialogProducto.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Abrir Fragment Editar Producto -------------------------//
            onEditarProducto: function () {

                if (!this.oMPProductoe) {
                    this.oMPProductoe = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditProduct"
                    });
                }
                this.oMPProductoe.then(function (oDialog) {
                    this.oDialogProductoe = oDialog;
                    this.oDialogProductoe.open();

                }.bind(this));

            },
            closeDialogProductoe: function () {
                //this.getView().getModel("localModel").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
                this.oDialogProductoe.close();
                this.onLimpiarCamposDialogos();
            },


            // ----------------------------Limpiar campos a ingresar -------------------------//

            onLimpiarCamposDialogos: function () {
                this.getView().getModel("localModel").setProperty("/addProduct", {
                    "name": "",
                    "description": "",
                    "salePrice": "",
                    "image": "",
                    "purchasePrice": "",
                    "stock": "",
                    "unitOfMeasurementName": "",
                    "supplierName": "",
                    "statusName": ""
                });

                this.getView().getModel("localModel").setProperty("/selectSupplierName", "0");

                this.getView().getModel("localModel").setProperty("/selectUnitOfMeasurementName", "0");

                this.getView().getModel("localModel").setProperty("/selectStateName", "0");

                this.getView().getModel("localModel").setProperty("/addSupplierName", {
                    "name": "",
                    "phone": "",
                    "address": "",
                    "state": ""
                });


            },


            // REVISAR
            onAddProductTable: function () {
                debugger;
                let name = this.getView().getModel("localModel").getProperty("/addProduct").name;
                let description = this.getView().getModel("localModel").getProperty("/addProduct").description;
                let image = this.getView().getModel("localModel").getProperty("/addProduct").image;
                let salePrice = this.getView().getModel("localModel").getProperty("/addProduct").salePrice;
                let purchasePrice = this.getView().getModel("localModel").getProperty("/addProduct").purchasePrice;
                let stock = this.getView().getModel("localModel").getProperty("/addProduct").stock;
                let unitOfMeasurementName = this.getView().getModel("localModel").getProperty("/addProduct").unitOfMeasurementName;
                let supplierName = this.getView().getModel("localModel").getProperty("/addProduct").supplierName;
                let statusName = this.getView().getModel("localModel").getProperty("/addProduct").statusName;

                let selectUnitOfMeasurementName = this.getView().getModel("localModel").getProperty("/selectUnitOfMeasurementName")
                let selectSupplierName = this.getView().getModel("localModel").getProperty("/selectSupplierName")
                let selectStateName = this.getView().getModel("localModel").getProperty("/selectStateName")

                let oProducto = {
                    "id": this.getView().getModel("localModel").getProperty("/listOfProducts").length + 1,
                    "name": name,
                    "description": description,
                    "image": image,
                    "salePrice": salePrice,
                    "purchasePrice": purchasePrice,
                    "stock": stock,
                    "unitOfMeasurementName": this.getView().byId("idUnit").getSelectedItem().getProperty("text"),
                    "supplierName": this.getView().byId("idSupplier").getSelectedItem().getProperty("text"),
                    "statusName": this.getView().byId("idStatus").getSelectedItem().getProperty("text"),
                    "idUnitOfmeasurment": selectUnitOfMeasurementName,
                    "idSupplier": selectSupplierName,
                    "idStatus": selectStateName

                }
                let oRespuesta = {
                    valid: true,
                    mensaje: ""
                };
                 {
                    oRespuesta.valid = false;
                    oRespuesta.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son necesario");
                    return oRespuesta;
                }
                let listOfProducts = this.getView().getModel("localModel").getProperty("/listOfProducts");
                listOfProducts.push(oProducto);
                this.getView().getModel("localModel").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogProducto();
            },

            // DEBUGGER
            onPressEditTabla: function () {
                debugger
                let id = this.getView().getModel("localModel").getProperty("/editProduct").id;
                let nameProduct = this.getView().getModel("localModel").getProperty("/editProduct").name;
                let descriptionProduct = this.getView().getModel("localModel").getProperty("/editProduct").description;
                let imageProduct = this.getView().getModel("localModel").getProperty("/editProduct").image;
                let salePrice = this.getView().getModel("localModel").getProperty("/editProduct").salePrice;
                let purchasePrice = this.getView().getModel("localModel").getProperty("/editProduct").purchasePrice;
                let stock = this.getView().getModel("localModel").getProperty("/editProduct").stock;
                let unitOfMeasurementName = this.getView().getModel("localModel").getProperty("/editProduct").unitOfMeasurementName;
                let supplierName = this.getView().getModel("localModel").getProperty("/editProduct").supplierName;
                let statusName = this.getView().getModel("localModel").getProperty("/editProduct").statusName;

                let selectUnitOfMeasurementName = this.getView().getModel("localModel").getProperty("/selectUnitOfMeasurementName")
                let selectSupplierName = this.getView().getModel("localModel").getProperty("/selectSupplierName")
                let selectStateName = this.getView().getModel("localModel").getProperty("/selectStateName")

                let oSearchUnit = this.getView().getModel("localModel").getProperty("/ListunitOfMeasurementName").filter(function (item, index) {
                    return item.id == selectUnitOfMeasurementName;
                })

                let oSearchSupplierName = this.getView().getModel("localModel").getProperty("/listSupplierName").filter(function (item, index) {
                    return item.id == selectSupplierName;
                })

                let oSearchStatusName = this.getView().getModel("localModel").getProperty("/statusName").filter(function (item, index) {
                    return item.id == selectStateName;
                })

                let oProducto1 = {
                    "id": id,
                    "name": nameProduct,
                    "description": descriptionProduct,
                    "image": imageProduct,
                    "salePrice": salePrice,
                    "purchasePrice": purchasePrice,
                    "stock": stock,
                    "unitOfMeasurementName": oSearchUnit[0].name,
                    "supplierName": oSearchSupplierName[0].name,
                    "statusName": oSearchStatusName[0].name,
                    "idUnitOfmeasurment": selectUnitOfMeasurementName,
                    "idsupplierName": selectSupplierName,
                    "idstatusName": selectStateName,

                }
                let oResp = {
                    valid: true,
                    mensaje: ""
                };
                if (nameProd.trim().length == 0 ||
                    descProd.trim().length == 0 ||
                    pvProd <= 0 ||
                    pcProd <= 0 ||
                    sProd <= 0 ||
                    this.getView().getModel("localModel").getProperty("/selectStateName") == "0" ||
                    this.getView().getModel("localModel").getProperty("/selectSupplierName") == "0" ||
                    this.getView().getModel("localModel").getProperty("/selectUnitOfMeasurementName") == "0"

                ) {
                    oResp.valid = false;
                    oResp.mensaje = "llena los campos";
                    MessageBox.warning("Rellene todos los campos");
                    return oResp;
                }
                let listOfProducts = this.getView().getModel("localModel").getProperty("/listOfProducts");
                //listOfProducts.push(oProducto);
                let listFinal = [];
                for (let index = 0; index < listOfProducts.length; index++) {
                    const element = listOfProducts[index];
                    if (element.id == oProducto1.id) {
                        // eslint-disable-next-line max-lines
                        listFinal.push(oProducto1);
                    } else {
                        listFinal.push(element);
                    }
                }
                this.getView().getModel("localModel").setProperty("/listOfProducts", listFinal);
                this.getView().getModel("localModel").refresh();
                MessageBox.success("Producto actualizado");
                this.closeDialogProductoe();
            },


            onPressEdit: function (oEvent) {

                let oButton = oEvent.getSource(),

                    oView = this.getView();

                debugger;

                let oProduct2 = oButton.getParent().getBindingContext("localModel");

                debugger;

                let oSelectObj = oProduct2.getObject();
                debugger;

                let obj = {
                    "id": oSelectObj.id,
                    "name": oSelectObj.name,
                    "description": oSelectObj.description,
                    "salePrice": oSelectObj.salePrice,
                    "image": oSelectObj.image,
                    "purchasePrice": oSelectObj.purchasePrice,
                    "stock": oSelectObj.stock,
                    "unitOfMeasurementName": oSelectObj.unitOfMeasurementName,
                    "supplierName": oSelectObj.supplierName,
                    "statusName": oSelectObj.statusName
                }

                this.getView().getModel("localModel").setProperty("/selectUnitOfMeasurementName", oSelectObj.idUnidaddm);
                this.getView().getModel("localModel").setProperty("/selectSupplierName", oSelectObj.idsupplierName);
                this.getView().getModel("localModel").setProperty("/selectStateName", oSelectObj.idstatusName);

                this.getView().getModel("localModel").setProperty("/editProduct", obj);
                this.onEditarProducto();

            },

            // ----------------------------Agregar registros a las tabla supplierName -------------------------//

            onaddSupplierNameTabla: function () {
                let name = this.getView().getModel("localModel").getProperty("/addSupplierName").name;
                let phone = this.getView().getModel("localModel").getProperty("/addSupplierName").phone;
                let address = this.getView().getModel("localModel").getProperty("/addSupplierName").address;
                let est = this.getView().getModel("localModel").getProperty("/addSupplierName").state;

                let osupplierName = {
                    "id": this.getView().getModel("localModel").getProperty("/listOfSuppliers").length + 1,
                    "name": name,
                    "phone": phone,
                    "address": address,
                    "state": this.getView().byId("idstatusName2").getSelectedItem().getProperty("text")

                }

                let oResp = {
                    valid: true,
                    mensaje: ""
                };
                if (name.trim().length == 0 ||
                    address.trim().length == 0 ||
                    phone <= 0 ||
                    this.getView().getModel("localModel").getProperty("/selectStateName") == "0"

                ) {
                    oResp.valid = false;
                    oResp.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oResp;
                }
                let listOfSuppliers = this.getView().getModel("localModel").getProperty("/listOfSuppliers");
                listOfSuppliers.push(osupplierName);
                this.getView().getModel("localModel").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogsupplierName();
            },
        });
    }
);
