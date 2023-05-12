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
            onInit: function () { },
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

            onAddProductButton: function (oEvent) {
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
            onAddProviderButton: function (oEvent) {
                // create popover
                if (!this.oMProvider) {
                    this.oMProvider = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AddProvider",
                    });
                }
                this.oMProvider.then(
                    function (oDialogo) {
                        this.oDialogAddProvider = oDialogo;
                        this.oDialogAddProvider.open();
                    }.bind(this)
                );
            },
            onAddUnitButton: function (oEvent) {
                // create popover
                if (!this.oMUnit) {
                    this.oMUnit = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.AddUnit",
                    });
                }
                this.oMUnit.then(
                    function (oDialoga) {
                        this.oDialogAddUnit = oDialoga;
                        this.oDialogAddUnit.open();
                    }.bind(this)
                );
            },
            onAddProductClose: function (oEvent) {
                this.oDialogAddProduct.close();
                this.cleanFieldsProductForm();
            },
            onAddProviderClose: function (oEvent) {
                this.oDialogAddProvider.close();
                this.cleanFieldsProviderForm();
            },
            onAddUnitClose: function (oEvent) {
                this.oDialogAddUnit.close();
                this.cleanFieldsUnitForm();
            },

            onAddProductSave: function () {


                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { productName, productDescription, productPriceV, productPriceC, productStock, imgUrl, idUnit, idStatus, idProvider } = this.getView().getModel("formModel").getProperty("/addProduct")
                if (productName.trim().length == 0 || idStatus == "0" || productDescription.trim().length == 0 || productPriceV.trim().length == 0 || productPriceC.trim().length == 0 || productStock.trim().length == 0 || imgUrl.trim().length == 0 || idUnit == "0" || idStatus == "0") {
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }

                let productList = this.getView().getModel("formModel").getProperty("/productList");
                let addProduct = this.getView().getModel("formModel").getProperty("/addProduct");
                let id;
                if (productList.length > 0) {
                    let ordenadoDesc = productList.sort(function (a, b) {
                        return b.idProduct - a.idProduct;
                    });

                    //  let ordenadoAsc =  productList.sort(function(a, b){
                    //     return a.idProduct - b.idProduct;
                    //      });
                    id = ordenadoDesc[0].idProduct + 1;


                } else {
                    id = 1;
                }

                this.getView().getModel("formModel").setProperty("/addProduct/idUnit", parseInt(idUnit));
                this.getView().getModel("formModel").setProperty("/addProduct/idStatus", parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/addProduct/idProvider", parseInt(idProvider));
                this.getView().getModel("formModel").setProperty("/addProduct/idProduct", id);

                productList.push(this.getView().getModel("formModel").getProperty("/addProduct"))
                this.getView().getModel("formModel").setProperty("/productList", productList)

                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true)

                this.onAddProductClose();
            },

            //Add Provider -----------------------------------------------------------------------------------------------------------------------------

            onAddProviderSave: function () {


                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { providerName, providerPhone, providerAddress, idStatus } = this.getView().getModel("formModel").getProperty("/addProvider")
                if (providerName.trim().length == 0 || idStatus == "0" || providerPhone.trim().length == 0 || providerAddress.trim().length == 0) {
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }

                let providerList = this.getView().getModel("formModel").getProperty("/providerList");
                let addProvider = this.getView().getModel("formModel").getProperty("/addProvider");
                let id;
                if (providerList.length > 0) {
                    let ordenadoDesc = providerList.sort(function (a, b) {
                        return b.idProvider - a.idProvider;
                    });

                    //  let ordenadoAsc =  productList.sort(function(a, b){
                    //     return a.idProduct - b.idProduct;
                    //      });
                    id = ordenadoDesc[0].idProvider + 1;


                } else {
                    id = 1;
                }

                this.getView().getModel("formModel").setProperty("/addProvider/idStatus", parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/addProvider/idProvider", id);

                providerList.push(this.getView().getModel("formModel").getProperty("/addProvider"))
                this.getView().getModel("formModel").setProperty("/providerList", providerList)

                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true)

                this.updateProvider();
                this.onAddProviderClose();
            },

            updateProvider: function () {
                let providerList = this.getView().getModel("formModel").getProperty("/providerList");
                let selectProviderList = this.getView().getModel("formModel").getProperty("/selectProviderList");
                let updateList = [{
                    "key": "0",
                    "text": "--Seleccione proveedor---"
                }];
                providerList.forEach((element) => {
                    let obj = {};
                    obj.key = element.idProvider.toString();
                    obj.text = element.providerName;
                    updateList.push(obj);
                });
                this.getView().getModel("formModel").setProperty("/selectProviderList", updateList);
                this.getView().getModel("formModel").refresh(true);
                //console.log(updateList);
            },

            //Add Unit------------------------------------------------------------------------------------------------------------------------------------------

            onAddUnitSave: function () {


                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { unitName, unitDescription, unitAbbreviation, idStatus } = this.getView().getModel("formModel").getProperty("/addUnit")
                if (unitName.trim().length == 0 || idStatus == "0" || unitDescription.trim().length == 0 || unitAbbreviation.trim().length == 0) {
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }

                let unitList = this.getView().getModel("formModel").getProperty("/unitList");
                let addUnit = this.getView().getModel("formModel").getProperty("/addUnit");
                let id;
                if (unitList.length > 0) {
                    let ordenadoDesc = unitList.sort(function (a, b) {
                        return b.idUnit - a.idUnit;
                    });

                    //  let ordenadoAsc =  productList.sort(function(a, b){
                    //     return a.idProduct - b.idProduct;
                    //      });
                    id = ordenadoDesc[0].idUnit + 1;


                } else {
                    id = 1;
                }
                id = id.toString();
                this.getView().getModel("formModel").setProperty("/addUnit/idStatus", parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/addUnit/idUnit", id);

                unitList.push(this.getView().getModel("formModel").getProperty("/addUnit"))
                this.getView().getModel("formModel").setProperty("/unitList", unitList)

                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true)

                this.updateUnit();
                this.onAddUnitClose();
            },

            updateUnit: function () {
                let unitList = this.getView().getModel("formModel").getProperty("/unitList");
                let selectUnitList = this.getView().getModel("formModel").getProperty("/selectUnitList");
                let updateList = [{
                    "key": "0",
                    "text": "--Seleccione unidad---"
                }];
                unitList.forEach((element) => {
                    let obj = {};
                    obj.key = element.idUnit.toString();
                    obj.text = element.unitName;
                    updateList.push(obj);
                });
                this.getView().getModel("formModel").setProperty("/selectUnitList", updateList);
                this.getView().getModel("formModel").refresh(true);
                //console.log(updateList);
            },

            onChangeUnitAdd: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productUnitM", text)
            },
            onChangeProviderAdd: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productProvider", text)
            },
            onChangeStatusAdd: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProduct/productActive", text)
            },
            onChangeStatusAddProv: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/addProvider/providerActive", text)
            },

            cleanFieldsProdictForm: function () {
                this.getView().getModel("formModel").setProperty("/addProduct", {
                    "productName": "",
                    "productDescription": "",
                    "productImage": "",
                    "productPriceV": "",
                    "productPriceC": "",
                    "productStock": "",
                    "idUnit": "0",
                    "productUnitM": "",
                    "idProvider": "0",
                    "productProvider": "",
                    "idStatus": "0",
                    "productActive": "",
                    "imgUrl": ""
                });
            },
            cleanFieldsProviderForm: function () {
                this.getView().getModel("formModel").setProperty("/addProvider", {
                    "idProvider": null,
                    "providerName": "",
                    "providerPhone": "",
                    "providerAddress": "",
                    "idStatus": "0",
                    "providerActive": "",
                    "providerStatusIcon": "",
                    "providerStatusState": "",
                });
            },

            cleanFieldsUnitForm: function () {
                this.getView().getModel("formModel").setProperty("/addUnit", {
                    "idUnit": null,
                    "unitName": "",
                    "unitDescription": "",
                    "unitAbbreviation": ""
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
                    property: ["idUnit"],
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
                }); aCols.push({
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
            createColumnConfigTableUnitOfUnit: function () {
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
                    oTable = this.getView().byId("idUnitTable");
                    path = oTable.getBinding("items").getPath();
                    fileName = "UnidadMedidaDataExcel.xlsx";
                    aCols = this.createColumnConfigTableUnitOfUnit();
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
            loadUnit: function () {
                const { unitList, selectUnitList } = this.getView().getModel("formModel").getData();
                unitList.forEach((element) => {
                    let obj = {};
                    obj.key = element.idUnit.toString();
                    obj.text = element.unitName;
                    selectUnitList.push(obj);
                });

                this.getView().getModel("formModel").setProperty("/selectUnitList", selectUnitList);
            },


            onAfterRendering: function () {
                this.loadSupplier();
                this.loadUnit();
            },
            onPressEditProduct: function (oEvent) {

                var oButton = oEvent.getSource();
                var oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/editProduct", { ...oSelectObj });

                // create popover
                if (!this.oEditProduct) {
                    this.oEditProduct = this.loadFragment({
                        name: "com.pe.proyectoIntegrador.view.fragment.EditProduct"
                    });
                }
                this.oEditProduct.then(
                    function (oDialog1) {
                        this.oDialogEditProduct = oDialog1;
                        this.oDialogEditProduct.open();
                    }.bind(this)
                );
            },

            onEditProductSave: function () {
                debugger;

                //1.VALIDAR QUE TODOS LOS CAMPOS ESTEN LLENOS
                const { productName, productDescription, productPriceV, productPriceC, productStock, imgUrl, idUnit, idStatus, idProvider } = this.getView().getModel("formModel").getProperty("/editProduct")
                if (productName.trim().length == 0 || idStatus == "0" || productDescription.trim().length == 0 || productPriceV.trim().length == 0 || productPriceC.trim().length == 0 || productStock.trim().length == 0 || imgUrl.trim().length == 0 || idUnit == "0" || idStatus == "0") {
                    util.utilUI.messageBox("Complete todos campos marcados en asterisco", "WARNING", "Alerta");
                    return;
                }
                this.getView().getModel("formModel").setProperty("/editProduct/idUnit", parseInt(idUnit));
                this.getView().getModel("formModel").setProperty("/editProduct/idStatus", parseInt(idStatus));
                this.getView().getModel("formModel").setProperty("/editProduct/idProvider", parseInt(idProvider));


                let productList = this.getView().getModel("formModel").getProperty("/productList");
                let updateList = [];
                let editProduct = this.getView().getModel("formModel").getProperty("/editProduct");
                productList.forEach(element => {
                    //1. Validator si en el caso el idde editProducto != element.id ahi debes pushear a la listaF

                    if (element.idProduct != editProduct.idProduct) {
                        updateList.push({ ...element });
                    } else {
                        updateList.push({ ...editProduct });
                    }
                    this.getView().getModel("formModel").setProperty("/productList", updateList);
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
            onChangeUnitEdit: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productUnitM", text)
            },
            onChangeProviderEdit: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productProvider", text)
            },
            onChangeStatusEdit: function (oEvent) {

                let text = oEvent.getSource().getSelectedItem().getProperty("text");
                this.getView().getModel("formModel").setProperty("/editProduct/productActive", text)
            },
            cleanFieldsEditForm: function () {
                this.getView().getModel("formModel").setProperty("/editProduct", {
                    "productName": "",
                    "productDescription": "",
                    "productImage": "",
                    "productPriceV": "",
                    "productPriceC": "",
                    "productStock": "",
                    "idUnit": "0",
                    "productUnitM": "",
                    "idProvider": "0",
                    "productProvider": "",
                    "idStatus": "0",
                    "productActive": "",
                    "imgUrl": ""
                });
            },
            onPressDeleteProduct: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
                var oProduct = oButton.getParent().getBindingContext("formModel");
                var oSelectObj = oProduct.getObject();
                this.getView().getModel("formModel").setProperty("/editProduct", { ...oSelectObj });
                let productList = this.getView().getModel("formModel").getProperty("/productList");
                let updateList = [];
                let editProduct = this.getView().getModel("formModel").getProperty("/editProduct");
                productList.forEach(element => {
                    //1. Validator si en el caso el idde editProducto != element.id ahi debes pushear a la listaF

                    if (element.idProduct != editProduct.idProduct) {
                        updateList.push({ ...element });
                    }
                    this.getView().getModel("formModel").setProperty("/productList", updateList);
                });
                //Refrescar TODO lo que esta anidado a formModel
                this.getView().getModel("formModel").refresh(true);
                //const{productList} =this.getView().getModel("formModel").getData()
            },
            filterText: function (data) {
                let newValue = ";" + data;
                let validationCondition = /[^a-z0-9., -]/gi;
                let validationArray = [0];
                let tempValidationArray = newValue.match(validationCondition)
                validationArray.push(...tempValidationArray);
                let validationResult = validationArray.length;
                if (validationResult > 2) {
                    //console.log("No se permiten caracteres especiales");
                    newValue = newValue.slice(0, - 1);
                    //this.getView().byId("trialInput").setValue("Papas");
                } else {
                    //console.log("No hay caracteres especiales");
                }
                newValue = newValue.slice(1);
                return newValue;
            },
            filterNumber: function (data) {
                let newValue = ";" + data;
                let validationCondition = /[^0-9]/gi;
                let validationArray = [0];
                let tempValidationArray = newValue.match(validationCondition)
                validationArray.push(...tempValidationArray);
                let validationResult = validationArray.length;
                if (validationResult > 2) {
                    //console.log("No se permiten caracteres especiales");
                    newValue = newValue.slice(0, - 1);
                    //this.getView().byId("trialInput").setValue("Papas");
                } else {
                    //console.log("No hay caracteres especiales");
                }
                newValue = newValue.slice(1);
                return newValue;
            },
            filterPrice: function (data) {
                let newValue = ";" + "," + "." + data;
                //Validación de caracteres
                let validationCondition = /[^0-9.,]/gi;
                let validationArray = [0];
                let tempValidationArray = newValue.match(validationCondition);
                validationArray.push(...tempValidationArray);
                let validationResult = validationArray.length;
                //Validación de decimal
                let validationDecimal = /[.,]/gi;
                let decimalArray = [0];
                let tempdecimalArray = newValue.match(validationDecimal);
                decimalArray.push(...tempdecimalArray);
                let decimalResult = decimalArray.length;
                let temp_comma = newValue.indexOf(",", 3);
                let temp_point = newValue.indexOf(".", 3);
                if (validationResult > 2 || decimalArray.length > 4) {
                    newValue = newValue.slice(0, - 1);
                }
                if (temp_comma !== -1) {
                    let temp_newValue = newValue.slice(0, -1);
                    newValue = temp_newValue + ".";
                }
                if ((temp_point !== -1)) {
                    let temp_length = newValue.length;

                    if (temp_length - 3 > temp_point) {
                        newValue = newValue.slice(0, - 1);
                        console.log("Dos decimales");
                    }
                }
                newValue = newValue.slice(3);
                return newValue;
            },
            //Validaciones caracteres en input
            lcapName: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcapNameId").setValue(newValue)
            },
            lcapDescription: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcapDescriptionId").setValue(newValue)
            },
            lcapPriceV: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterPrice(newValue);
                this.getView().byId("lcapPriceVId").setValue(newValue)
            },
            lcapPriceC: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterPrice(newValue);
                this.getView().byId("lcapPriceCId").setValue(newValue)
            },
            lcapStock: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterNumber(newValue);
                this.getView().byId("lcapStockId").setValue(newValue)
            },
            //Filtros para el formulario de Editar Producto
            lcepName: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcepNameId").setValue(newValue)
            },
            lcepDescription: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcepDescriptionId").setValue(newValue)
            },
            lcepPriceV: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterPrice(newValue);
                this.getView().byId("lcepPriceVId").setValue(newValue)
            },
            lcepPriceC: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterPrice(newValue);
                this.getView().byId("lcepPriceCId").setValue(newValue)
            },
            lcepStock: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterNumber(newValue);
                this.getView().byId("lcepStockId").setValue(newValue)
            },
            lcaprName: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcaprNameId").setValue(newValue)
            },
            lcaprPhone: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterNumber(newValue);
                this.getView().byId("lcaprPhoneId").setValue(newValue)
            },
            lcaprAddress: function (oEvent) {
                let newValue = oEvent.getParameter("newValue");
                newValue = this.filterText(newValue);
                this.getView().byId("lcaprAddressId").setValue(newValue)
            },
            onExportPDF: function (oEvent) {
                const selectedTab = this.getView().getModel("formModel").getProperty("/selectedIconTabBar");
                let oTable, aCols, fileName, title;
                debugger;
                switch (selectedTab) {
                    case "0":
                        oTable = this.getView().byId("idProductsTable");
                        aCols = this.createColumnConfigTableProducts();
                        fileName = "Tabla de Productos.pdf";
                        title = "Productos";
                        break;
                    case "1":
                        oTable = this.getView().byId("idProviderTable");
                        aCols = this.createColumnConfigTableProducts();
                        fileName = "Tabla de Proveedores.pdf";
                        title = "Proveedores";
                        break;
                    case "2":
                        oTable = this.getView().byId("idUnitTable");
                        aCols = this.createColumnConfigTableProducts();
                        fileName = "Tabla de Unidades.pdf";
                        title = "Unidades";
                        break;
                }

                const oRowBinding = oTable.getBinding("items");
                if (!oRowBinding || !oRowBinding.getLength()) {
                    MessageBox.warning("No existen datos para crear el documento");
                    return;
                }
                try {
                    let test1=jQuery.sap.require("com/pe/proyectoIntegrador/lib/jsPDF/jspdf");
                    let test=jQuery.sap.require("com/pe/proyectoIntegrador/lib/jsPDF/autotable");
                } catch (e) {}
                const doc = new jspdf();
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
            onDeleteMultipleProducts: function(){
                debugger;
                const selectedItems =  this.byId("idProductsTable").getSelectedItems();
                const selectedProducts = [];
                selectedItems.forEach(function(products){
                    const product = products.getBindingContext("formModel").getObject();
                    selectedProducts.push(product);
                });
                if (selectedProducts.length === 0){
                    MessageBox.warning("No hay selección");
                    return;
                }
                const updateList = this.getView().getModel("formModel").getProperty("/productList");
                const product = updateList.filter(Items => !selectedProducts.includes(Items));
                this.getView().getModel("formModel").setProperty("/productList", product);
                this.getView().getModel("formModel").updateBindings();
            },
            //},
        });
    }
);
