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

                    tabSelect: "0",
                    search: "",
                    selectDistrito: "0",
                    selectUnidadMedida: "0",
                    distritoSelect: [
                        {
                            "id": "0",
                            "name:": "Breña"
                        },
                        {
                            "id": "1",
                            "name:": "Ate"
                        }
                    ],
                    unidadMedida: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "name": "UND"
                        }

                    ],
                    listaTabla1: [
                        {
                            "id": 0,
                            "nombre": "MSI GEFORCE RTX 3060 8GB GDDR6 128BITS OC VENTUS 2X",
                            "descripcion": "PN:912-V397-646",
                            "imagen": "En proceso",
                            "preciov": "1556.00",
                            "precioc": "1486.00",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        },
                        {
                            "id": 1,
                            "nombre": "ESET INTERNET SECURITY 2023 3 PCS LICENCIA ANUAL",
                            "descripcion": "PN:S11020192",
                            "imagen": "En proceso",
                            "preciov": "183.54",
                            "precioc": "160.50",
                            "stock": "10",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo"

                        },
                        {
                            "id": 2,
                            "nombre": "MEMORIA 8GB DDR4 T-FORCE DELTA RGB BLACK BUS 3200MHZ BLACK",
                            "descripcion": "PN:TF3D48G3200HC16C01",
                            "imagen": "En proceso",
                            "preciov": "113.72",
                            "precioc": "105.80",
                            "stock": "18",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        },
                        {
                            "id": 3,
                            "nombre": "PLACA MSI PRO Z790-P WI-FI DDR5 LGA 1700",
                            "descripcion": "PN:911-7E06-010",
                            "imagen": "En proceso",
                            "preciov": "1216.95",
                            "precioc": "1159.00",
                            "stock": "4",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        },
                        {
                            "id": 4,
                            "nombre": "AUDIFONO PRIMUS MANDALORIAN ARCUS100T CON MICROFONO STEREO",
                            "descripcion": "PN:PHS-S101ML",
                            "imagen": "En proceso",
                            "preciov": "161.60",
                            "precioc": "140.00",
                            "stock": "25",
                            "unidadm": "UND",
                            "proveedor": "Phantom",
                            "activo": "Activo"

                        },
                        {
                            "id": 5,
                            "nombre": "MSI MPG CORELIQUID K360 ARGB REFRIGERACION LIQUIDO AMD/INTEL",
                            "descripcion": "PN:99S6-6A0321-018",
                            "imagen": "En proceso",
                            "preciov": "1256.85",
                            "precioc": "1190.00",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo"

                        },
                        {
                            "id": 6,
                            "nombre": "CASE COOLER MASTER COSMOS INFINITY 30 ANIVERSARIO",
                            "descripcion": "PN:MCC-C700M-KHNN-S30",
                            "imagen": "En proceso",
                            "preciov": "4189.00",
                            "precioc": "3999.00",
                            "stock": "6",
                            "unidadm": "UND",
                            "proveedor": "Impacto SA",
                            "activo": "Activo"

                        },
                        {
                            "id": 7,
                            "nombre": "LAPTOP DELL LATITUDE 3410 CI7-10210U 14''/8GB/SSD 256GB/UBUNTU",
                            "descripcion": "PN:L341i7CLs8256UB1WXCTO",
                            "imagen": "En proceso",
                            "preciov": "3870.00",
                            "precioc": "3686.00",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        },
                        {
                            "id": 8,
                            "nombre": "IMPRESORA EPSON ECOTANK L6270 MULTIFUNCIONAL CON SISTEMA CONTINUO WIFI",
                            "descripcion": "PN:C11CJ61303",
                            "imagen": "En proceso",
                            "preciov": "1588.00",
                            "precioc": "1512.40",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo"

                        },
                        {
                            "id": 9,
                            "nombre": "MOUSE ANTRYX M670 BLACK RGB 4200 DPI",
                            "descripcion": "PN:AGM-M670K",
                            "imagen": "En proceso",
                            "preciov": "59.85",
                            "precioc": "57.00",
                            "stock": "25",
                            "unidadm": "UND",
                            "proveedor": "Impacto",
                            "activo": "Activo"

                        },
                        {
                            "id": 10,
                            "nombre": "WEBCAM LOGITECH BRIO 500 GRAFITO FULL HD 1080P USB-C",
                            "descripcion": "PN:960-001412",
                            "imagen": "En proceso",
                            "preciov": "470.82",
                            "precioc": "448.40",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "Phantom",
                            "activo": "Activo"

                        },
                        {
                            "id": 11,
                            "nombre": "SSD 480GB WD GREEN SN350 M.2 2280 NVMe PCIe",
                            "descripcion": "PN:WDS480G2G0C-00AJM0",
                            "imagen": "En proceso",
                            "preciov": "145.64",
                            "precioc": "138.70",
                            "stock": "12",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        },
                        {
                            "id": 12,
                            "nombre": "SSD 1TB KINGSTON FURY RENEGADE NVMe M.2 2280 Pcie 4.0 CON DISIPADOR",
                            "descripcion": "PN:SFYRSK/1000G",
                            "imagen": "En proceso",
                            "preciov": "578.55",
                            "precioc": "551.00",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo"

                        },
                        {
                            "id": 13,
                            "nombre": "PLACA ASROCK B560M-HDV DDR4 LGA 1200",
                            "descripcion": "PN:90-MXBF50-A0UAYZ",
                            "imagen": "En proceso",
                            "preciov": "327.18",
                            "precioc": "311.60",
                            "stock": "11",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo"

                        }
                    ],
                    listaTabla2: [
                        {
                            "id": 1,
                            "nombre": "CyC Computer",
                            "telefono": "992 591 551",
                            "direccion": "Avenida Garcilazo de la de Vega 1249 - Interior 404 4to piso",
                            "estado": "Activo"

                        },
                        {
                            "id": 2,
                            "nombre": "Memorykings",
                            "telefono": "998 245 564",
                            "direccion": "Avenida Garcilazo de la de Vega 1261 - Stand 226-227",
                            "estado": "Activo"

                        },
                        {
                            "id": 3,
                            "nombre": "Phantom",
                            "telefono": "960 984 854",
                            "direccion": "Avenida Garcilazo de la de Vega 1337 - Centro Cívico, C.C. Real Plaza",
                            "estado": "Activo"

                        },
                        {
                            "id": 4,
                            "nombre": "Impacto SA",
                            "telefono": "955 227 737",
                            "direccion": "Avenida Garcilazo de la Vega 1251 - CC. COMPUPLAZA - Int. 302",
                            "estado": "Activo"

                        }
                    ],
                    listaTabla3: [
                        {
                            "id": 1,
                            "nombres": "Dario Alberto",
                            "apellidos": "Ayarza Medina",
                            "correoelectronico": "darioayarza1992@gmail.com",
                            "sexo": "Masculino",
                            "tipodocumento": "DNI",
                            "numdocumento": "71407053",
                            "celular": "965 038 347",
                            "distrito": "Breña",
                            "direccion": "Jirón Chamaya 237"
                        },
                        {
                            "id": 2,
                            "nombres": "Sofia Ariadna",
                            "apellidos": "Ayarza Medina",
                            "correoelectronico": "sofiaam03@gmail.com",
                            "sexo": "Femenino",
                            "tipodocumento": "DNI",
                            "numdocumento": "78549315",
                            "celular": "999 074 631",
                            "distrito": "Breña",
                            "direccion": "Jirón Chamaya 237"
                        },
                        {
                            "id": 3,
                            "nombres": "Carmen Fatima",
                            "apellidos": "Salas Espinoza",
                            "correoelectronico": "carmen.fatima@gmail.com",
                            "sexo": "Femenino",
                            "tipodocumento": "DNI",
                            "numdocumento": "76891478",
                            "celular": "998 536 478",
                            "distrito": "Cercado de Lima",
                            "direccion": "Jirón Eugenio Paredes 2278"
                        },
                        {
                            "id": 4,
                            "nombres": "Gabriela del Pilar",
                            "apellidos": "Paz Rojas",
                            "correoelectronico": "gaby.paz@gmail.com",
                            "sexo": "Femenino",
                            "tipodocumento": "DNI",
                            "numdocumento": "78596412",
                            "celular": "998 563 925",
                            "distrito": "Los Olivos",
                            "direccion": "Pasaje Los Sacaorganos 666"
                        },
                        {
                            "id": 4,
                            "nombres": "Antonio",
                            "apellidos": "Mayuri Valdez",
                            "correoelectronico": "anto.mv98@gmail.com",
                            "sexo": "Masculino",
                            "tipodocumento": "DNI",
                            "numdocumento": "705968547",
                            "celular": "956 321 478",
                            "distrito": "Chorrillos",
                            "direccion": "Jirón Pitucopobre 123 Dpto. 205"
                        }
                    ],
                    addProducto : {
                        "nombre": "",
                        "descripcion": "",
                        "preciov": "",
                        "previoc": "",
                        "stock": "",
                        "unidadm": "",
                        "proveedor": "",
                        "activo": ""
                    },
                    addProveedor : {
                        "nombre": "",
                        "telefono": "",
                        "direccion": "",
                        "estado": ""
                    },
                    addCliente : {
                        "nombres": "",
                        "apellidos": "",
                        "correoelectronico": "",
                        "sexo": "",
                        "tipodocumento": "",
                        "numdocumento": "",
                        "celular": "",
                        "distrito": "",
                        "direccion": "",
                    }

                }
                const oModel = new JSONModel(oParam);
                return oModel;

            }
        };
    }
);
