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
        const EdmType = exportLibrary.EdmType;
        const DynamicPageTitleArea = library.DynamicPageTitleArea;

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
                const oTitle = this.getPage().getTitle(),
                    sNewPrimaryArea = oTitle.getPrimaryArea() === DynamicPageTitleArea.Begin ? DynamicPageTitleArea.Middle : DynamicPageTitleArea.Begin;
                oTitle.setPrimaryArea(sNewPrimaryArea);
            },

            onInfo: function () {
                MessageBox.information("Los botones Exportar CSV, Exportar Excel y Exportar PDF crearán los archivos en base al TAB en el que se encuentre");
            },
            
            // ----------------------------Card Créditos -------------------------//

            onPressOpenPopover: function (oEvent) {
                const oView = this.getView(),
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

            // ----------------------------Card Datos Consultor -------------------------//

            onPressOpenPopover2: function (oEvent) {
                const oView1 = this.getView(),
                    oSourceControl1 = oEvent.getSource();

                if (!this._pPopover2) {
                    this._pPopover2 = Fragment.load({
                        id: oView1.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.Card2",
                    }).then(function (oPopover2) {
                        oView1.addDependent(oPopover2);
                        return oPopover2;
                    });
                }

                this._pPopover2.then(function (oPopover2) {
                    oPopover2.openBy(oSourceControl1);
                });
            },

            // ----------------------------Abrir páginas web auspiciadoras -------------------------//

            clickMemorykings: function(){
                var link= "https://www.memorykings.pe"
                window.open(link);
                //sap.m.URLHelper.redirect(link,true);
            },

            clickCyC: function(){
                var link= "https://cyccomputer.pe"
                window.open(link);
                //sap.m.URLHelper.redirect(link,true);
            },

            clicLogitech: function(){
                var link= "https://www.logitech.com/es-roam"
                window.open(link);
                //sap.m.URLHelper.redirect(link,true);
            },

            clicSeidor: function(){
                var link= "https://www.seidor.com/es-pe"
                window.open(link);
                //sap.m.URLHelper.redirect(link,true);
            },

            // ----------------------------Popover imagen -------------------------//

            handleResponsivePopoverPress: function (oEvent) {
                const oButton = oEvent.getSource(),
                    oView = this.getView();
                debugger;
                const oProduct = oButton.getParent().getBindingContext("formularioSimple");
                debugger;
                const oSelectObj = oProduct.getObject();
                this.getView().getModel("formularioSimple").setProperty("/selectedRowViewImage", oSelectObj);
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

            handleCloseButton: function (oEvent) {
                // note: We don't need to chain to the _pPopover promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("myPopover").close();
            },

            // ----------------------------Busqueda y filtrado de productos -------------------------//

            onSearch : function(oEvent){
                debugger;
                var newValue = oEvent.getSource().getValue();
                this.filtering(newValue);
            },
            filtering : function(value) {

                const selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");

                if (selectedTab === "0"){
                    
                    var oFilter1 = new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter2 = new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter3 = new sap.ui.model.Filter("preciov", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter4 = new sap.ui.model.Filter("precioc", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter5 = new sap.ui.model.Filter("stock", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter6 = new sap.ui.model.Filter("unidadm", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter7 = new sap.ui.model.Filter("proveedor", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter8 = new sap.ui.model.Filter("activo", sap.ui.model.FilterOperator.Contains, value);
                    
                    var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4,oFilter5, oFilter6, oFilter7, oFilter8], false); 
                
                    var oBinding = this.getView().byId("idProductsTable1").getBinding("items");
                    oBinding.filter(allFilter);

                }else if (selectedTab === "1"){

                    var oFilter1 = new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter2 = new sap.ui.model.Filter("telefono", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter3 = new sap.ui.model.Filter("direccion", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter4 = new sap.ui.model.Filter("estado", sap.ui.model.FilterOperator.Contains, value);
                    
                    var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4], false); 
                
                    var oBinding = this.getView().byId("idProductsTable2").getBinding("items");
                    oBinding.filter(allFilter);
                    
                }else if (selectedTab === "2"){

                    var oFilter1 = new sap.ui.model.Filter("nombres", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter2 = new sap.ui.model.Filter("apellidos", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter3 = new sap.ui.model.Filter("correoelectronico", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter4 = new sap.ui.model.Filter("sexo", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter5 = new sap.ui.model.Filter("tipodocumento", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter6 = new sap.ui.model.Filter("numdocumento", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter7 = new sap.ui.model.Filter("celular", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter8 = new sap.ui.model.Filter("distrito", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter9 = new sap.ui.model.Filter("direccion", sap.ui.model.FilterOperator.Contains, value);
                    
                    var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4,oFilter5, oFilter6, oFilter7, oFilter8, oFilter9], false); 
                
                    var oBinding = this.getView().byId("idProductsTable3").getBinding("items");
                    oBinding.filter(allFilter);

                }else if (selectedTab === "3"){

                    var oFilter1 = new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter2 = new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter3 = new sap.ui.model.Filter("abreviatura", sap.ui.model.FilterOperator.Contains, value);
                    var oFilter4 = new sap.ui.model.Filter("estado", sap.ui.model.FilterOperator.Contains, value);
                    
                    var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4], false); 
                
                    var oBinding = this.getView().byId("idProductsTable4").getBinding("items");
                    oBinding.filter(allFilter);

                }

                
             },

            // ----------------------------Creación de columnas para exportar datos en XLSX -------------------------//

            createColumnConfig: function () {
                const aCols = [];

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
                    label: "URL Imagen",
                    property: ["imagen"],
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
                const aCols2 = [];

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
                const aCols3 = [];

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
            createColumnConfig4: function () {
                const aCols4 = [];

                aCols4.push({
                    label: "Nombre",
                    property: ["nombre"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols4.push({
                    label: "Descripcion",
                    property: ["descripcion"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols4.push({
                    label: "Abreviatura",
                    property: ["abreviatura"],
                    type: EdmType.String,
                    template: "{0}",
                });

                aCols4.push({
                    label: "Estado",
                    property: ["estado"],
                    type: EdmType.String,
                    template: "{0}",
                });

                return aCols4;
            },

            // ----------------------------Exportar datos en XLSX -------------------------//

            onExportSpreadSheetXLSX: function () {
                let aCols, oRowBinding, oSettings, oSheet, oTable, fileName;
                const selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");
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
                } else if (selectedTab === "3") {
                    oTable = this.getView().byId("idProductsTable4");

                    if (oTable.getBinding("items").oList.length > 0) {
                        aCols = this.createColumnConfig4();
                        fileName = "ListaUnidadMedida.xlsx";
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

            onDataExport: function (oEvent) {
                const selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");

                if (selectedTab === "0") {
                    var oExport = new Export({
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ",",
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("formularioSimple"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listaTabla1",
                        },

                        // column definitions with column name and binding info for the content

                        columns: [
                            {
                                name: "Nombre",
                                template: {
                                    content: "{nombre}",
                                },
                            },
                            {
                                name: "Descripcion",
                                template: {
                                    content: "{descripcion}",
                                },
                            },
                            {
                                name: "Imagen URL",
                                template: {
                                    content: "{imagen}",
                                },
                            },
                            {
                                name: "Precio V.",
                                template: {
                                    content: "{preciov}",
                                },
                            },
                            {
                                name: "Precio C.",
                                template: {
                                    content: "{precioc}",
                                },
                            },
                            {
                                name: "Stock",
                                template: {
                                    content: "{stock}",
                                },
                            },
                            {
                                name: "Unidad M.",
                                template: {
                                    content: "{unidadm}",
                                },
                            },
                            {
                                name: "Proveedor",
                                template: {
                                    content: "{proveedor}",
                                },
                            },
                            {
                                name: "Activo",
                                template: {
                                    content: "{activo}",
                                },
                            },
                        ],
                    });
                } else if (selectedTab === "1") {
                    var oExport = new Export({
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ",",
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("formularioSimple"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listaTabla2",
                        },

                        // column definitions with column name and binding info for the content

                        columns: [
                            {
                                name: "Nombre",
                                template: {
                                    content: "{nombre}",
                                },
                            },
                            {
                                name: "Telefono",
                                template: {
                                    content: "{telefono}",
                                },
                            },
                            {
                                name: "Direccion",
                                template: {
                                    content: "{direccion}",
                                },
                            },
                            {
                                name: "Estado",
                                template: {
                                    content: "{estado}",
                                },
                            },
                        ],
                    });
                } else if (selectedTab === "2") {
                    var oExport = new Export({
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ",",
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("formularioSimple"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listaTabla3",
                        },

                        // column definitions with column name and binding info for the content

                        columns: [
                            {
                                name: "Nombres",
                                template: {
                                    content: "{nombres}",
                                },
                            },
                            {
                                name: "Apellidos",
                                template: {
                                    content: "{apellidos}",
                                },
                            },
                            {
                                name: "E-mail",
                                template: {
                                    content: "{correoelectronico}",
                                },
                            },
                            {
                                name: "Sexo",
                                template: {
                                    content: "{sexo}",
                                },
                            },
                            {
                                name: "Tipo Documento",
                                template: {
                                    content: "{tipodocumento}",
                                },
                            },
                            {
                                name: "Numero Documento",
                                template: {
                                    content: "{numdocumento}",
                                },
                            },
                            {
                                name: "Celular",
                                template: {
                                    content: "{celular}",
                                },
                            },
                            {
                                name: "Distrito",
                                template: {
                                    content: "{distrito}",
                                },
                            },
                            {
                                name: "Dirección",
                                template: {
                                    content: "{direccion}",
                                },
                            },
                        ],
                    });
                } else if (selectedTab === "3") {
                    var oExport = new Export({
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType: new ExportTypeCSV({
                            separatorChar: ",",
                        }),

                        // Pass in the model created above
                        models: this.getView().getModel("formularioSimple"),

                        // binding information for the rows aggregation
                        rows: {
                            path: "/listaTabla4",
                        },

                        // column definitions with column name and binding info for the content

                        columns: [
                            {
                                name: "Nombre",
                                template: {
                                    content: "{nombre}",
                                },
                            },
                            {
                                name: "Descripcion",
                                template: {
                                    content: "{descripcion}",
                                },
                            },
                            {
                                name: "Abreviatura",
                                template: {
                                    content: "{abreviatura}",
                                },
                            },
                            {
                                name: "Estado",
                                template: {
                                    content: "{estado}",
                                },
                            },
                        ],
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

            // ----------------------------Abrir Fragment Agregar Producto -------------------------//
            onAddProducto: function () {
                if (!this.oMPProducto) {
                    this.oMPProducto = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarProductos",
                    });
                }
                this.oMPProducto.then(
                    function (oDialog) {
                        this.oDialogProducto = oDialog;
                        this.oDialogProducto.open();
                    }.bind(this)
                );
            },
            closeDialogProducto: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogProducto.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Abrir Fragment Editar Producto -------------------------//
            onEditarProducto: function () {
                if (!this.oMPProductoe) {
                    this.oMPProductoe = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditarProductos",
                    });
                }
                this.oMPProductoe.then(
                    function (oDialog) {
                        this.oDialogProductoe = oDialog;
                        this.oDialogProductoe.open();
                    }.bind(this)
                );
            },
            closeDialogProductoe: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogProductoe.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Botón eliminar producto -------------------------//

            onConfirmarEliminacion: function (oEvent) {

                
            
                const oButton = oEvent.getSource(),
                    oView = this.getView();
                const oProduct = oButton.getParent().getBindingContext("formularioSimple");
                const oSelectObj = oProduct.getObject();
                this.getView().getModel("formularioSimple").setProperty("/selectedRowEliminar", oSelectObj);
                

                if (!this.oMPProductoEliminado) {
                    this.oMPProductoEliminado = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EliminarProducto",
                    });
                }
                this.oMPProductoEliminado.then(
                    function (oDialogProductoEliminado) {
                        this.oDialogProductoEliminado = oDialogProductoEliminado;
                        this.oDialogProductoEliminado.open();
                    }.bind(this)
                );
            },

            closeDialogEliminarProducto: function () {
                this.oDialogProductoEliminado.close();
            },
            onPressEliminarProducto: function () {
               let selectedRowEliminar =  this.getView().getModel("formularioSimple").getProperty("/selectedRowEliminar");
                let listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");

                let listaFinal = [];
                
                for (let index = 0; index < listaTabla1.length; index++){
                    const element = listaTabla1[index];
                    if (element.id != selectedRowEliminar.id){
                        listaFinal.push(element);
                    }
                }
                this.getView().getModel("formularioSimple").setProperty("/listaTabla1", listaFinal);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Producto Eliminado");
                this.closeDialogEliminarProducto();
            },

            // ----------------------------Abrir Fragment Configuracion -------------------------//

            onConfig: function () {
                if (!this.oMPConfig) {
                    this.oMPConfig = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.ConfiguradorColumnas",
                    });
                }
                this.oMPConfig.then(
                    function (oDialogConf) {
                        this.oDialogConfig = oDialogConf;
                        this.oDialogConfig.open();
                    }.bind(this)
                );
            },

            closeDialogConfig: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogConfig.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Abrir Fragment Agregar Proveedor -------------------------//

            onAddProveedor: function () {
                if (!this.oMPProveedor) {
                    this.oMPProveedor = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarProveedor",
                    });
                }
                this.oMPProveedor.then(
                    function (oDialog1) {
                        this.oDialogProveedor = oDialog1;
                        this.oDialogProveedor.open();
                    }.bind(this)
                );
            },
            closeDialogProveedor: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogProveedor.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Abrir Fragment Agregar Cliente -------------------------//

            onAddCliente: function () {
                if (!this.oMPCliente) {
                    this.oMPCliente = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarCliente",
                    });
                }
                this.oMPCliente.then(
                    function (oDialog2) {
                        this.oDialogCliente = oDialog2;
                        this.oDialogCliente.open();
                    }.bind(this)
                );
            },
            closeDialogCliente: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogCliente.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Abrir Fragment Agregar Unidad Medida -------------------------//

            onAddUnidadMedida: function () {
                if (!this.oMPUnidad) {
                    this.oMPUnidad = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarUnidadMedida",
                    });
                }
                this.oMPUnidad.then(
                    function (oDialog3) {
                        this.oDialogUnidad = oDialog3;
                        this.oDialogUnidad.open();
                    }.bind(this)
                );
            },
            closeDialogUnidadMedida: function () {
                // this.getView().getModel("formularioSimple").setProperty("/search", "");
                // this.onLimpiarCamposDialogo();
                this.oDialogUnidad.close();
                this.onLimpiarCamposDialogos();
            },

            // ----------------------------Limpiar campos a ingresar -------------------------//

            onLimpiarCamposDialogos: function () {
                this.getView().getModel("formularioSimple").setProperty("/addProducto", {
                    nombre: "",
                    descripcion: "",
                    preciov: "",
                    urlImage: "",
                    previoc: "",
                    stock: "",
                    unidadm: "",
                    proveedor: "",
                    activo: "",
                });

                this.getView().getModel("formularioSimple").setProperty("/selectProveedor", "0");

                this.getView().getModel("formularioSimple").setProperty("/selectUnidadMedida", "0");

                this.getView().getModel("formularioSimple").setProperty("/selectActivo", "0");

                this.getView().getModel("formularioSimple").setProperty("/addProveedor", {
                    nombre: "",
                    telefono: "",
                    direccion: "",
                    estado: "",
                });

                this.getView().getModel("formularioSimple").setProperty("/addCliente", {
                    nombres: "",
                    apellidos: "",
                    correoelectronico: "",
                    numdocumento: "",
                    celular: "",
                    distrito: ""
                });

                this.getView().getModel("formularioSimple").setProperty("/selectSexo", "0");

                this.getView().getModel("formularioSimple").setProperty("/selectTipoDocumento", "0");

                this.getView().getModel("formularioSimple").setProperty("/selectDistrito", "0");

                this.getView().getModel("formularioSimple").setProperty("/addUnidadMedida", {
                    nombre: "",
                    descripcion: "",
                    abreviatura: "",
                    activo: "",
                });
            },

            // ----------------------------Agregar registros a las tabla Producto -------------------------//

            onAddProductoTabla: function () {
                const n = this.getView().getModel("formularioSimple").getProperty("/addProducto").nombre;
                const d = this.getView().getModel("formularioSimple").getProperty("/addProducto").descripcion;
                const urlImage = this.getView().getModel("formularioSimple").getProperty("/addProducto").urlImage;
                const pv = this.getView().getModel("formularioSimple").getProperty("/addProducto").preciov;
                const pc = this.getView().getModel("formularioSimple").getProperty("/addProducto").precioc;
                const s = this.getView().getModel("formularioSimple").getProperty("/addProducto").stock;
                const um = this.getView().getModel("formularioSimple").getProperty("/addProducto").unidadm;
                const pro = this.getView().getModel("formularioSimple").getProperty("/addProducto").proveedor;
                const ac = this.getView().getModel("formularioSimple").getProperty("/addProducto").activo;

                const selectUnidadMedida = this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida");
                const selectProveedor = this.getView().getModel("formularioSimple").getProperty("/selectProveedor");
                const selectActivo = this.getView().getModel("formularioSimple").getProperty("/selectActivo");
                let id
                if(this.getView().getModel("formularioSimple").getProperty("/listaTabla1").length==0){
                    id= 1
                }else{
                    let listaTabla1OrdenadoDesc = this.getView().getModel("formularioSimple").getProperty("/listaTabla1").sort(function(a, b){

                        return b.id - a.id;
                            
                        });
                        id =  listaTabla1OrdenadoDesc[0].id + 1
                }
               

                const oProducto = {
                    id: id,
                    nombre: n,
                    descripcion: d,
                    imagen: urlImage,
                    preciov: pv,
                    precioc: pc,
                    stock: s,
                    unidadm: this.getView().byId("idUnidadMedida").getSelectedItem().getProperty("text"),
                    proveedor: this.getView().byId("idProveedor").getSelectedItem().getProperty("text"),
                    activo: this.getView().byId("idActivo").getSelectedItem().getProperty("text"),
                    idUnidaddm: selectUnidadMedida,
                    idProveedor: selectProveedor,
                    idActivo: selectActivo
                };
                const oRespuesta = {
                    valid: true,
                    mensaje: "",
                };
                if (
                    n.trim().length == 0 ||
                    d.trim().length == 0 ||
                    pv <= 0 ||
                    pc <= 0 ||
                    s <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectActivo") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectProveedor") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida") == "0"
                ) {
                    oRespuesta.valid = false;
                    oRespuesta.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta;
                }
                const listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");
                listaTabla1.push(oProducto);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogProducto();
            },

            // ----------------------------Editar registros de Producto -------------------------//

            onEditProductoTabla: function () {
                const id = this.getView().getModel("formularioSimple").getProperty("/editProducto").id;
                const nomProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").nombre;
                const descProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").descripcion;
                const urlImage = this.getView().getModel("formularioSimple").getProperty("/editProducto").urlImage;
                const pvProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").preciov;
                const pcProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").precioc;
                const sProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").stock;
                const um = this.getView().getModel("formularioSimple").getProperty("/editProducto").unidadm;
                const pro = this.getView().getModel("formularioSimple").getProperty("/editProducto").proveedor;
                const ac = this.getView().getModel("formularioSimple").getProperty("/editProducto").activo;

                const selectUnidadMedida = this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida");
                const selectProveedor = this.getView().getModel("formularioSimple").getProperty("/selectProveedor");
                const selectActivo = this.getView().getModel("formularioSimple").getProperty("/selectActivo");

                const aEncontradoUnidad = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/unidadMedida")
                    .filter(function (item, index) {
                        return item.id == selectUnidadMedida;
                    });

                const aEncontradoProveedor = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/listaProveedores")
                    .filter(function (item, index) {
                        return item.id == selectProveedor;
                    });

                const aEncontradoActivo = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/activo")
                    .filter(function (item, index) {
                        return item.id == selectActivo;
                    });

                const oProducto1 = {
                    id: id,
                    nombre: nomProd,
                    descripcion: descProd,
                    imagen: urlImage,
                    preciov: pvProd,
                    precioc: pcProd,
                    stock: sProd,
                    unidadm: aEncontradoUnidad[0].name, // "und" ,
                    proveedor: aEncontradoProveedor[0].name, // "pro",
                    activo: aEncontradoActivo[0].name, // "act"
                    idUnidaddm: selectUnidadMedida,
                    idProveedor: selectProveedor,
                    idActivo: selectActivo,
                };
                const oRespuesta2 = {
                    valid: true,
                    mensaje: "",
                };
                if (
                    nomProd.trim().length == 0 ||
                    descProd.trim().length == 0 ||
                    pvProd <= 0 ||
                    pcProd <= 0 ||
                    sProd <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectActivo") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectProveedor") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida") == "0"
                ) {
                    oRespuesta2.valid = false;
                    oRespuesta2.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta2;
                }
                const listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");
                // listaTabla1.push(oProducto);
                const listaFinal = [];
                for (let index = 0; index < listaTabla1.length; index++) {
                    const element = listaTabla1[index];
                    if (element.id == oProducto1.id) {
                        listaFinal.push(oProducto1);
                    } else {
                        listaFinal.push(element);
                    }
                }
                this.getView().getModel("formularioSimple").setProperty("/listaTabla1", listaFinal);
                this.loadSupplierPost();
                this.getView().getModel("formularioSimple").refresh(true);
                MessageBox.success("Datos editados correctamente");
                this.closeDialogProductoe();
            },

            // ----------------------------Llamar datos al editar producto y llamado del Fragment -------------------------//

            onEditProducto: function (oEvent) {
                const oButton = oEvent.getSource(),
                    oView = this.getView();

                const oProduct2 = oButton.getParent().getBindingContext("formularioSimple");

                const oSelectObj = oProduct2.getObject();

                const obj = {
                    id: oSelectObj.id,
                    nombre: oSelectObj.nombre,
                    descripcion: oSelectObj.descripcion,
                    preciov: oSelectObj.preciov,
                    urlImage: oSelectObj.imagen,
                    precioc: oSelectObj.precioc,
                    stock: oSelectObj.stock,
                    // "idUnidaddm": oSelectObj.idUnidaddm,
                    unidadm: oSelectObj.unidadm,
                    // "idProveedor": oSelectObj.idProveedor,
                    proveedor: oSelectObj.proveedor,
                    // "idActivo": oSelectObj.idActivo,
                    activo: oSelectObj.activo,
                };

                this.getView().getModel("formularioSimple").setProperty("/selectUnidadMedida", oSelectObj.idUnidaddm);
                this.getView().getModel("formularioSimple").setProperty("/selectProveedor", oSelectObj.idProveedor);
                this.getView().getModel("formularioSimple").setProperty("/selectActivo", oSelectObj.idActivo);

                this.getView().getModel("formularioSimple").setProperty("/editProducto", obj);
                // this.onEditProductoTabla();
                this.onEditarProducto();
            },

            // ----------------------------Agregar registros a las tabla Proveedor -------------------------//

            onAddProveedorTabla: function () {
                const nom = this.getView().getModel("formularioSimple").getProperty("/addProveedor").nombre;
                const tel = this.getView().getModel("formularioSimple").getProperty("/addProveedor").telefono;
                const dir = this.getView().getModel("formularioSimple").getProperty("/addProveedor").direccion;
                const est = this.getView().getModel("formularioSimple").getProperty("/addProveedor").estado;

                const oProveedor = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaTabla2").length+1,
                    nombre: nom,
                    telefono: tel,
                    direccion: dir,
                    estado: this.getView().byId("idActivo3").getSelectedItem().getProperty("text")
                };

                const oRespuesta2 = {
                    valid: true,
                    mensaje: "",
                };
                if (nom.trim().length == 0 || 
                    dir.trim().length == 0 || tel <= 0 || 
                    this.getView().getModel("formularioSimple").getProperty("/selectActivo") == "0"
                    ) {
                    oRespuesta2.valid = false;
                    oRespuesta2.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta2;
                }
                const listaTabla2 = this.getView().getModel("formularioSimple").getProperty("/listaTabla2");
                listaTabla2.push(oProveedor);
                
                MessageBox.success("Datos ingresados correctamente");
                this.loadSupplierPost();
                this.getView().getModel("formularioSimple").refresh(true);
                this.closeDialogProveedor();
            },

            // ----------------------------Agregar registros a las tabla Cliente -------------------------//

            onAddClienteTabla: function () {
                const nomCLi = this.getView().getModel("formularioSimple").getProperty("/addCliente").nombres;
                const apeCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").apellidos;
                const correoCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").correoelectronico;
                const sexoCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").sexo;
                const tipoDocuCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").tipodocumento;
                const numDocuCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").numdocumento;
                const celuCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").celular;
                const distritoCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").distrito;
                const direccionCli = this.getView().getModel("formularioSimple").getProperty("/addCliente").direccion;

                const oCliente = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaTabla3").length+1,
                    nombres: nomCLi,
                    apellidos: apeCli,
                    correoelectronico: correoCli,
                    sexo: this.getView().byId("idSexo").getSelectedItem().getProperty("text"),
                    tipodocumento: this.getView().byId("idTipoDocumento").getSelectedItem().getProperty("text"),
                    numdocumento: numDocuCli,
                    celular: celuCli,
                    distrito: this.getView().byId("idDistrito").getSelectedItem().getProperty("text"),
                    direccion: direccionCli
                };

                const oRespuesta3 = {
                    valid: true,
                    mensaje: "",
                };
                if (nomCLi.trim().length == 0 || 
                    apeCli.trim().length == 0 ||
                    correoCli.trim().length == 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectSexo") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectTipoDocumento") == "0" ||
                    numDocuCli <= 0 ||
                    celuCli <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectDistrito") == "0" ||
                    direccionCli.trim().length == 0
                    ) {
                    oRespuesta3.valid = false;
                    oRespuesta3.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta3;
                }
                const listaTabla3 = this.getView().getModel("formularioSimple").getProperty("/listaTabla3");
                listaTabla3.push(oCliente);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogCliente();
            },

            // ----------------------------Agregar registros a las tabla Unidad Medida -------------------------//

            onAddUnidadMedidaTabla: function () {
                const nomUM = this.getView().getModel("formularioSimple").getProperty("/addUnidadMedida").nombre;
                const descUM = this.getView().getModel("formularioSimple").getProperty("/addUnidadMedida").descripcion;
                const abrevUM = this.getView().getModel("formularioSimple").getProperty("/addUnidadMedida").abreviatura;
                const estUM = this.getView().getModel("formularioSimple").getProperty("/addUnidadMedida").estado;

                const oUnidad = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaTabla2").length+1,
                    nombre: nomUM,
                    descripcion: descUM,
                    abreviatura: abrevUM,
                    estado: this.getView().byId("idActivoUM").getSelectedItem().getProperty("text")
                };

                const oRespuesta4 = {
                    valid: true,
                    mensaje: "",
                };
                if (nomUM.trim().length == 0 || 
                descUM.trim().length == 0 || 
                abrevUM.trim().length == 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectActivo") == "0"
                    ) {
                    oRespuesta4.valid = false;
                    oRespuesta4.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta4;
                }
                const listaTabla4 = this.getView().getModel("formularioSimple").getProperty("/listaTabla4");
                listaTabla4.push(oUnidad);
                
                MessageBox.success("Datos ingresados correctamente");
                this.loadMeasurementPost();
                this.getView().getModel("formularioSimple").refresh(true);
                this.closeDialogUnidadMedida();
            },

            // ----------------------------Agregar datos de la tabla Proveedor al combo -------------------------//

            loadSupplier: function () {
                const { listaTabla2, listaProveedores } = this.getView().getModel("formularioSimple").getData();
                listaTabla2.forEach((element) => {
                    let obj = {};
                    obj.id = element.id.toString();
                    obj.name = element.nombre;
                    listaProveedores.push(obj);
                });

                this.getView().getModel("formularioSimple").setProperty("/listaProveedores", listaProveedores);
            },
            loadSupplierPost: function () {
                const { listaTabla2 } = this.getView().getModel("formularioSimple").getData();
                var listaProveedores = []
                listaProveedores.push( {
                    "id": "0",
                    "name": "--Seleccione--"
                })
                listaTabla2.forEach((element) => {
                    let obj = {};
                    obj.id = element.id.toString();
                    obj.name = element.nombre;
                    listaProveedores.push(obj);
                });

                this.getView().getModel("formularioSimple").setProperty("/listaProveedores", listaProveedores);
            },

            // ----------------------------Agregar datos de la tabla Unidad Medida al combo -------------------------//

            loadMeasurement: function () {
                const { listaTabla4, unidadMedida } = this.getView().getModel("formularioSimple").getData();
                listaTabla4.forEach((element) => {
                    let obj = {};
                    obj.id = element.id.toString();
                    obj.name = element.abreviatura;
                    unidadMedida.push(obj);
                });

                this.getView().getModel("formularioSimple").setProperty("/unidadMedida", unidadMedida);
            },
            loadMeasurementPost: function () {
                const { listaTabla4 } = this.getView().getModel("formularioSimple").getData();
                var unidadMedida = []
                unidadMedida.push( {
                    "id": "0",
                    "name": "--Seleccione--"
                })
                listaTabla4.forEach((element) => {
                    let obj = {};
                    obj.id = element.id.toString();
                    obj.name = element.abreviatura;
                    unidadMedida.push(obj);
                });

                this.getView().getModel("formularioSimple").setProperty("/unidadMedida", unidadMedida);
            },

            onAfterRendering: function () {
                this.loadSupplier();
                this.loadMeasurement();
            },


        });
    }
);
