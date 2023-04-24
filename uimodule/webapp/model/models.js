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
                        name: "Eduardo Pastor",
                        cargo: "Analista de Sistemas",
                    },
                    selectUnitOfMeasurementName: "0",
                    unitOfMeasurementName: [
                        {
                            id: 0,
                            name: "--Seleccione--",
                        },
                        {
                            id: 1,
                            name: "UND",
                        },
                        {
                            id: 2,
                            name: "DOC"
                        }
                    ],
                    selectedRowView: {},
                    selectedIconTabBar: "0",
                    listOfProducts: [
                        {
                            id: 1,
                            name: "Poco X5 Pro Black 6GB - 128GB",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/1/_/1_5_1.jpg",
                            fSalePrice: "1200",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Redmi Buds 4 (White)",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/r/e/redmi-buds-4_white.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Xiaomi Mi Portable Bluetooth Speaker (16W) Blue",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/m/i/mi-bluettoh-speaker.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Xiaomi Mi Portable Bluetooth Speaker (16W) Blue",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/m/i/mi-bluettoh-speaker.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Xiaomi Mi Portable Bluetooth Speaker (16W) Blue",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/m/i/mi-bluettoh-speaker.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Xiaomi Mi Portable Bluetooth Speaker (16W) Blue",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/m/i/mi-bluettoh-speaker.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: 2,
                            name: "Xiaomi Mi Portable Bluetooth Speaker (16W) Blue",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/m/i/mi-bluettoh-speaker.jpg",
                            salePrice: "18.00",
                            fPurchasePrice: 1800,
                            purchasePrice: "18.00",
                            fStock: 12,
                            stock: "300.0",
                            idUnitOfmeasurment: 1,
                            unitOfMeasurementName: "UND",
                            idSupplier: 1,
                            supplierName: "Perú",
                            idStatus: 1,
                            statusName: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                    ],
                    listOfSuppliers: [
                        {
                            id: 1,
                            name: "Perú",
                            phone: "988999111",
                            address: "Pasaje San Fijo",
                            state: "Activo"
                        },
                    ],
                    listOfUnitOfMeasurement: [
                    {
                        id: 1,
                        name: "UND",
                        description: "lorem"
                    }
                    ],
                    addProduct: {
                        name: "",
                        description: "",
                        image: "",
                        salePrice: "",
                        purchasePrice: "",
                        stock: "",
                        unitOfMeasurementName: "",
                        supplierName: "",
                        statusName: "",
                    },
                    

                };
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
