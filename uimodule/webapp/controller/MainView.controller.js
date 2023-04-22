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
        var EdmType = exportLibrary.EdmType;
        var DynamicPageTitleArea = library.DynamicPageTitleArea;

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},

            // ----------------------------Dynamic Page -------------------------//

            getPage: function () {
                return this.byId("dynamicPageId");
            },
            onToggleFooter: function () {
                this.getPage().setShowFooter(!this.getPage().getShowFooter());
            },
            toggleAreaPriority: function () {
                var oTitle = this.getPage().getTitle(),
                    sNewPrimaryArea = oTitle.getPrimaryArea() === DynamicPageTitleArea.Begin ? DynamicPageTitleArea.Middle : DynamicPageTitleArea.Begin;
                oTitle.setPrimaryArea(sNewPrimaryArea);
            },

            onInfo: function () {
                MessageBox.information("Los botones Exportar CSV y Exportar Excel crearán los archivos en base al TAB en el que se encuentre");
            },

            // ----------------------------Card Créditos -------------------------//

            onPressOpenPopover: function (oEvent) {
                var oView = this.getView(),
                    oSourceControl = oEvent.getSource();

                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.Card",
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }

                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oSourceControl);
                });
            },

            // ----------------------------Popover imagen -------------------------//

            handleResponsivePopoverPress: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                if (!this._pPopover1) {
                    this._pPopover1 = Fragment.load({
                        id: oView.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                        controller: this,
                    }).then(function (oPopover1) {
                        oView.addDependent(oPopover1);
                        oPopover1.bindElement("/listaTabla1/0");
                        return oPopover1;
                    });
                }
                this._pPopover1.then(function (oPopover1) {
                    oPopover1.openBy(oButton);
                });
            },

            handleCloseButton: function (oEvent) {
                // note: We don't need to chain to the _pPopover promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("myPopover").close();
            },

            // ----------------------------Creación de columnas para exportar datos en XLSX -------------------------//

            createColumnConfig: function () {
                var aCols = [];

                aCols.push({
                    label: "Nombre",
                    property: ["nombre"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Descripción",
                    property: ["descripcion"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Precio de Venta",
                    property: ["preciov"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Precio de Compra",
                    property: ["precioc"],
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
                    property: ["unidadm"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Proveedor",
                    property: ["proveedor"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols.push({
                    label: "Activo",
                    property: ["activo"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols;
            },
            createColumnConfig2: function () {
                var aCols2 = [];

                aCols2.push({
                    label: "Nombre",
                    property: ["nombre"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols2.push({
                    label: "Telefono",
                    property: ["telefono"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols2.push({
                    label: "Direccion",
                    property: ["direccion"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols2.push({
                    label: "Estado",
                    property: ["estado"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols2;
            },
            createColumnConfig3: function () {
                var aCols3 = [];

                aCols3.push({
                    label: "Nombres",
                    property: ["nombres"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Apellidos",
                    property: ["apellidos"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "E-mail",
                    property: ["correoelectronico"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Sexo",
                    property: ["sexo"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Tipo Documento",
                    property: ["tipodocumento"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Número Documento",
                    property: ["numdocumento"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Celular",
                    property: ["celular"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Distrito",
                    property: ["distrito"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols3.push({
                    label: "Dirección",
                    property: ["direccion"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols3;
            },

            // ----------------------------Exportar datos en XLSX -------------------------//

            onExportSpreadSheetXLSX: function () {
                var aCols, oRowBinding, oSettings, oSheet, oTable, fileName;
                var selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");
                let nodata = false;
                if (selectedTab === "0") {
                    oTable = this.getView().byId("idProductsTable1");

                    if (oTable.getBinding("items").oList.length > 0) {
                        aCols = this.createColumnConfig();
                        fileName = "ListaProductosEnStock.xlsx";
                    } else {
                        nodata = true;
                    }
                } else if (selectedTab === "1") {
                    oTable = this.getView().byId("idProductsTable2");

                    if (oTable.getBinding("items").oList.length > 0) {
                        aCols = this.createColumnConfig2();
                        fileName = "ListaProveedores.xlsx";
                    } else {
                        nodata = true;
                    }
                } else if (selectedTab === "2") {
                    oTable = this.getView().byId("idProductsTable3");

                    if (oTable.getBinding("items").oList.length > 0) {
                        aCols = this.createColumnConfig3();
                        fileName = "ListaClientes.xlsx";
                    } else {
                        nodata = true;
                    }
                }
                if (nodata) {
                    MessageBox.warning("No existen datos, no se puede crear el documento");
                } else {
                    util.utilController.exportSpreadSheetXLSX(oTable, aCols, fileName);
                }

                return;
                
            },
            // ----------------------------Exportar datos en CSV -------------------------//
            
            onDataExport : function(oEvent) {

                var selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");

                if(selectedTab === "0"){

                    var oExport = new Export({
        
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaTabla1"
                        },
        
                        // column definitions with column name and binding info for the content
        
                        columns : [{
                            name : "Nombre",
                            template : {
                                content : "{nombre}"
                            }
                        }, {
                            name : "Descripcion",
                            template : {
                                content : "{descripcion}"
                            }
                        }, {
                            name : "Precio V.",
                            template : {
                                content : "{preciov}"
                            }
                        },  {
                            name : "Precio C.",
                            template : {
                                content : "{precioc}"
                            }
                        },  {
                            name : "Stock",
                            template : {
                                content : "{stock}"
                            }
                        }, {
                            name : "Unidad M.",
                            template : {
                                content : "{unidadm}"
                            }
                        }, {
                            name : "Proveedor",
                            template : {
                                content : "{proveedor}"
                            }
                        }, {
                            name : "Activo",
                            template : {
                                content : "{activo}"
                            }
                        }]
                    });
    
                } else if (selectedTab === "1"){

                    var oExport = new Export({
        
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaTabla2"
                        },
        
                        // column definitions with column name and binding info for the content
        
                        columns : [{
                            name : "Nombre",
                            template : {
                                content : "{nombre}"
                            }
                        }, {
                            name : "Telefono",
                            template : {
                                content : "{telefono}"
                            }
                        }, {
                            name : "Direccion",
                            template : {
                                content : "{direccion}"
                            }
                        },  {
                            name : "Estado",
                            template : {
                                content : "{estado}"
                            }
                        }]
                    });
    
                } else if (selectedTab === "2"){

                    var oExport = new Export({
        
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaTabla3"
                        },
        
                        // column definitions with column name and binding info for the content
        
                        columns : [{
                            name : "Nombres",
                            template : {
                                content : "{nombres}"
                            }
                        }, {
                            name : "Apellidos",
                            template : {
                                content : "{apellidos}"
                            }
                        }, {
                            name : "E-mail",
                            template : {
                                content : "{correoelectronico}"
                            }
                        },  {
                            name : "Sexo",
                            template : {
                                content : "{sexo}"
                            }
                        },  {
                            name : "Tipo Documento",
                            template : {
                                content : "{tipodocumento}"
                            }
                        },  {
                            name : "Numero Documento",
                            template : {
                                content : "{numdocumento}"
                            }
                        },  {
                            name : "Celular",
                            template : {
                                content : "{celular}"
                            }
                        },  {
                            name : "Distrito",
                            template : {
                                content : "{distrito}"
                            }
                        },  {
                            name : "Dirección",
                            template : {
                                content : "{direccion}"
                            }
                        }]
                    });
    
                }
                // download exported file
                oExport.saveFile().catch(function(oError) {
                    MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                }).then(function() {
                    oExport.destroy();
                });
            }/*,
            onChangeSelect : function(oEvent){
                
                let key ;
                //Formas de como obtener el key
                key = oEvent.getSource().getProperty("selectedKey");
                
                key = this.getView().byId("distritoid").getSelectedItem().mProperties.key

                key = this.getView().byId("distritoid").getSelectedItem().getProperty("key");

                key = this.getView().getModel("formularioSimple").getProperty("/distritoSelect")
                
                if (key!=1){
                    MessageBox.warning("Por el momento solo se puede seleccionar Perú");
                    this.getView().getModel("formularioSimple").setProperty("/distritoSelect", "0");
                    return;
                }
                
            }*/,

            //Abrir Dialogo 5 (Fragment de productos)
            onAddProducto: function () {
                
                    if (!this.oMPProducto) {
                        this.oMPProducto = this.loadFragment({
                            name: "com.pe.proyectoIntegrador.view.fragment.AgregarProductos"
                        });
                    }
                    this.oMPProducto.then(function (oDialog) {
                        this.oDialogProducto = oDialog;
                        this.oDialogProducto.open();

                    }.bind(this));
                
            },
            closeDialogProducto: function () {
                //this.getView().getModel("formularioSimple").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
                this.oDialogProducto.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Limpiar campos a ingresar -------------------------//

            onLimpiarCamposDialogos: function(){
                this.getView().getModel("formularioSimple").setProperty("/addProducto", {
                    nombre: "",
                    descripcion: "",
                    preciov: "",
                    precioc: "",
                    precio: "",
                    stock: "",
                    unidadm: "",
                    proveedor: "",
                    activo: ""
                });
            },

            // ----------------------------Agregar registro a las tablas -------------------------//

            onAddProductoTabla: function () {
                let n = this.getView().getModel("formularioSimple").getProperty("/addProducto").nombre;
                let d = this.getView().getModel("formularioSimple").getProperty("/addProducto").descripcion;
                let pv = this.getView().getModel("formularioSimple").getProperty("/addProducto").preciov;
                let pc = this.getView().getModel("formularioSimple").getProperty("/addProducto").precioc;
                let s = this.getView().getModel("formularioSimple").getProperty("/addProducto").stock;
                let um = this.getView().getModel("formularioSimple").getProperty("/addProducto").unidadm;
                let pro = this.getView().getModel("formularioSimple").getProperty("/addProducto").proveedor;
                let ac = this.getView().getModel("formularioSimple").getProperty("/addProducto").activo;
                let oRespuesta = {
                    valid : true,
                    mensaje : ""
                };
                if ( n.trim().length == 0 ||
                    d.trim().length == 0 ||
                    pv <= 0 ||
                    pc <= 0 ||
                    s <= 0 ||
                    um.trim().length == 0 ||
                    pro.trim().length == 0 ||
                    ac.trim().length == 0 ){
                    oRespuesta.valid = false;
                    oRespuesta.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta;
                }
                let items = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");

                var obj = this.getView().getModel("formularioSimple").getProperty("/addProducto");

                let listaFinal = [];
                items.forEach((element) => {
                    listaFinal.push(element);
                });
                listaFinal.push(obj);
                console.log(listaFinal);

                let listaF = [...items, ...[obj]];
                console.log(listaF);
                this.getView().getModel("formularioSimple").setProperty("/listaTabla1", listaF);
                this.getView().getModel("formularioSimple").refresh();
                // var oBinding = this.getView().byId("idProductsTable").getBinding("items");
                // oBinding.refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.onLimpiarCamposDialogos();
            }
        });
    }
);
