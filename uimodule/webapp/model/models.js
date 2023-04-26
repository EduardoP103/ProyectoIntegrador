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
                    selectedRowView: {},
                    selectedIconTabBar: "0",
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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

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
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

                        },
                    ],

                    supplierList : [
                        {
                            id: 1,
                            name: "Pepito",
                            phone: "980545386",
                            address: "Av. Manuel Gonzales parda",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        }
                    ],

                    measurementList : [
                        {  
                             id: 1,
                            name: "Unidades",
                            description: "Unidades",
                            abbrevation: "UND"
                        }
                    ],
                    
                    //Desplegable de los combos para el agregar y el editar
                    selectSupplierList : [{
                        "key" : "0",
                        "text" : "--Seleccione---"
                    },

                ],
                    selectMeasurementList : [{
                        "key" : "0",
                        "text" : "--Seleccione---"
                    }],

                    
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
