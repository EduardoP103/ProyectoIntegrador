sap.ui.define(
    ["sap/ui/core/mvc/Controller",
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
    "sap/ui/vbm/Containers",
    "sap/ui/model/FilterOperator",

],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
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
        ) {
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

            //export pdf
            onExportPDF: function () {
                debugger;
                   const selectedTab = this.getView().getModel("formularioSimple").getProperty("/selectedIconTabBar");
                   let oTable, aCols, fileName, title;
                   switch (selectedTab) {
                       case "0":
                           oTable = this.getView().byId("idProductsTable");
                           aCols = this.createColumnConfigTableProducts();
                           fileName = "ListaProductos.pdf";
                           title = "Productos";
                           
                           break;
                       case "1":
                           oTable = this.getView().byId("idProveedores");
                           aCols = this.createColumnConfigTableProviders();
                           fileName = "ListaProveedores.pdf";
                           title = "Proveedores";
                           break;
                       case "2":
                           oTable = this.getView().byId("idUnidades");
                           aCols = this.createColumnConfigTableUnitOfMeasurement();
                           fileName = "ListaUnidadMedida.pdf";
                           title = "Unidades de Medida";
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
                   try {
                       let test1 = jQuery.sap.require(
                           "com/pe/proyectoIntegrador/lib/jsPDF/jspdf"
                       );
                       let test = jQuery.sap.require(
                           "com/pe/proyectoIntegrador/lib/jsPDF/autotable"
                       )
                   } catch (e) { }
                   const doc = new jsPDF();
                   doc.text(title, 14, 10);
                   const tableData = oRowBinding.getCurrentContexts().map(function (oContext) {
                       return aCols.map(function (column) {
                           const property = column.property[0];
                           return oContext.getProperty(property);
                       });
                   });
                   doc.autoTable({
                       head: [aCols.map(function (column) {
                           return column.label;
                       })],
                       body: tableData,
                       margin: { top: 20, left: 10, right: 10, bottom: 10 },
                       startY: 20
                   });
                   doc.save(fileName);
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

                let id
                if(this.getView().getModel("formularioSimple").getProperty("/listaProductos").length==0){
                    id= 1
                }else{
                    let listaTabla1OrdenadoDesc = this.getView().getModel("formularioSimple").getProperty("/listaProductos").sort(function(a, b){

                        return b.id - a.id;
                            
                        });
                        id =  listaTabla1OrdenadoDesc[0].id + 1
                }

                //almacenar datos
                const oProducto = {
                    id:id,
                    nombre: n,
                    descripcion: d,
                    imagen:urlImage,
                    preciov: pv,
                    precioc: pc,
                    unidadm:  this.getView().byId("idUnidad").getSelectedItem().getProperty("text") ,
                    proveedor:  this.getView().byId("proveedor").getSelectedItem().getProperty("text"),
                    activo: this.getView().byId("activo").getSelectedItem().getProperty("text"),
                    idunidad: selectUnidadMedida,
                    idproveedor: selectProveedor,
                    idactivo: selectActivo

                };

                    if ( n.trim().length == 0 ||
                    d.trim().length == 0 ||
                    pv <= 0 ||
                    pc <= 0 ||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyActivo") == "0"||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyProveedor") == "0"||
                    this.getView().getModel("formularioSimple").getProperty("/selectKeyUnidad") == "0"

                    ){
                    MessageBox.warning("Todos los campos son obligatorios ");
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
            },


            //busqueda onSearch
            onSearch : function(oEvent) {
                var newValue = oEvent.getSource().getValue();
                
                this.filtering(newValue);
            },
            filtering : function(value) {
                var oFilter1 = new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, value);
                var oFilter2 = new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, value);
                var oFilter3 = new sap.ui.model.Filter("imagen", sap.ui.model.FilterOperator.Contains, value);
                var oFilter4 = new sap.ui.model.Filter("preciov", sap.ui.model.FilterOperator.Contains, value);
                var oFilter5 = new sap.ui.model.Filter("precioc", sap.ui.model.FilterOperator.Contains, value);
                var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4,oFilter5], false); 
            
                var oBinding = this.getView().byId("idProductsTable").getBinding("items");
                oBinding.filter(allFilter);
            },

            onSuggest: function (event) {
                
                var sValue = event.getParameter("suggestValue"),
                    aFilters = [];
                    var oView = this.getView();
                    oView.setModel(this.oModel);
                    this.oSF = oView.byId("searchField");
                if (sValue) {
                    
                    var oFilter1 = new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, sValue);
                    var oFilter2 = new sap.ui.model.Filter("descripcion", sap.ui.model.FilterOperator.Contains, sValue);
                    aFilters = new sap.ui.model.Filter([oFilter1, oFilter2], false); 
                }else{
                    var oBindingTable = this.getView().byId("idProductsTable").getBinding("items");
                    oBindingTable.filter([]);
                }
                
                this.oSF.getBinding("suggestionItems").filter(aFilters);
                this.oSF.suggest();
            },

            //-----------------------eliminar Producto------------------------//
            eliminarProducto: function (oEvent) {

                
            
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
                 let listaTabla1 = this.getView().getModel("formularioSimple").getProperty("/listaProductos");
 
                 let listaFinal = [];
                 
                 for (let index = 0; index < listaTabla1.length; index++){
                     const element = listaTabla1[index];
                     if (element.id != selectedRowEliminar.id){
                         listaFinal.push(element);
                     }
                 }
                 this.getView().getModel("formularioSimple").setProperty("/listaProductos", listaFinal);
                 this.getView().getModel("formularioSimple").refresh();
                 MessageBox.success("Producto Eliminado Correctamente");
                 this.closeDialogEliminarProducto();
             },


             
        
              //validaciones
              filterText: function(data) {
                let newValue = ";" + data;
                let validationCondition = /[^a-zA-Z ]/gi;
                let validationArray = [0];
                let tempValidationArray = newValue.match(validationCondition);
                validationArray.push(...tempValidationArray);
                let validationResult = validationArray.length;
                if(validationResult>2) {
                    newValue = newValue.slice(0, -1);
                }else {

                }
                newValue = newValue.slice(1);
                return newValue;

              },


              onLiveChange: function(oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("valNombre").setValue(newValue);
              },

              //fragment eliminar producto multiple
              onAbrirEliminacionMultiple: function () {
                if (!this.oMPEliminarM) {
                    this.oMPEliminarM = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EliminarProductoMultiple",
                    });
                }
                this.oMPEliminarM.then(
                    function (oDialogElM) {
                        this.oDialogEliminarMasa = oDialogElM;
                        this.oDialogEliminarMasa.open();
                    }.bind(this)
                );
            },
            closeDialogEliminarProductoMultiple: function () {
                
                this.oDialogEliminarMasa.close();
            },

            //eliminar producto multiple
            onEliminarProductoMultiple: function (oEvent) {

                const selectedItems = this.byId("idProductsTable").getSelectedItems();
                const selectedProducts = [];
                
                selectedItems.forEach(function(products){
                    const product = products.getBindingContext("formularioSimple").getObject();
                    selectedProducts.push(product);
                });
                if (this.getView().getModel("formularioSimple").getProperty("/listaProductos").length === 0){
                    MessageBox.warning("No hay datos para eliminar");
                    this.closeDialogEliminarProductoMultiple();
                    return;
                }
                if (selectedProducts.length === 0){
                    MessageBox.warning("Por favor, elija un producto para eliminar");
                    this.closeDialogEliminarProductoMultiple();
                    return;
                }
                const updateList = this.getView().getModel("formularioSimple").getProperty("/listaProductos");
                const product = updateList.filter(Items => !selectedProducts.includes(Items));
                this.getView().getModel("formularioSimple").setProperty("/listaProductos", product);
                this.getView().getModel("formularioSimple").updateBindings();


                this.getView().byId("idProductsTable").removeSelections();

                MessageBox.success("Datos eliminados correctamente");

                this.closeDialogEliminarProductoMultiple();

            },


        });
    }
);
