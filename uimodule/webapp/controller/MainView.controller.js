sap.ui.define(
    [
        "./BaseController",
        "../util/util",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/Fragment",
        "sap/f/library",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV",
        "sap/m/MessageBox",
        "sap/ui/export/library",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, util, JSONModel, Fragment, library, Export, ExportTypeCSV, MessageBox, exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("com.pe.proyectoIntegrador.controller.MainView", {
            onInit: function () {},
            onOpenViewImage: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/selectedRowView", oSelectObj);
                // create popover
                if (!this.pPopover) {
                    this.pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.pe.proyectoIntegrador.view.fragment.Popover",
                        controller: this,
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this.pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },
            onPopoverClose: function (oEvent) {
                this.byId("imgPopover").close();
            },

            onAddButton: function (oEvent) {
                // create popover
                if (!this.oMProducto) {
                    this.oMProducto = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AddProduct",
                    });
                }
                this.oMProducto.then(
                    function (oDialog) {
                        this.oDialogAddProduct = oDialog;
                        this.oDialogAddProduct.open();
                    }.bind(this)
                );
            },
            onAddProductClose: function (oEvent) {
                this.oDialogAddProduct.close();
                this.cleanFieldsAddForm();
            },

            onAddProductSave: function(){
                

                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { productName, productDescription, productPriceV, productPriceC, productStock, imgUrl, idMeasurement ,idStatus ,idProvider }  = this.getView().getModel("formModel").getProperty("/addProduct")
                if(productName.trim().length==0 || idStatus == "0" || productDescription.trim().length==0|| productPriceV.trim().length==0 || productPriceC.trim().length==0 || productStock.trim().length==0 || imgUrl.trim().length==0 || idMeasurement == "0" || idStatus == "0" ){
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }
                
               let productList = this.getView().getModel("formModel").getProperty("/productList");
               let addProduct = this.getView().getModel("formModel").getProperty("/addProduct");
               let id;
               if(productList.length>0){
                    let ordenadoDesc =  productList.sort(function(a, b){
                        return b.idProduct - a.idProduct;
                         });
        
                        //  let ordenadoAsc =  productList.sort(function(a, b){
                        //     return a.idProduct - b.idProduct;
                        //      });
                             id =    ordenadoDesc[0].idProduct + 1;
                             
                            
                }else{
                    id = 1;
                }
               
                this.getView().getModel("formModel").setProperty("/addProduct/idMeasurement",parseInt(idMeasurement));
                this.getView().getModel("formModel").setProperty("/addProduct/idStatus",parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/addProduct/idProvider",parseInt(idProvider));
                this.getView().getModel("formModel").setProperty("/addProduct/idProduct",id);

                productList.push(this.getView().getModel("formModel").getProperty("/addProduct"))
                this.getView().getModel("formModel").setProperty("/productList",productList)

                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true)

                this.onAddProductClose();
            },

            onChangeMeasurementAdd: function(oEvent){
                
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productUnitM",text)
            },
            onChangeProviderAdd: function(oEvent){
               
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productProvider",text)
            },
            onChangeStatusAdd: function(oEvent){
                
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productActive",text)
            },


            cleanFieldsAddForm: function () {
                this.getView().getModel("formModel").setProperty("/addProduct", {
                        "productName" : "",
                        "productDescription" : "",
                        "productImage" : "",
                        "productPriceV" : "",
                        "productPriceC" : "",
                        "productStock" : "",
                        "idMeasurement" : "0",
                        "productUnitM" : "",
                        "idProvider" : "0",
                        "productProvider" : "",
                        "idStatus" : "0",
                        "productActive" : "",
                        "imgUrl" : ""
                    });
            },

            onPressPopup: function (oEvent) {
                let message = "Mensaje";
                let icon = "WARNING";
                let title = "Titulo";

                util.utilUI.messageBox(message, icon, title);
            },
            createColumnConfigTableProducts: function () {
                var aCols = [];
                aCols.push({
                    label: "ID",
                    property: ["idProduct"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Name",
                    property: ["productName"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Description",
                    property: ["productDescription"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Price V.",
                    property: ["productPriceV"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Price C.",
                    property: ["productPriceC"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Stock",
                    property: ["productStock"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Unit ID",
                    property: ["idMeasurement"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Unit",
                    property: ["productUnitM"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Provider ID",
                    property: ["idProvider"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Provider",
                    property: ["productProvider"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Status ID",
                    property: ["idStatus"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Status",
                    property: ["productActive"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Image URL",
                    property: ["imgUrl"],
                    type: EdmType.String,
                    template: "{0}",
                });
                
                return aCols;
            },
            createColumnConfigTableSupplier: function () {
                var aCols = [];
                aCols.push({
                    label: "ID",
                    property: ["idProvider"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Name",
                    property: ["providerName"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Phone",
                    property: ["providerPhone"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Address",
                    property: ["providerAddress"],
                    type: EdmType.String,
                    template: "{0}",
                });aCols.push({
                    label: "Status ID",
                    property: ["idStatus"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Status",
                    property: ["providerActive"],
                    type: EdmType.String,
                    template: "{0}",
                });
                return aCols;
            },
            createColumnConfigTableUnitOfMeasurement: function () {
                var aCols = [];
                aCols.push({
                    label: "Unit ID",
                    property: ["idUnit"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Name",
                    property: ["unitName"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Description",
                    property: ["unitDescription"],
                    type: EdmType.String,
                    template: "{0}",
                });
                aCols.push({
                    label: "Abbreviation",
                    property: ["unitAbbreviation"],
                    type: EdmType.String,
                    template: "{0}",
                });
                return aCols;
            },
            onExportSpreadSheetXLSX: function () {
                let aCols;
                let oSettings;
                let oTable;
                let fileName = "";
                let path = "";
                const selectedIconTabBar = this.getView().getModel("formModel").getProperty("/selectedIconTabBar");
                debugger;
                if (selectedIconTabBar === "0") {
                    oTable = this.getView().byId("idProductsTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "ProductoDataExcel.xlsx";
                    aCols = this.createColumnConfigTableProducts();
                } else if (selectedIconTabBar === "1") {
                    oTable = this.getView().byId("idProviderTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "ProveedorDataExcel.xlsx";
                    aCols = this.createColumnConfigTableSupplier();
                } else if (selectedIconTabBar === "2") {
                    oTable = this.getView().byId("idUnitOfMeasurementTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "UnidadMedidaDataExcel.xlsx";
                    aCols = this.createColumnConfigTableUnitOfMeasurement();
                }
                if (this.getView().getModel("formModel").getProperty(path).length > 0) {
                    util.utilController.exportSpreadSheetXLSX(aCols, oTable, fileName);
                } else {
                    util.utilUI.messageBox("No existen registros para descargar", "WARNING", "Alerta");
                }
            },
            onExportSpreadSheetCSV: function () {
                var oExport = new Export({
                    // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                    exportType: new ExportTypeCSV({
                        separatorChar: ";",
                    }),

                    // Pass in the model created above
                    models: this.getView().getModel("formModel"),

                    // binding information for the rows aggregation
                    rows: {
                        path: "/productList",
                    },

                    // column definitions with column name and binding info for the content

                    columns: [
                        {
                            name: "Product",
                            template: {
                                content: "{productName}",
                            },
                        },
                        {
                            name: "Provider",
                            template: {
                                content: "{productProvider}",
                            },
                        },
                        {
                            name: "Description",
                            template: {
                                content: "{productDescription}",
                            },
                        },
                        {
                            name: "Stock",
                            template: {
                                content: "{productStock}",
                            },
                        },
                        {
                            name: "Price",
                            template: {
                                content: "{productPriceC}",
                            },
                        },
                    ],
                });

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

            loadSupplier: function () {
                const { providerList, selectProviderList } = this.getView().getModel("formModel").getData();
                providerList.forEach((element) => {
                    let obj = {};
                    obj.key = element.idProvider.toString();
                    obj.text = element.providerName;
                    selectProviderList.push(obj);
                });

                this.getView().getModel("formModel").setProperty("/selectProviderList", selectProviderList);
            },
            loadMeasurement: function () {
                const { measurementList, selectMeasurementList } = this.getView().getModel("formModel").getData();
                measurementList.forEach((element) => {
                    let obj = {};
                    obj.key = element.idUnit.toString();
                    obj.text = element.unitName;
                    selectMeasurementList.push(obj);
                });

                this.getView().getModel("formModel").setProperty("/selectMeasurementList", selectMeasurementList);
            },

            onAfterRendering: function () {
                this.loadSupplier();
                this.loadMeasurement();
            },
            onPressEditProduct: function (oEvent) {
                
                var oButton = oEvent.getSource(),
                oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/editProduct", {...oSelectObj});
                
                // create popover
                if (!this.oEditProduct) {
                    this.oEditProduct = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditProduct",
                    });
                }
                this.oEditProduct.then(
                    function (oDialog1) {
                        this.oDialogEditProduct = oDialog1;
                        this.oDialogEditProduct.open();
                    }.bind(this)
                );
            },
            onEditProductSave: function(){
                debugger;

                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { productName, productDescription, productPriceV, productPriceC, productStock, imgUrl, idMeasurement ,idStatus ,idProvider }  = this.getView().getModel("formModel").getProperty("/editProduct")
                if(productName.trim().length==0 || idStatus == "0" || productDescription.trim().length==0|| productPriceV.trim().length==0 || productPriceC.trim().length==0 || productStock.trim().length==0 || imgUrl.trim().length==0 || idMeasurement == "0" || idStatus == "0" ){
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }
                this.getView().getModel("formModel").setProperty("/editProduct/idMeasurement",parseInt(idMeasurement));
                this.getView().getModel("formModel").setProperty("/editProduct/idStatus",parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/editProduct/idProvider",parseInt(idProvider));

                
                let productList = this.getView().getModel("formModel").getProperty("/productList");
                let updateList = [];
                let editProduct=this.getView().getModel("formModel").getProperty("/editProduct");
                productList.forEach(element => {
                //1. Validator si en el caso el idde editProducto != element.id ahi debes pushear a la listaF
                
                if (element.idProduct != editProduct.idProduct){
                    updateList.push({...element});
                } else{
                    updateList.push({...editProduct});
                }
                this.getView().getModel("formModel").setProperty("/productList",updateList);
                });
                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true);
                        //const{productList} =this.getView().getModel("formModel").getData()
                this.onEditProductClose();
            },
            onEditProductClose: function (oEvent) {
                this.oDialogEditProduct.close();
                this.cleanFieldsEditForm();
            },
            onChangeMeasurementEdit: function(oEvent){
                
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productUnitM",text)
            },
            onChangeProviderEdit: function(oEvent){
                
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productProvider",text)
            },
            onChangeStatusEdit: function(oEvent){
                
                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productActive",text)
            },
            cleanFieldsEditForm: function () {
                this.getView().getModel("formModel").setProperty("/editProduct", {
                        "productName" : "",
                        "productDescription" : "",
                        "productImage" : "",
                        "productPriceV" : "",
                        "productPriceC" : "",
                        "productStock" : "",
                        "idMeasurement" : "0",
                        "productUnitM" : "",
                        "idProvider" : "0",
                        "productProvider" : "",
                        "idStatus" : "0",
                        "productActive" : "",
                        "imgUrl" : ""
                    });
            },
            onPressDeleteProduct: function(oEvent){
                var oButton = oEvent.getSource(),
                oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/editProduct", {...oSelectObj});
                let productList = this.getView().getModel("formModel").getProperty("/productList");
                let updateList = [];
                let editProduct=this.getView().getModel("formModel").getProperty("/editProduct");
                productList.forEach(element => {
                //1. Validator si en el caso el idde editProducto != element.id ahi debes pushear a la listaF
                
                if (element.idProduct != editProduct.idProduct){
                    updateList.push({...element});
                } 
                this.getView().getModel("formModel").setProperty("/productList",updateList);
                });
                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true);
                        //const{productList} =this.getView().getModel("formModel").getData()
            }
            
        });
    }
);
