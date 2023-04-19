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
            PintarTabla: function(){
                const oParam = [
                 
                    {
                        "nombreProducto": "Poco X5 Pro Black 6GB - 128GB",
                        "descripcionProducto": "XIAOMI ",
                        "imagen": "OK",
                        "precioV": "162,91 ; 76,03 ",
                        "precioC": "189g",
                        "unidadM": "S/ 1529.00",
                        "proveedor": "19",
                        "activo": "Stock"
                    },
                    {
                        "nombreProducto": "Poco X5 Pro Black 6GB - 128GB",
                        "descripcionProducto": "XIAOMI ",
                        "imagen": "OK",
                        "precioV": "162,91 ; 76,03 ",
                        "precioC": "189g",
                        "unidadM": "S/ 1529.00",
                        "proveedor": "19",
                        "activo": "Stock"
                    },
                    {
                        "nombreProducto": "Poco X5 Pro Black 6GB - 128GB",
                        "descripcionProducto": "XIAOMI ",
                        "imagen": "OK",
                        "precioV": "162,91 ; 76,03 ",
                        "precioC": "189g",
                        "unidadM": "S/ 1529.00",
                        "proveedor": "19",
                        "activo": "Stock"
                    },
                ];
                const oModel = new JSONModel(oParam);
                return oModel;
            },

        };
    }
);