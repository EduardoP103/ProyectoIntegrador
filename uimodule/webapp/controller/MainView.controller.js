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
    * @param {typeof sap.f.library} library 
    * @param {typeof sap.ui.core.Fragment} Fragment 
    * @param {typeof sap.m.MessagePopover} MessagePopover 
    * @param {typeof sap.m.MessageBox} MessageBox 
    * @param {typeof sap.m.MessageToast} MessageToast 
    * @param {typeof sap.m.MessageItem} MessageItem 
    * @param {typeof sap.ui.core.message.Message} Message 
    * @param {typeof sap.ui.core.library} coreLibrary 
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
                // note: We don't need to chain to the _pPopover promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("myPopover").close();
            },

            // PDF
            onExportToPDF: function() {
                debugger;
                const oTable = this.getView().byId("idProductsTable"); 
                const aColumns = oTable.getColumns();
                const aColumnData = aColumns.map(function(column) {
                    return {
                        label: column.getHeader(),
                        template: {
                            content: `{$ {column.getAggregation("template").getBindingInfo("text").parts[0].path}}`
                        }
                    };
                });
                const oSettings = {
                    workbook: {
                        columns: aColumnData,
                        context: {
                            application: "SAPUI5 Demo App"
                        }
                    },
                    dataSource: oTable.getModel().getProperty("/selectedIconTabBar"),
                    fileName: "ListaProductosEnStock.pdf"
                };
                const oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
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
                            name: "Nome",
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

            onAddProduct: function () {

                if (!this.oMPProducto) {
                    this.oMPProducto = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AddProduct"
                    });
                }
                this.oMPProducto.then(function (oDialog) {
                    this.oDialogProducto = oDialog;
                    this.oDialogProducto.open();

                }.bind(this));

            },
            closeProducts: function () {
                debugger;
                this.oDialogProducto.close();
                this.onClearInputs();
            },

            // Editar Producto
            onEditarProducto: function () {

                if (!this.oMPProductos) {
                    this.oMPProductos = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditProduct"
                    });
                }
                this.oMPProductos.then(
                    function (oDialog) {
                        this.oDialogProducts = oDialog;
                        this.oDialogProducts.open();

                    }.bind(this)
                );

            },
            closeProducts: function () {
                this.oDialogProducts.close();
                this.onClearInputs();
            },



            // REVISAR ESTO 
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
                        "statusName": ""
                    });
            },
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
                  statusName
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
                  "idStatus": selectStateName
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
                const { id, name: nameProduct, description: descriptionProduct, image: imageProduct, salePrice, purchasePrice, stock, unitOfMeasurementName, supplierName, statusName } = this.getView().getModel("localModel").getProperty("/editProduct")
                // let nameProduct = this.getView().getModel("localModel").getProperty("/editProduct").name;

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
                this.closeProducts();
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
                this.onEditarProducto();

            },
            onInputChange: function (oEvent) {
                const oInput = oEvent.getSource();
                let sValue = oInput.getValue().trim(); // Se elimina cualquier espacio en blanco al principio o al final
                const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/; // Expresión regular para permitir solo letras y un solo espacio entre cada palabra
                if (!regex.test(sValue)) {
                    oInput.setValueState("Error");
                    sValue = sValue.replace(/[^\sa-zA-Z]/g, ''); // Se eliminan todos los caracteres que no son letras o espacios
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

            // FILTROS

            // _filter: function(){
            //     debugger
            //     let oFilter = null;

            //     if(this._oGlobalFilter && this.oPriceFilter){
            //         oFilter = new Filter([this.oGlobalFilter, this.oPriceFilter], true);
            //     } else if(this._oGlobalFilter){
            //         oFilter = this._oGlobalFilter;
            //     } else if (this._oPriceFilter){
            //         oFilter = this._oPriceFilter;
            //     }
            //     this.byId("table").getBinding().filter(oFilter, "Application");
            // },
            // filterGlobally: function(oEvent){
            //     debugger
            //     let sQuery = oEvent.getParameter("query");
            //     this._oGlobalFilter = null;

            //     if(sQuery) {
            //         this._oGlobalFilter = new Filter([
            //             new Filter("Name", FilterOperator.Contains, sQuery),
            //             new Filter("Category", FilterOperator.Contains, sQuery)
            //         ], false);
            //     }
            //     this._filter();
            // },
            // filterPrice: function(oEvent){
            //     debugger
            //     let oColumn = oEvent.getParameter("column");
            //     if(oColumn != this.byId("price")){
            //         return; 
            //     }
            //     oEvent.preventDefault();

            //     let sValue = oEvent.getParameter("value");
            //     function clear(){
            //         this._oPriceFilter = null;
            //         oColumn.setFiltered(false);
            //         this._filter();
            //     }
            //     if (!sValue){
            //         clear.apply(this);
            //         return;
            //     }
            //     let fValue = null;
            //     try {
            //         fValue = parseFloat(sValue, 10);
            //     } catch (e){
            //     }
            //     if(!isNaN(fValue)){
            //         this._oPriceFilter = new Filter("Price", FilterOperator.BT, fValue - 20, fValue + 20);
            //         oColumn.setFiltered(true);
            //         this._filter();
            //     }else{
            //         clear.apply(this);
            //     }
            // },

            // clearAllFilters: function(oEvent){
            //     debugger
            //     let oTable = this.byId("table");
            //     let oUiModel = this.getView().getModel("ui");
            //     oUiModel.setProperty("/globalFilter", "");
			//     oUiModel.setProperty("/availabilityFilterOn", false);

            //     this._oGlobalFilter = null;
            //     this._PriceFilter = null;
            //     this._filter();

            //     let oColumns = oTable.getColumns();
            //     for(let i = 0; i < aColumns.length; i++) {
            //         oTable.fireValidationError(aColumns[i], null);

            //     }
            // },
            // toggleAvailabilityFilter: function(oEvent) {
            //     debugger
            //     this.byId("availability").filter(oEvent.getParameter("pressed") ? "X" : "");
            // },

            // formatAvailableToObjectState: function(bAvailable) {
            //     debugger
            //     return bAvailable ? "Success" : "Error";
            // },
  

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
                    MessageBox.warning("Ingresa todos los campos");
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
