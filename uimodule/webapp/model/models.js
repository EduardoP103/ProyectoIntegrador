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
            localModel : function(){
                const oParam = {
                    nombre: "",
                    direccion: "",
                    selectKeyPais: "0",
                    selectKeyDistrito : "0",
                    listaPokemones : [],
                    // listaTabla : [],
                    listaTabla : [
                        {
                            "product": "Carro",
                            "supplier": "BMW",
                            "dimension": "4 x 4",
                            "weight": "weight1",
                            "price": "10.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          },
                          {
                            "product": "Mouse",
                            "supplier": "supplier12",
                            "dimension": "dimension2",
                            "weight": "weight2",
                            "price": "12.0"
                          },
                          {
                            "product": "Aceituna",
                            "supplier": "supplier13",
                            "dimension": "dimension3",
                            "weight": "weight3",
                            "price": "13.0"
                          },
                          {
                            "product": "Penicilina",
                            "supplier": "supplier14",
                            "dimension": "dimension4",
                            "weight": "weight4",
                            "price": "17.0"
                          }
                    ],

                    selectPokemon : {
                        visible : false,
                        key : "0",
                        url : ""
                    },
                    addReg : {
                        "product": "",
                        "supplier": "",
                        "dimension": "",
                        "weight": "",
                        "price": ""
                      },
                      
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            }
        };
    }
);
