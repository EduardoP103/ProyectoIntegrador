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
            formularioSimple : function(){
                const oParam = {
                    selectedRowView: {},
                    selectedIconTabBar: "0",
                    // listaProductos: [],
                    listaProductos:
                    [
                        {
                            "nombre": "Alcohol",
                            "descripción": "Desinfectante",
                            "imagen" : "https://www.shutterstock.com/image-illustration/tula-russia-february-28-2021-260nw-1932915491.jpg",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Detergente Liquido Ariel",
                            "descripción": "Detergente",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Jabon liquido ",
                            "descripción": "Jabon",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Papel Higienico",
                            "descripción": "Papel",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Papel Toalla",
                            "descripción": "Papel",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Suavitel",
                            "descripción": "Suavizante",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Limpiavidrios",
                            "descripción": "Limpiavidrios",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Ambientador Glade Vainilla",
                            "descripción": "Ambientador",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Ambientador Glade Lavanda",
                            "descripción": "Ambientador",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Detergente en polvo Ace",
                            "descripción": "detergente",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Ambientador Glade",
                            "descripción": "Ambientador",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Lejía Clorox",
                            "descripción": "Lejía",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "SacaGrasa",
                            "descripción": "Saca grasa",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Cera en Pasta",
                            "descripción": "Cera",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Jabon Camay",
                            "descripción": "Jabon",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Jabon Bolivar",
                            "descripción": "Jabon Ropa",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },
                        {
                            "nombre": "Jabon Protex",
                            "descripción": "Jabon Rostro",
                            "imagen" : "imagen",
                            "preciov": "5.00",
                            "precioc": "5.00",
                            "unidadm":"200",
                            "proveedor":"Karla",
                            "activo" : "Activo"
                        },                        
                    ],
                    listaProveedores :
                    [
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },{
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },{
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "dirección" : "Santa Teodosia 475",
                            "estado" : "activo"
                        }
                        
                    ],
                    listaMedidas:
                    [
                        {
                            "nombre": "Kilogramos",
                            "descripción": "Kilogramos",
                            "abreviatura" : "KG",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Gramos",
                            "descripción": "Gramos",
                            "abreviatura" : "GR",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Litros",
                            "descripción": "Litros",
                            "abreviatura" : "L",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Mililitros",
                            "descripción": "Mililitros",
                            "abreviatura" : "ML",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Onzas",
                            "descripción": "Onzas",
                            "abreviatura" : "OZ",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Kilos",
                            "descripción": "Kilos",
                            "abreviatura" : "KG",
                            "estado" : "activo"
                        },
                        {
                            "nombre": "Onzas",
                            "descripción": "Onzas",
                            "abreviatura" : "OZ",
                            "estado" : "activo"
                        },
                    ]
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            }
        };
    }
);