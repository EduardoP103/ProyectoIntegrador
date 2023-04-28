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
                            "idProduct" : 1,
                            "productName" : "SSD",
                            "productDescription" : "Disco Sólido",
                            "productPriceV" : "18.0",
                            "productPriceC" : "18.0",
                            "productStock" : "30.0",
                            "idMeasurement" : 1,
                            "productUnitM" : "Unidades",
                            "idProvider" : 1,
                            "productProvider" : "Pepito",
                            "idStatus" : 1,
                            "productActive" : "Activo",
                            "imgUrl" : "https://img.unocero.com/2021/08/rickroll_4k.jpeg"

                        }
                    ],
                    addProduct : {
                        "idProduct" : null,
                        "productName" : "",
                        "productDescription" : "",
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
                    },
                    editProduct : {
                        "idProduct" : null,
                        "productName" : "",
                        "productDescription" : "",
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
                    },

                    providerList : [
                        {
                            "idProvider": "1",
                            "providerName": "Pepito",
                            "providerPhone": "980545386",
                            "providerAddress": "Av. Manuel Gonzales parda",
                            "idStatus": "1",
                            "providerActive": "Activo",
                            "providerStatusIcon": "sap-icon://sys-enter-2",
                            "providerStatusState": "Success",
                        }
                    ],

                    measurementList : [
                        {  
                            "idUnit": 1,
                            "unitName": "Unidades",
                            "unitDescription": "Unidades",
                            "unitAbbreviation": "UND"
                        },
                        {  
                            "idUnit": 2,
                            "unitName": "Metros",
                            "unitDescription": "Metros",
                            "unitAbbreviation": "m"
                        }
                    ],
                    
                    //Desplegable de los combos para el agregar y el editar
                    selectProviderList : [{
                        "key" : "0",
                        "text" : "--Seleccione proveedor---"
                    },

                ],
                    selectMeasurementList : [{
                        "key" : "0",
                        "text" : "--Seleccione medida---"
                    }],

                    selectStatusList : [{
                        "key" : "0",
                        "text" : "--Seleccione opción---"
                    },{
                        "key" : "1",
                        "text" : "Activo"
                    },{
                        "key" : "2",
                        "text" : "Desactivado"
                    }
                ],

                    
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
