sap.ui.define(
    ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     *
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     *
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            formModel: function () {
                const oParam = {
                    productList: [
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                        {
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productImage" : "Carro",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "productUnitM" : "UND",
                            "productProvider" : "Pepito",
                            "productActive" : "Activo",

                        },
                    ],
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
