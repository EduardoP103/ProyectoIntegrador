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
                    tabSelect: "0",
                    search: "",
                    selectedIconTabBar: "0",
                    selectRowView: {},
                    selectStateName: "0",
                    selectSupplierName: "0",
                    selectUnitOfMeasurementName: "0",
                    ListunitOfMeasurementName: [
                        {
                            id: "0",
                            name: "--Seleccione--",
                        },
                        {
                            id: "1",
                            name: "UND",
                        },
                        {
                            id: "2",
                            name: "DOC"
                        }
                    ],
                    activo: [
                        {
                            id: "0",
                            name: "--Seleccione--",
                        },
                        {
                            id: "1",
                            name: "Activo",
                            statusIcon: "sap-icon://sys-enter-2",
                            statusState: "Success",
                        },
                        {
                            id: "2",
                            name: "En Proceso",
                            statusIcon: "sap-icon://in-progress",
                            statusState: "Warning",
                        },
                        {
                            id: "3",
                            name: "Inactivo",
                            statusIcon: "",
                            statusState: "Error",
                        }
                    ],
                    selectedRowView: {},
                    listOfProducts: [
                        {
                            id: 0,
                            name: "Poco X5 Pro Black 6GB - 128GB",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/1/_/1_5_1.jpg",
                            fSalePrice: "100",
                            salePrice: "100",
                            fPurchasePrice: 100,
                            purchasePrice: "100",
                            fStock: 12,
                            stock: "300",
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
                            id: 1,
                            name: "Redmi Buds 4 (White)",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/r/e/redmi-buds-4_white.jpg",
                            salePrice: "180",
                            fPurchasePrice: 180,
                            purchasePrice: "180",
                            fStock: 12,
                            stock: "300",
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
                            salePrice: "102",
                            fPurchasePrice: 102,
                            purchasePrice: "102",
                            fStock: 12,
                            stock: "300",
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
                            id: 3,
                            name: "Mi TV Stick",
                            description: "XIAOMI",
                            image: "https://xiaomiperu.com/media/catalog/product/cache/deaf12c726c019462dcd02884cec40ac/t/v/tv-stick_ambos.jpg",
                            salePrice: "170",
                            fPurchasePrice: 170,
                            purchasePrice: "70",
                            fStock: 121,
                            stock: "300",
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
                            id: 0,
                            name: "Perú",
                            phone: "988999111",
                            address: "Pasaje San Fijo",
                            state: "Activo"
                        },
                    ],
                    listOfUnitOfMeasurement: [
                    {
                        id: 0,
                        name: "UNIDAD",
                        description: "lorem lorem",
                        abbreviation: "UND",
                        state: "Activo"
                    },
                    ],
                    listSupplierName:[
                        {
                            id: "0",
                            name: "--Seleccione--"
                        },
                        {
                            id: "1",
                            name: "Perú"
                        },
                        {
                            id: "2",
                            name: "USA"
                        }
                    ],
                    addProduct: {
                        id: null,
                        name: "",
                        description: "",
                        image: "",
                        fSalePrice: "",
                        salePrice: "",
                        fPurchasePrice: 0,
                        purchasePrice: "",
                        fStock: 0,
                        stock: "",
                        idUnitOfmeasurment: "0",
                        unitOfMeasurementName: "",
                        idSupplier: "0",
                        supplierName: "",
                        idStatus: "0",
                        statusName: "",
                        statusIcon: "sap-icon://sys-enter-2",
                        statusState: "Success",
                    },
                    editProduct: {
                        id: "",
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
                    addSupplierName: {
                        name: "",
                        phone: "",
                        address: "",
                        state: "",
                    }

                };
                const oModel = new JSONModel(oParam);
                return oModel;
            },
        };
    }
);
