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
                debugger;
                var oProduct = oButton.getParent().getBindingContext("formularioSimple");
                debugger;
                var oSelectObj = oProduct.getObject();
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
            createColumnConfig4: function () {
                var aCols4 = [];

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
                var selectedTab = this.getView().getModel("formularioSimple").getProperty("/tabSelect");

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
                        MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
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
                //this.getView().getModel("formularioSimple").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
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
                //this.getView().getModel("formularioSimple").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
                this.oDialogProductoe.close();
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
                //this.getView().getModel("formularioSimple").setProperty("/search", "");
                //this.onLimpiarCamposDialogo();
                this.oDialogProveedor.close();
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
            },

            // ----------------------------Agregar registros a las tabla Producto -------------------------//

            onAddProductoTabla: function () {
                let n = this.getView().getModel("formularioSimple").getProperty("/addProducto").nombre;
                let d = this.getView().getModel("formularioSimple").getProperty("/addProducto").descripcion;
                let urlImage = this.getView().getModel("formularioSimple").getProperty("/addProducto").urlImage;
                let pv = this.getView().getModel("formularioSimple").getProperty("/addProducto").preciov;
                let pc = this.getView().getModel("formularioSimple").getProperty("/addProducto").precioc;
                let s = this.getView().getModel("formularioSimple").getProperty("/addProducto").stock;
                let um = this.getView().getModel("formularioSimple").getProperty("/addProducto").unidadm;
                let pro = this.getView().getModel("formularioSimple").getProperty("/addProducto").proveedor;
                let ac = this.getView().getModel("formularioSimple").getProperty("/addProducto").activo;

                let selectUnidadMedida = this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida");
                let selectProveedor = this.getView().getModel("formularioSimple").getProperty("/selectProveedor");
                let selectActivo = this.getView().getModel("formularioSimple").getProperty("/selectActivo");

                let oProducto = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaTabla1").length + 1,
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
                    idActivo: selectActivo,
                };
                let oRespuesta = {
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
                let listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");
                listaTabla1.push(oProducto);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogProducto();
            },

            onEditProductoTabla: function () {
                let id = this.getView().getModel("formularioSimple").getProperty("/editProducto").id;
                let nomProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").nombre;
                let descProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").descripcion;
                let urlImage = this.getView().getModel("formularioSimple").getProperty("/editProducto").urlImage;
                let pvProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").preciov;
                let pcProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").precioc;
                let sProd = this.getView().getModel("formularioSimple").getProperty("/editProducto").stock;
                let um = this.getView().getModel("formularioSimple").getProperty("/editProducto").unidadm;
                let pro = this.getView().getModel("formularioSimple").getProperty("/editProducto").proveedor;
                let ac = this.getView().getModel("formularioSimple").getProperty("/editProducto").activo;

                let selectUnidadMedida = this.getView().getModel("formularioSimple").getProperty("/selectUnidadMedida");
                let selectProveedor = this.getView().getModel("formularioSimple").getProperty("/selectProveedor");
                let selectActivo = this.getView().getModel("formularioSimple").getProperty("/selectActivo");

                var aEncontradoUnidad = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/unidadMedida")
                    .filter(function (item, index) {
                        return item.id == selectUnidadMedida;
                    });

                var aEncontradoProveedor = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/listaProveedores")
                    .filter(function (item, index) {
                        return item.id == selectProveedor;
                    });

                var aEncontradoActivo = this.getView()
                    .getModel("formularioSimple")
                    .getProperty("/activo")
                    .filter(function (item, index) {
                        return item.id == selectActivo;
                    });

                let oProducto1 = {
                    id: id,
                    nombre: nomProd,
                    descripcion: descProd,
                    imagen: urlImage,
                    preciov: pvProd,
                    precioc: pcProd,
                    stock: sProd,
                    unidadm: aEncontradoUnidad[0].name, // "und" ,
                    proveedor: aEncontradoProveedor[0].name, //"pro",
                    activo: aEncontradoActivo[0].name, //"act"
                    idUnidaddm: selectUnidadMedida,
                    idProveedor: selectProveedor,
                    idActivo: selectActivo,
                };
                let oRespuesta2 = {
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
                    return oRespuesta;
                }
                let listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaTabla1");
                //listaTabla1.push(oProducto);
                let listaFinal = [];
                for (let index = 0; index < listaTabla1.length; index++) {
                    const element = listaTabla1[index];
                    if (element.id == oProducto1.id) {
                        listaFinal.push(oProducto1);
                    } else {
                        listaFinal.push(element);
                    }
                }
                this.getView().getModel("formularioSimple").setProperty("/listaTabla1", listaFinal);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Datos editados correctamente");
                this.closeDialogProductoe();
            },

            // ----------------------------Editar registros de Producto -------------------------//

            onEditProducto: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                debugger;

                var oProduct2 = oButton.getParent().getBindingContext("formularioSimple");

                debugger;

                var oSelectObj = oProduct2.getObject();
                debugger;

                var obj = {
                    id: oSelectObj.id,
                    nombre: oSelectObj.nombre,
                    descripcion: oSelectObj.descripcion,
                    preciov: oSelectObj.preciov,
                    urlImage: oSelectObj.imagen,
                    precioc: oSelectObj.precioc,
                    stock: oSelectObj.stock,
                    //"idUnidaddm": oSelectObj.idUnidaddm,
                    unidadm: oSelectObj.unidadm,
                    //"idProveedor": oSelectObj.idProveedor,
                    proveedor: oSelectObj.proveedor,
                    //"idActivo": oSelectObj.idActivo,
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
                let nom = this.getView().getModel("formularioSimple").getProperty("/addProveedor").nombre;
                let tel = this.getView().getModel("formularioSimple").getProperty("/addProveedor").telefono;
                let dir = this.getView().getModel("formularioSimple").getProperty("/addProveedor").direccion;
                let est = this.getView().getModel("formularioSimple").getProperty("/addProveedor").estado;

                let oProveedor = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaTabla2").length + 1,
                    nombre: nom,
                    telefono: tel,
                    direccion: dir,
                    estado: this.getView().byId("idActivo2").getSelectedItem().getProperty("text"),
                };

                let oRespuesta2 = {
                    valid: true,
                    mensaje: "",
                };
                if (nom.trim().length == 0 || dir.trim().length == 0 || tel <= 0 || this.getView().getModel("formularioSimple").getProperty("/selectActivo") == "0") {
                    oRespuesta2.valid = false;
                    oRespuesta2.mensaje = "llena los campos";
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return oRespuesta2;
                }
                let listaTabla2 = this.getView().getModel("formularioSimple").getProperty("/listaTabla2");
                listaTabla2.push(oProveedor);
                this.getView().getModel("formularioSimple").refresh();
                MessageBox.success("Datos ingresados correctamente");
                this.closeDialogProveedor();
            },

            // ----------------------------Botón eliminar registro -------------------------//

            // ----------------------------Metodo DialogConfiguradorColumnas -------------------------//
            onOpenDialogConfiguradorColumnas: function () {
                if (!this.oMPConfigColumnas) {
                    this.oMPConfigColumnas = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.ConfiguradorColumnas",
                    });
                }
                this.oMPConfigColumnas.then(
                    function (oDialog) {
                        this.oDialogConfigColumn = oDialog;
                        this.oDialogConfigColumn.open();
                    }.bind(this)
                );
            },
            onConfirmarEliminacion: function () {
                MessageBox.confirm("¿Seguro que deseas eliminar el registro?");
            },

            moveToAvailableProductsTable: function () {
                var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
                Utils.getSelectedItemContext(oSelectedProductsTable, function (oSelectedItemContext, iSelectedItemIndex) {
                    // reset the rank property and update the model to refresh the bindings
                    var oProductsModel = oSelectedProductsTable.getModel();
                    oProductsModel.setProperty("Rank", Utils.ranking.Initial, oSelectedItemContext);

                    // select the previously selected position
                    var aItemsOfSelectedProductsTable = oSelectedProductsTable.getItems();
                    var oPrevItem = aItemsOfSelectedProductsTable[Math.min(iSelectedItemIndex, aItemsOfSelectedProductsTable.length - 1)];
                    if (oPrevItem) {
                        oPrevItem.setSelected(true);
                    }
                });
            },

            onDropSelectedProductsTable: function (oEvent) {
                var oDraggedItem = oEvent.getParameter("draggedControl");
                var oDraggedItemContext = oDraggedItem.getBindingContext();
                if (!oDraggedItemContext) {
                    return;
                }

                var oRanking = Utils.ranking;
                var iNewRank = oRanking.Default;
                var oDroppedItem = oEvent.getParameter("droppedControl");

                if (oDroppedItem instanceof ColumnListItem) {
                    // get the dropped row data
                    var sDropPosition = oEvent.getParameter("dropPosition");
                    var oDroppedItemContext = oDroppedItem.getBindingContext();
                    var iDroppedItemRank = oDroppedItemContext.getProperty("Rank");
                    var oDroppedTable = oDroppedItem.getParent();
                    var iDroppedItemIndex = oDroppedTable.indexOfItem(oDroppedItem);

                    // find the new index of the dragged row depending on the drop position
                    var iNewItemIndex = iDroppedItemIndex + (sDropPosition === "After" ? 1 : -1);
                    var oNewItem = oDroppedTable.getItems()[iNewItemIndex];
                    if (!oNewItem) {
                        // dropped before the first row or after the last row
                        iNewRank = oRanking[sDropPosition](iDroppedItemRank);
                    } else {
                        // dropped between first and the last row
                        var oNewItemContext = oNewItem.getBindingContext();
                        iNewRank = oRanking.Between(iDroppedItemRank, oNewItemContext.getProperty("Rank"));
                    }
                }

                // set the rank property and update the model to refresh the bindings
                var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
                var oProductsModel = oSelectedProductsTable.getModel();
                oProductsModel.setProperty("Rank", iNewRank, oDraggedItemContext);
            },

            moveSelectedItem: function (sDirection) {
                var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
                Utils.getSelectedItemContext(oSelectedProductsTable, function (oSelectedItemContext, iSelectedItemIndex) {
                    var iSiblingItemIndex = iSelectedItemIndex + (sDirection === "Up" ? -1 : 1);
                    var oSiblingItem = oSelectedProductsTable.getItems()[iSiblingItemIndex];
                    var oSiblingItemContext = oSiblingItem.getBindingContext();
                    if (!oSiblingItemContext) {
                        return;
                    }

                    // swap the selected and the siblings rank
                    var oProductsModel = oSelectedProductsTable.getModel();
                    var iSiblingItemRank = oSiblingItemContext.getProperty("Rank");
                    var iSelectedItemRank = oSelectedItemContext.getProperty("Rank");

                    oProductsModel.setProperty("Rank", iSiblingItemRank, oSelectedItemContext);
                    oProductsModel.setProperty("Rank", iSelectedItemRank, oSiblingItemContext);

                    // after move select the sibling
                    oSelectedProductsTable.getItems()[iSiblingItemIndex].setSelected(true).focus();
                });
            },

            moveUp: function (oEvent) {
                this.moveSelectedItem("Up");
                oEvent.getSource().focus();
            },

            moveDown: function (oEvent) {
                this.moveSelectedItem("Down");
                oEvent.getSource().focus();
            },

            onBeforeOpenContextMenu: function (oEvent) {
                oEvent.getParameters().listItem.setSelected(true);
            },

            onApplyViewColumns: function (oEvent) {
                this.oDialogConfigColumn.close();
            },
            onMoveAllToAvaiable: function (oEvent) {},
            onCloseSettingColumns: function (oEvent) {
                this.oDialogConfigColumn.close();
            },
        });
    }
);
