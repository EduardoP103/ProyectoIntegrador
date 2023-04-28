sap.ui.define(
    ["sap/ui/core/mvc/Controller",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
    "sap/m/MessageBox",
    "sap/m/ColumnListItem",
    "sap/f/library"],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Export, ExportTypeCSV, Spreadsheet, exportLibrary,MessageBox, ColumnListItem, library) {
        "use strict";
        const EdmType = exportLibrary.EdmType;
        const DynamicPageTitleArea = library.DynamicPageTitleArea;


        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},

            getPage: function () {
                return this.byId("dynamicPageId");
                },
                toggleAreaPriority: function () {
                const oTitle = this.getPage().getTitle(),
                sNewPrimaryArea = oTitle.getPrimaryArea() === DynamicPageTitleArea.Begin ? DynamicPageTitleArea.Middle : DynamicPageTitleArea.Begin;
                oTitle.setPrimaryArea(sNewPrimaryArea);
                },

            //abrir imagen
            openImage: function(oEvent) {
                const oButton = oEvent.getSource(),
                oView = this.getView();
                
                const oProduct = oButton.getParent().getBindingContext("formularioSimple");
            
                const oSelectObj = oProduct.getObject();
                this.getView().getModel("formularioSimple").setProperty("/selectedRowView", oSelectObj);
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

            //cerrar imagen
            closeImage: function () {
                this.pPopover.close();
            },



            //exportar csv
            onExportCSV: function(oEvent) {
            
                const selectedTab = this.getView().getModel("formularioSimple").getProperty("/selectedIconTabBar");

                //exportar productos
                if(selectedTab === "0") {
                    var oExport = new Export({
    
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                   
                        rows : {
                            path : "/listaProductos"
                        },
        
                        //columnas
                        columns : [{
                            name : "Nombre",
                            template : {
                                content : "{nombre}"
                            }
                        }, {
                            name : "Descripción",
                            template : {
                                content : "{descripcion}"
                            }
                        }, {
                            name : "Imagen",
                            template : {
                                content : "{imagen}"
                            }
                        }, {
                            name : "Precio V.",
                            template : {
                                content : "{preciov}"
                            }
                        }, {
                            name : "Precio C.",
                            template : {
                                content : "{precioc}"
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
                        //
                    });

                    oExport.saveFile().catch(function(oError) {
                        MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                    }).then(function() {
                        oExport.destroy();
                    });

                }

                //exportar proveedores
                else if(selectedTab === "1") {
                    var oExport = new Export({
    
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaProveedores"
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
                        }, {
                            name : "Estado",
                            template : {
                                content : "{estado}"
                            }
                        }]
                        //
                    });

                    oExport.saveFile().catch(function(oError) {
                        MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                    }).then(function() {
                        oExport.destroy();
                    });
                }

                //exportar unidades medida
                else {
                    var oExport = new Export({
    
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaMedidas"
                        },
        
                        // column definitions with column name and binding info for the content
        
                        columns : [{
                            name : "Nombre",
                            template : {
                                content : "{nombre}"
                            }
                        }, {
                            name : "Descripción",
                            template : {
                                content : "{descripcion}"
                            }
                        }, {
                            name : "Abreviatura",
                            template : {
                                content : "{abreviatura}"
                            }
                        }, {
                            name : "Estado",
                            template : {
                                content : "{estado}"
                            }
                        }]
                        //
                    });

                    oExport.saveFile().catch(function(oError) {
                        MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                    }).then(function() {
                        oExport.destroy();
                    });
                }
            
            
            },

            //creando config tabla producto
            createColumnConfigTableProducts: function() {
                 var aCols = [];
    
                 aCols.push({
                     label: 'Nombre',
                     property: ['nombre'],
                     type: EdmType.String,
                     template: '{0}'
                 });

                 aCols.push({
                     label: 'Descripción',
                     property: ['descripcion'],
                     type: EdmType.String,
                     template: '{0}'
                 });

                
                 //dimension
                 aCols.push({
                     label: 'Imagen',
                     property: ['imagen'],
                     type: EdmType.String,
                     template: '{0}'
                 });
                
                 //weight
                 aCols.push({
                     label: 'Precio V.',
                     property: ['preciov'],
                     type: EdmType.String,
                     template: '{0}'
                 });

                 //price
                 aCols.push({
                     label: 'Precio C.',
                     property: ['precioc'],
                     type: EdmType.Decimal,
                     template: '{0}'
                 });

                 aCols.push({
                     label: 'Unidad M.',
                     property: ['unidadm'],
                     type: EdmType.Decimal,
                     template: '{0}'
                 });

                 aCols.push({
                     label: 'Proveedor',
                     property: ['proveedor'],
                     type: EdmType.Decimal,
                     template: '{0}'
                 });

                 aCols.push({
                     label: 'Activo',
                     property: ['activo'],
                     type: EdmType.Decimal,
                     template: '{0}'
                 });

                 return aCols;
             },

             //tabla proveedores
           createColumnConfigTableProviders: function () {
                var aCols = [];


                aCols.push({
                    label: 'Nombre',
                    property: ['nombre'],
                    type: EdmType.String,
                    template: '{0}'
                });

                aCols.push({
                    label: 'Telefono',
                    property: ['telefono'],
                    type: EdmType.String,
                    template: '{0}'
                });

                aCols.push({
                    label: 'Dirección',
                    property: ['direccion'],
                    type: EdmType.String,
                    template: '{0}'
                });
               
                aCols.push({
                    label: 'Estado',
                    property: ['estado'],
                    type: EdmType.String,
                    template: '{0}'
                });

               return aCols;
             },

             //tabla unidades de medida
            createColumnConfigTableUnitOfMeasurement: function () {
                var aCols = [];

                aCols.push({
                    label: 'Nombre',
                    property: ['nombre'],
                    type: EdmType.String,
                    template: '{0}'
                });

                aCols.push({
                    label: 'descripcion',
                    property: ['descripcion'],
                    type: EdmType.String,
                    template: '{0}'
                });

                aCols.push({
                    label: 'abreviatura',
                    property: ['abreviatura'],
                    type: EdmType.String,
                    template: '{0}'
                });
               
                aCols.push({
                    label: 'Estado',
                    property: ['estado'],
                    type: EdmType.String,
                    template: '{0}'
                });
                 return aCols;
             },

             //excel
            onExportExcel : function () {
                
                var aCols, oRowBinding, oSettings, oSheet, oTable;
                var selectedTab2 = this.getView().getModel("formularioSimple").getProperty("/selectedIconTabBar");

                if(selectedTab2 === "0"){
                    oTable = this.getView().byId("idProductsTable");
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfigTableProducts();

                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'ProductosKarla.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
                    /*
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
                */
                }else  if (selectedTab2 === "1") {
                    oTable = this.getView().byId("idProveedores");
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfigTableProviders();

                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'ProveedoresKarla.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
                /*
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
                */
                } else if (selectedTab2 === "2"){
                    oTable = this.getView().byId("idUnidades");
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfigTableUnitOfMeasurement();

                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'UnidadesMedidaKarla.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };

                
                }
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            },


            //registar
            registarProducto: function () {
                if (!this.oMPDialog) {
                    this.oMPDialog = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AgregarProducto"
                    });
                }
                this.oMPDialog.then(function (oDialog) {
                    this.oDialogAddProducto = oDialog;
                    this.oDialogAddProducto.open();
                }.bind(this));
            },


            closeDialog: function () {
                this.oDialogAddProducto.close();
                this.onLimpiarDialogo();
            },

            agregarProducto: function() {
                let n = this.getView().getModel("formularioSimple").getProperty("/agregarProducto").nombre;
                let d = this.getView().getModel("formularioSimple").getProperty("/agregarProducto").descripcion;
                let urlImage = this.getView().getModel("formularioSimple").getProperty("/agregarProducto").urlImage;
                let pv = this.getView().getModel("formularioSimple").getProperty("/agregarProducto").preciov;
                let pc = this.getView().getModel("formularioSimple").getProperty("/agregarProducto").precioc;
                let selectUnidadMedida = this.getView().getModel("formularioSimple").getProperty("/selectKeyUnidad")
                let selectProveedor = this.getView().getModel("formularioSimple").getProperty("/selectKeyProveedor")
                let selectActivo = this.getView().getModel("formularioSimple").getProperty("/selectKeyActivo")

                //almacenar datos
                const oProducto = {
                    id: this.getView().getModel("formularioSimple").getProperty("/listaProductos").length,
                    nombre: n,
                    descripcion: d,
                    imagen:urlImage,
                    preciov: pv,
                    precioc: pc,
                    unidadm:  this.getView().byId("idUnidad").getSelectedItem().getProperty("text") ,
                    proveedor:  this.getView().byId("proveedor").getSelectedItem().getProperty("text"),
                    activo: this.getView().byId("activo").getSelectedItem().getProperty("text"),
                };

                    if ( n.trim().length == 0 ||
                    d.trim().length == 0 ||
                    pv <= 0 ||
                    pc <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyActivo") == "0"||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyProveedor") == "0"||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyUnidad") == "0"

                    ){
                    MessageBox.warning("Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0");
                    return;
                    }
                    
                    const listaProductos = this.getView().getModel("formularioSimple").getProperty("/listaProductos");
                    listaProductos.push(oProducto);
                    this.getView().getModel("formularioSimple").refresh();
                    MessageBox.success("Datos ingresados correctamente");
                    this.closeDialog();

            },

            onLimpiarDialogo: function() {
                this.getView().getModel("formularioSimple").setProperty("/agregarProducto", {
                        nombre: "",
                        descripcion: "",
                        urlImage: "",
                        preciov: "",
                        previoc: "",
                        unidadm: "",
                        proveedor: "",
                        activo: ""
                });

                this.getView().getModel("formularioSimple").setProperty("/selectKeyUnidad" ,"0");
                this.getView().getModel("formularioSimple").setProperty("/selectKeyProveedor" ,"0");
                this.getView().getModel("formularioSimple").setProperty("/selectKeyActivo" ,"0");

            },


            //editar
            editarProducto: function (oEvent) {
                const oButton = oEvent.getSource(),
                oView = this.getView();
                
                const oProduct = oButton.getParent().getBindingContext("formularioSimple");
            
                const oSelectObj = oProduct.getObject();
                //

                const obj ={
                        id: oSelectObj.id,
                        nombre: oSelectObj.nombre,
                        descripcion: oSelectObj.descripcion,
                        urlImage: oSelectObj.imagen,
                        preciov: oSelectObj.preciov,
                        precioc: oSelectObj.precioc,
                        unidadm: oSelectObj.unidadm,
                        proveedor: oSelectObj.proveedor,
                        activo: oSelectObj.activo
                };

                

                this.getView().getModel("formularioSimple").setProperty("/selectKeyUnidad", oSelectObj.idunidad)
                this.getView().getModel("formularioSimple").setProperty("/selectKeyProveedor", oSelectObj.idproveedor)
                this.getView().getModel("formularioSimple").setProperty("/selectKeyActivo", oSelectObj.idactivo)

                this.getView().getModel("formularioSimple").setProperty("/editarProducto", obj);



                if (!this.oMPDialog2) {
                    this.oMPDialog2 = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditProducto"
                    });
                }
                this.oMPDialog2.then(function (oDialog) {
                    this.oDialogEditProd = oDialog;
                    this.oDialogEditProd.open();
                }.bind(this));
            },
            closeDialog2: function () {
                this.oDialogEditProd.close();
                this.onLimpiarDialogo();
                
            },

            guardarEditarProducto : function() {
                const id = this.getView().getModel("formularioSimple").getProperty("/editarProducto").id;
                const nomProd = this.getView().getModel("formularioSimple").getProperty("/editarProducto").nombre;
                const desProd = this.getView().getModel("formularioSimple").getProperty("/editarProducto").descripcion;
                const urlImage = this.getView().getModel("formularioSimple").getProperty("/editarProducto").urlImage;
                const pvProd = this.getView().getModel("formularioSimple").getProperty("/editarProducto").preciov;
                const pcProd = this.getView().getModel("formularioSimple").getProperty("/editarProducto").precioc;

                const selectKeyUnidad = this.getView().getModel("formularioSimple").getProperty("/selectKeyUnidad");
                const selectKeyProveedor = this.getView().getModel("formularioSimple").getProperty("/selectKeyProveedor");
                const selectKeyActivo = this.getView().getModel("formularioSimple").getProperty("/selectKeyActivo");

                const oProducto1 = {
                    id: id,
                    nombre: nomProd,
                    descripcion: desProd,
                    imagen: urlImage,
                    preciov: pvProd,
                    precioc: pcProd,
                    idunidad: selectKeyUnidad,
                    idproveedor: selectKeyProveedor,
                    idactivo: selectKeyActivo,
                    unidadm:  this.getView().byId("idUnidad2").getSelectedItem().getProperty("text") ,
                    proveedor:  this.getView().byId("proveedor2").getSelectedItem().getProperty("text"),
                    activo: this.getView().byId("activo2").getSelectedItem().getProperty("text"),

                };

                if(
                    nomProd.trim().length == 0 ||
                    desProd.trim().length == 0 ||
                    pvProd <= 0 ||
                    pcProd <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyUnidad") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyProveedor") == "0" ||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyActivo") == "0" 
                ){
                    MessageBox.warning("Todos los campos menos la imagen son obligatorios");
                    return;
                }
                const listaProductos = this.getView().getModel("formularioSimple").getProperty("/listaProductos");

                const listaFinal = [];

                for (let index = 0; index < listaProductos.length; index++) {
                    const element = listaProductos[index];
                    if(element.id == oProducto1.id){
                        listaFinal.push(oProducto1);
                    }else{
                        listaFinal.push(element);
                    }
                    
                }
                this.getView().getModel("formularioSimple").setProperty("/listaProductos", listaFinal);
                this.getView().getModel("formularioSimple").refresh(true);
                MessageBox.success("Datos editados");
                this.closeDialog2();
            }


        });
    }
);
