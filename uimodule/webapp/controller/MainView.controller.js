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
	"sap/ui/vbm/Containers",
	"sap/ui/model/FilterOperator",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
    * @param {typeof sap.ui.core.Fragment} Fragment 
    * @param {typeof sap.m.MessagePopover} MessagePopover 
    * @param {typeof sap.m.MessageBox} MessageBox 
    * @param {typeof sap.m.MessageToast} MessageToast 
    * @param {typeof sap.m.MessageItem} MessageItem 
    * @param {typeof sap.ui.core.message.Message} Message 
    * @param {typeof sap.ui.core.Core} Core 
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
            onOpenViewImage: function (oEvent) {
                const oButton = oEvent.getSource();
                const oView = this.getView();
                const selectedProduct = oButton.getParent().getBindingContext("localModel").getObject();

                oView.getModel("localModel").setProperty("/selectedRowView", selectedProduct);

                if (!this.oPopover) {
                    this.oPopover = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                    });
                }
                this.oPopover.then(function (oPop) {
                    this.pPopover = oPop;
                    oPop.openBy(oButton);
                }.bind(this));
            },

            oCloseImage: function (oEvent) {
                this.byId("myPopover").close();
            },
            // XLSX

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

            onExportSpreadSheetXLSX: function () {
                const selectedTab = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");
                let oTable, aCols, fileName;

                switch (selectedTab) {
                    case "0":
                        oTable = this.getView().byId("idProductsTable");
                        aCols = this.createColumnConfigTableProducts();
                        fileName = "ListaProductosEnStock.xlsx";
                        break;
                    case "1":
                        oTable = this.getView().byId("listOfSuppliers");
                        aCols = this.createColumnConfigTableSupplier();
                        fileName = "ListaProveedores.xlsx";
                        break;
                    case "2":
                        oTable = this.getView().byId("listOfUnitOfMeasurement");
                        aCols = this.createColumnConfigTableUnitOfMeasurement();
                        fileName = "ListaUnidadMedida.xlsx";
                        break;
                    default:
                        MessageBox.warning("No existen datos, no se puede crear el documento");
                        return;
                }
                const oRowBinding = oTable.getBinding("items");
                if (!oRowBinding || !oRowBinding.getLength()) {
                    MessageBox.warning("No existen datos, no se puede crear el documento");
                    return;
                }
                const oSettings = {
                    workbook: { columns: aCols },
                    dataSource: oRowBinding,
                    fileName: fileName
                };
                const oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    oSheet.destroy();
                });
            },
                        // EXPORTAR TABLAS EN PDF
            onExportPDF: function() {
                debugger;
                const selectedTab = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");
                let oTable, aCols, fileName;
              
                switch (selectedTab) {
                  case "0":
                    oTable = this.getView().byId("idProductsTable");
                    aCols = this.createColumnConfigTableProducts();
                    fileName = "ListaProductosEnStock.pdf";
                    break;
                  case "1":
                    oTable = this.getView().byId("listOfSuppliers");
                    aCols = this.createColumnConfigTableSupplier();
                    fileName = "ListaProveedores.pdf";
                    break;
                  case "2":
                    oTable = this.getView().byId("listOfUnitOfMeasurement");
                    aCols = this.createColumnConfigTableUnitOfMeasurement();
                    fileName = "ListaUnidadMedida.pdf";
                    break;
                  default:
                    MessageBox.warning("No existen datos, no se puede crear el documento");
                    return;
                }
                const oRowBinding = oTable.getBinding("items");
                if (!oRowBinding || !oRowBinding.getLength()) {
                  MessageBox.warning("No existen datos, no se puede crear el documento");
                  return;
                }
            
                const doc = new jsPDF();
                const tableData = oRowBinding.getCurrentContexts().map(function(oContext) {
                  return aCols.map(function(column) {
                    const property = column.property[0];
                    return oContext.getProperty(property);
                  });
                });
                doc.autoTable({
                  head: [aCols.map(function(column) {
                    return column.label;
                  })],
                  body: tableData
                });
                doc.save(fileName);
              },


            // CSV

            onDataExport: function (oEvent) {
                debugger;

                let selectedTab = this.getView().getModel("localModel").getProperty("/selectedIconTabBar");

                if (selectedTab == "0") {

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
                            name: "Nombre",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "Descripcion",
                            template: {
                                content: "{description}"
                            }
                        }, {
                            name: "Imagenes",
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

                } else if (selectedTab == "1") {

                    let oExport = new Export({

                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ","
                        }),
                        models: this.getView().getModel("localModel"),
                        rows: {
                            path: "/listOfSuppliers"
                        },

                        columns: [{
                            name: "Name",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "Telefono",
                            template: {
                                content: "{phone}"
                            }
                        }, {
                            name: "Dirección",
                            template: {
                                content: "{address}"
                            }
                        }, {
                            name: "Estado",
                            template: {
                                content: "{statusName}"
                            }
                        }]
                    });

                } else if (selectedTab == "2") {
                    debugger;

                    let oExport = new Export({
                        exportType: new ExportTypeCSV({
                            separatorChar: ","
                        }),
                        models: this.getView().getModel("localModel"),
                        rows: {
                            path: "/listOfUnitOfMeasurement"
                        },
                        columns: [{
                            name: "Nombres",
                            template: {
                                content: "{name}"
                            }
                        }, {
                            name: "Descripcion",
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
                                content: "{statusName}"
                            }
                        }]
                    });

                }
                // download exported file
                oExport
                    .saveFile()
                    .catch(function (oError) {
                        MessageBox.error(`Error when downloading data. Browser might not be supported!\n\n${oError}`);
                    })
                    .then(function () {
                        oExport.destroy();
                    });
            },
            // FILTRO ASCENDENTE Y DESCENTENTE
            onSortAscending: function() {
                let oTable = this.byId("idProductsTable");
                let oBinding = oTable.getBinding("items");
                let aSorters = [];
                aSorters.push(new sap.ui.model.Sorter("salePrice", false));
                oBinding.sort(aSorters);
              },
              
              onSortDescending: function() {
                let oTable = this.byId("idProductsTable");
                let oBinding = oTable.getBinding("items");
                let aSorters = [];
                aSorters.push(new sap.ui.model.Sorter("salePrice", true));
                oBinding.sort(aSorters);
              },
              
            // FILTRAR PRODUCTOS
            onSearch: function(oEvent) {
                const newValue = oEvent.getSource().getValue();
                this.filter(newValue);
              },
              
              createFilter: function(property, operator, value) {
                return new sap.ui.model.Filter(property, operator, value);
              },
              
              filter: function(value) {
                const selectedTabIndex = this.getView().getModel("localModel").getProperty("/tabSelect");
                const properties = selectedTabIndex === "0"
                  ? ["name", "description", "salePrice", "purchasePrice", "stock", "unitOfMeasurement", "supplier", "statusName"]
                  : ["name", "phone", "address", "statusName"];
                
                const filters = properties.map(prop => this.createFilter(prop, sap.ui.model.FilterOperator.Contains, value));
                const allFilters = new sap.ui.model.Filter(filters, false);
                
                const oBinding = selectedTabIndex === "0"
                  ? this.getView().byId("idProductsTable").getBinding("items")
                  : this.getView().byId("listOfSuppliers").getBinding("items");
                
                oBinding.filter(allFilters);
              },

            //   AGREGAR PRODUCTO
        onAddProduct: function () {
            if (!this.oMPAddProduct) {
                this.oMPAddProduct = this.loadFragment({
                    name: "com.pe.proyectoIntegrador.view.fragment.AddProduct"
                });
            }
            this.oMPAddProduct.then(
                function (oDialog) {
                    this.oDialogProducto = oDialog;
                    this.oDialogProducto.open();
                }.bind(this)
            );
        },
        closeDialogProducto: function () {
            this.oDialogProducto.close();
            this.onClearInputs();
        },
        // AGREGAR PROVEEDORES
        onAddSupplierName: function () {
            debugger
            if (!this.oMPAddSuplierName) {
                this.oMPAddSuplierName = this.loadFragment({
                    name: "com.pe.proyectoIntegrador.view.fragment.AddSupplierName"
                });
            }
            this.oMPAddSuplierName.then(
                function (oDialog) {
                    this.oDialogSupplierName = oDialog;
                    this.oDialogSupplierName.open();
                }.bind(this)
            );
        },
        closeDialogSupplierName: function () {
            this.oDialogSupplierName.close();
            this.onClearInputs();
        },

        onEditProduct: function () {
            if (!this.oMPEditProduct) {
                this.oMPEditProduct = this.loadFragment({
                    name: "com.pe.proyectoIntegrador.view.fragment.EditProduct"
                });
            }
            this.oMPEditProduct.then(
                function (oDialog) {
                    this.oDialogEditProduct = oDialog;
                    this.oDialogEditProduct.open();
                }.bind(this)
            );
        },
        closeDialogProductoe: function () {
            // this.getView().getModel("formularioSimple").setProperty("/search", "");
            // this.onLimpiarCamposDialogo();
            this.oDialogEditProduct.close();
            this.onClearInputs();
        },

            onClearInputs: function () {
                this.getView().getModel("localModel").setProperty("/addProduct",
                    {
                        "name": "",
                        "description": "",
                        "salePrice": "",
                        "image": "",
                        "purchasePrice": "",
                        "stock": "",
                        "unitOfMeasurementName": "",
                        "supplierName": "",
                        "statusName": "",
                        "datepicker": ""
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
                this.getView().getModel("localModel").setProperty("/editProduct",
                    {
                        "name": "",
                        "description": "",
                        "salePrice": "",
                        "image": "",
                        "purchasePrice": "",
                        "stock": "",
                        "unitOfMeasurementName": "",
                        "supplierName": "",
                        "statusName": "",
                        "datepicker": "",
                    });
            },
            // ELIMINAR PRODUCTO
            onConfirmDeletion: function (oEvent) {

                debugger;
            
                const oButton = oEvent.getSource(),
                    oView = this.getView();
                const oProduct = oButton.getParent().getBindingContext("localModel");
                const oSelectObj = oProduct.getObject();
                this.getView().getModel("localModel").setProperty("/selectRowDelete", oSelectObj);
                

                if (!this.oMPProductRemoved) {
                    this.oMPProductRemoved = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.DeleteProduct",
                    });
                }
                this.oMPProductRemoved.then(
                    function (oDialogProductDeleted) {
                        this.oDialogProductDeleted = oDialogProductDeleted;
                        this.oDialogProductDeleted.open();
                    }.bind(this)
                );
            },

            closeDialogRemoveProduct: function () {
                this.oDialogProductDeleted.close();
            },

            onPressDeleteProduct: function () {
                let selectRowDelete =  this.getView().getModel("localModel").getProperty("/selectRowDelete");
                 let listOfProducts = this.getView().getModel("localModel").getProperty("/listOfProducts");
                 let finalProducts = [];
                 
                 for (let index = 0; index < listOfProducts.length; index++){
                     const element = listOfProducts[index];
                     if (element.id != selectRowDelete.id){
                         finalProducts.push(element);
                     }
                 }
                 this.getView().getModel("localModel").setProperty("/listOfProducts", finalProducts);
                 this.getView().getModel("localModel").refresh();
                 MessageBox.success("Producto Eliminado");
                 this.closeDialogRemoveProduct();
             },
            onAddProductTable: function () {
                const {
                  name,
                  description,
                  image,
                  salePrice,
                  purchasePrice,
                  stock,
                  unitOfMeasurementName,
                  supplierName,
                  statusName,
                  datepicker,
                } = this.getView().getModel("localModel").getProperty("/addProduct");
              
                // Validar que los campos requeridos estén completos
                if (!name || !description || !image || !stock || !salePrice ||!purchasePrice ) {
                  MessageBox.warning("Es necesario saber el Nombre, Descripcion y la imagen del Producto");
                  return;
                }
              
                const {
                  selectStateName,
                  selectUnitOfMeasurementName,
                  selectSupplierName
                } = this.getView().getModel("localModel").getData();
              
                let id = 1;
                let listaOrdenada = this.getView().getModel("localModel").getProperty("/listOfProducts").sort(function (a, b) {
                  return b.id - a.id;
                });
                if (listaOrdenada.length > 0) {
                  id = listaOrdenada[0].id + 1
                }
                let oProducto = {
                  "id": id,
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
                  "idStatus": selectStateName,
                  "datepicker": datepicker
                }
              
                let listOfProducts = this.getView().getModel("localModel").getProperty("/listOfProducts");
                listOfProducts.push(oProducto);
                this.getView().getModel("localModel").refresh();
                MessageBox.success("Producto guardado");
                this.closeDialogProducto();
              },



            // DEBUGGER
            onPressEditTabla: function () {
                debugger
                // let id = this.getView().getModel("localModel").getProperty("/editProduct").id;
                const { id, name: nameProduct, description: descriptionProduct, image: imageProduct, salePrice, purchasePrice, stock, unitOfMeasurementName, supplierName, statusName, datepicker } = this.getView().getModel("localModel").getProperty("/editProduct")

                const { selectStateName, selectUnitOfMeasurementName, selectSupplierName } = this.getView().getModel("localModel").getData()

                let oSearchUnit = this.getView().getModel("localModel").getProperty("/ListunitOfMeasurementName").filter(function (item, index) {
                    return item.id == selectUnitOfMeasurementName;
                })

                let oSearchSupplierName = this.getView().getModel("localModel").getProperty("/listSupplierName").filter(function (item, index) {
                    return item.id == selectSupplierName;
                })

                let oSearchStatusName = this.getView().getModel("localModel").getProperty("/activo").filter(function (item, index) {
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
                    "datepicker": datepicker

                }
                let oResp = {
                    valid: false,
                    mensaje: "",

                };
                if (
                    nameProduct.trim().length == 0 ||
                    descriptionProduct.trim().length == 0 ||
                    salePrice <= 0 ||
                    purchasePrice <= 0 ||
                    stock <= 0 ||
                    this.getView().getModel("localModel").getProperty("/selectStateName") == "0" ||
                    this.getView().getModel("localModel").getProperty("/selectSupplierName") == "0" ||
                    this.getView().getModel("localModel").getProperty("/selectUnitOfMeasurementName") == "0"
                ) {
                    oRespuesta2.valid = false;
                    oRespuesta2.mensaje = "llena los campos";

                    // Agregar la condición para mostrar el MessageBox solo si hay campos vacíos
                    if (nomProd.trim().length == 0 ||
                        descProd.trim().length == 0 ||
                        pvProd <= 0 ||
                        pcProd <= 0 ||
                        sProd <= 0 ||
                        this.getView().getModel("localModel").getProperty("/selectActivo") == "0" ||
                        this.getView().getModel("localModel").getProperty("/selectProveedor") == "0" ||
                        this.getView().getModel("localModel").getProperty("/selectUnidadMedida") == "0"
                    ) {
                        MessageBox.warning("Todos los campos son necesarios");
                    }
                    return oRespuesta;
                }

                let listOfProducts = this.getView().getModel("localModel").getProperty("/listOfProducts");
                let finalProducts = [];
                for (let index = 0; index < listOfProducts.length; index++) {
                    const element = listOfProducts[index];
                    if (element.id == oProducto1.id) {
                        finalProducts.push(oProducto1);
                    } else {
                        finalProducts.push(element);
                    }
                }
                this.getView().getModel("localModel").setProperty("/listOfProducts", finalProducts);
                this.getView().getModel("localModel").refresh(true);
                MessageBox.success("Producto actualizado");
                this.closeDialogProducto();
            },


            onPressEdit: function (oEvent) {

                let oButton = oEvent.getSource(),

                    oView = this.getView();

                debugger;

                let oProduct2 = oButton.getParent().getBindingContext("localModel");

                debugger;

                let oSelectObj = oProduct2.getObject();
                debugger;
                this.getView().getModel("localModel").setProperty("/selectUnitOfMeasurementName", oSelectObj.idUnitOfmeasurment);
                this.getView().getModel("localModel").setProperty("/selectSupplierName", oSelectObj.idSupplier);
                this.getView().getModel("localModel").setProperty("/selectStateName", oSelectObj.idStatus);
                this.getView().getModel("localModel").setProperty("/editProduct", oSelectObj);
                this.onEditProduct();

            },
            onInputChange: function (oEvent) {
                const oInput = oEvent.getSource();
                let sValue = oInput.getValue().trim();
                const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/; 
                if (!regex.test(sValue)) {
                    oInput.setValueState("Error");
                    sValue = sValue.replace(/[^\sa-zA-Z]/g, ''); 
                    oInput.setValue(sValue);
                } else {
                    oInput.setValueState("None");
                }
            },
           
            onNumberInput: function (oEvent) {


                const oInput = oEvent.getSource();
                const sValue = oInput.getValue();
                debugger;

                const edadPattern = /[^0-9]/;

                if (edadPattern.test(sValue)) {
                    //oInput.setValueState("Error");
                    oInput.setValue(sValue.replace(/[^0-9]/g, ''));
                } else {
                    oInput.setValueState("None");
                }
            },

            onImageChange: function (oEvent) {
                const oInput = oEvent.getSource();
                const sValue = oInput.getValue();
                const extension = sValue.split('.').pop();
                const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                if (allowedExtensions.indexOf(extension.toLowerCase()) === -1) {
                    oInput.setValue(''); // Limpia el valor del input
                    oInput.setValueState("Error");
                    oInput.setValueStateText("La imagen debe tener una extensión válida (jpg, jpeg, png, gif).");
                } else {
                    oInput.setValueState("None");
                }
            },
        });
    }
);
