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
            localModel: function () {
                const oParam = {
                    usuario: {
                        name: "Guillermo Eduardo",
                        cargo: "Analista de Sistemas",
                    },
                    selectedRowView: {},
                    selectedIconTabBar: "0",
                    listOfProducts: [
                        {
                            id: 1,
                            name: "SSD",
                            description: "Disco Sólido",
                            image: "https://cyccomputer.pe/44675-large_default/ssd-1tb-wd-green-sata-6gbs-25-pnwds100t3g0a-00na50.jpg",
                            fSalePrice: 18,
                            salePrice: "18.0",
                            fPurchasePrice: 18,
                            purchasePrice: "18.0",
                            fStock: 30,
                            stock: "30.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Pepito",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                    ],
                    listOfSupplier: [
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
                    listOfUnitOfMeasurement: [
                        {   id: 1,
                            name: "Unidades",
                            description: "Unidades",
                            abbrevation: "UND"
                        }
                    ],
                    listOfSuppliers: [],
                    // listaTabla : [],
                    listaTabla: [
                        {
                            product: "Carro",
                            supplier: "BMW",
                            dimension: "4 x 4",
                            weight: "weight1",
                            price: "10.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                        {
                            product: "Mouse",
                            supplier: "supplier12",
                            dimension: "dimension2",
                            weight: "weight2",
                            price: "12.0",
                        },
                        {
                            product: "Aceituna",
                            supplier: "supplier13",
                            dimension: "dimension3",
                            weight: "weight3",
                            price: "13.0",
                        },
                        {
                            product: "Penicilina",
                            supplier: "supplier14",
                            dimension: "dimension4",
                            weight: "weight4",
                            price: "17.0",
                        },
                    ],
                };
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
