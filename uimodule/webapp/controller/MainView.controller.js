sap.ui.define(
    ["./BaseController",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Export, ExportTypeCSV, Spreadsheet, exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;

        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},

            openImage: function(oEvent) {
                var oButton = oEvent.getSource(),
                oView = this.getView();
                
                var oProduct = oButton.getParent().getBindingContext("formularioSimple");
            
                var oSelectObj = oProduct.getObject();
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
            closeImage: function () {
                this.pPopover.close();
            },



            onExportCSV: function(oEvent) {
            
                var selectedTab = this.getView().getModel("formularioSimple").getProperty("/selectedIconTabBar");

                if(selectedTab === "0") {
                    var oExport = new Export({
    
                        // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                        exportType : new ExportTypeCSV({
                            separatorChar : ";"
                        }),
        
                        // Pass in the model created above
                        models : this.getView().getModel("formularioSimple"),
        
                        // binding information for the rows aggregation
                        rows : {
                            path : "/listaProductos"
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
                                content : "{descripción}"
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

                if(selectedTab === "1") {
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
                                content : "{dirección}"
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
                                content : "{descripción}"
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
                     property: ['descripción'],
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

               
                //dimension
                aCols.push({
                    label: 'Dirección',
                    property: ['dirección'],
                    type: EdmType.String,
                    template: '{0}'
                });
               
                //weight
                aCols.push({
                    label: 'Estado',
                    property: ['estado'],
                    type: EdmType.String,
                    template: '{0}'
                });

               return aCols;
             },
            createColumnConfigTableUnitOfMeasurement: function () {
                var aCols = [];

                aCols.push({
                    label: 'Nombre',
                    property: ['nombre'],
                    type: EdmType.String,
                    template: '{0}'
                });

                aCols.push({
                    label: 'descripción',
                    property: ['descripción'],
                    type: EdmType.String,
                    template: '{0}'
                });

               
                //dimension
                aCols.push({
                    label: 'abreviatura',
                    property: ['abreviatura'],
                    type: EdmType.String,
                    template: '{0}'
                });
               
                //weight
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

            

               
    
                // download exported file


        });
    }
);
