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

            formularioSimple: function(){

                const oParam = {

                    tabSelect: "0",
                    search: "",
                    selectDistrito: "0",
                    selectTipoDocumento: "0",
                    selectSexo: "0",
                    selectUnidadMedida: "0",
                    selectProveedor: "0",
                    selectActivo: "0",
                    selectedRowViewImage :{},
                    sexo: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "name": "Hombre"
                        },
                        {
                            "id": "2",
                            "name": "Mujer"
                        }
                    ],
                    tipoDocumento: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "name": "DNI"
                        },
                        {
                            "id": "2",
                            "name": "RUC"
                        }
                    ],
                    distritoSelect: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "name": "Breña"
                        },
                        {
                            "id": "2",
                            "name": "Ate"
                        },
                        {
                            "id": "3",
                            "name": "Cercado de Lima"
                        },
                        {
                            "id": "4",
                            "name": "Los Olivos"
                        },
                        {
                            "id": "5",
                            "name": "Chorrillos"
                        }
                    ],
                    unidadMedida: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        }

                    ],
                    listaProveedores: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        }

                    ],
                    activo: [
                        {
                            "id": "0",
                            "name": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "name": "Activo"
                        }

                    ],
                    listaTabla1: [
                        {
                            "id": 1,
                            "nombre": "MSI GEFORCE RTX 3060 8GB GDDR6 128BITS OC VENTUS 2X",
                            "descripcion": "PN:912-V397-646",
                            "imagen": "https://cyccomputer.pe/48057-large_default/msi-geforce-rtx-3060-8gb-gddr6-128bits-oc-ventus-2x-pn912-v397-646.jpg",
                            "preciov": "1556.00",
                            "precioc": "1486.00",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 2,
                            "nombre": "ESET INTERNET SECURITY 2023 3 PCS LICENCIA ANUAL",
                            "descripcion": "PN:S11020192",
                            "imagen": "https://cyccomputer.pe/48075-large_default/eset-internet-security-2023-3-pcs-licencia-anual-pns11020192.jpg",
                            "preciov": "183.54",
                            "precioc": "160.50",
                            "stock": "10",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '2',
                            "idActivo": '1'

                        },
                        {
                            "id": 3,
                            "nombre": "MEMORIA 8GB DDR4 T-FORCE DELTA RGB BLACK BUS 3200MHZ BLACK",
                            "descripcion": "PN:TF3D48G3200HC16C01",
                            "imagen": "https://cyccomputer.pe/48072-large_default/memoria-8gb-ddr4-t-force-delta-rgb-black-bus-3200mhz-black-pntf3d48g3200hc16c01.jpg",
                            "preciov": "113.72",
                            "precioc": "105.80",
                            "stock": "18",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 4,
                            "nombre": "PLACA MSI PRO Z790-P WI-FI DDR5 LGA 1700",
                            "descripcion": "PN:911-7E06-010",
                            "imagen": "https://cyccomputer.pe/48061-large_default/placa-msi-pro-z790-p-wi-fi-ddr5-lga-1700-pn911-7e06-010.jpg",
                            "preciov": "1216.95",
                            "precioc": "1159.00",
                            "stock": "4",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 5,
                            "nombre": "AUDIFONO PRIMUS MANDALORIAN ARCUS100T CON MICROFONO STEREO",
                            "descripcion": "PN:PHS-S101ML",
                            "imagen": "https://cyccomputer.pe/45309-large_default/audifono-primus-mandalorian-arcus100t-con-microfono-stereo-pnphs-s101ml.jpg",
                            "preciov": "161.60",
                            "precioc": "140.00",
                            "stock": "25",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 6,
                            "nombre": "MSI MPG CORELIQUID K360 ARGB REFRIGERACION LIQUIDO AMD/INTEL",
                            "descripcion": "PN:99S6-6A0321-018",
                            "imagen": "https://cyccomputer.pe/38057-large_default/msi-mpg-coreliquid-k360-argb-refrigeracion-liquido-amdintel-pn99s6-6a0321-018.jpg",
                            "preciov": "1256.85",
                            "precioc": "1190.00",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '2',
                            "idActivo": '1'

                        },
                        {
                            "id": 7,
                            "nombre": "CASE COOLER MASTER COSMOS INFINITY 30 ANIVERSARIO",
                            "descripcion": "PN:MCC-C700M-KHNN-S30",
                            "imagen": "https://cyccomputer.pe/47468-large_default/case-cooler-master-cosmos-infinity-30-aniversario-obsequio-fuente-v1300-platinum-pnmcc-c700m-khnn-s30.jpg",
                            "preciov": "4189.00",
                            "precioc": "3999.00",
                            "stock": "6",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 8,
                            "nombre": "LAPTOP DELL LATITUDE 3410 CI7-10210U 14''/8GB/SSD 256GB/UBUNTU",
                            "descripcion": "PN:L341i7CLs8256UB1WXCTO",
                            "imagen": "https://cyccomputer.pe/34392-large_default/laptop-dell-latitude-3410-ci7-10210u-148gbssd-256gbubuntu-pnl341i7cls8256ub1wxcto.jpg",
                            "preciov": "3870.00",
                            "precioc": "3686.00",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 9,
                            "nombre": "IMPRESORA EPSON ECOTANK L6270 MULTIFUNCIONAL CON SISTEMA CONTINUO WIFI",
                            "descripcion": "PN:C11CJ61303",
                            "imagen": "https://cyccomputer.pe/46172-large_default/impresora-epson-ecotank-l6270-multifuncional-con-sistema-continuo-wifi-pnc11cj61303-.jpg",
                            "preciov": "1588.00",
                            "precioc": "1512.40",
                            "stock": "15",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '2',
                            "idActivo": '1'

                        },
                        {
                            "id": 10,
                            "nombre": "MOUSE ANTRYX M670 BLACK RGB 4200 DPI",
                            "descripcion": "PN:AGM-M670K",
                            "imagen": "https://cyccomputer.pe/47485-large_default/mouse-antryx-m670-black-rgb-4200-dpi-pnagm-m670k.jpg",
                            "preciov": "59.85",
                            "precioc": "57.00",
                            "stock": "25",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '2',
                            "idActivo": '1'

                        },
                        {
                            "id": 11,
                            "nombre": "WEBCAM LOGITECH BRIO 500 GRAFITO FULL HD 1080P USB-C",
                            "descripcion": "PN:960-001412",
                            "imagen": "https://cyccomputer.pe/47782-large_default/webcam-logitech-brio-500-grafito-full-hd-1080p-usb-c-pn960-001412.jpg",
                            "preciov": "470.82",
                            "precioc": "448.40",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 12,
                            "nombre": "SSD 480GB WD GREEN SN350 M.2 2280 NVMe PCIe",
                            "descripcion": "PN:WDS480G2G0C-00AJM0",
                            "imagen": "https://cyccomputer.pe/43029-large_default/ssd-480gb-wd-green-sn350-m2-2280-nvme-pcie-pnwds480g2g0c-00ajm0.jpg",
                            "preciov": "145.64",
                            "precioc": "138.70",
                            "stock": "12",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        },
                        {
                            "id": 13,
                            "nombre": "SSD 1TB KINGSTON FURY RENEGADE NVMe M.2 2280 Pcie 4.0 CON DISIPADOR",
                            "descripcion": "PN:SFYRSK/1000G",
                            "imagen": "https://cyccomputer.pe/45931-large_default/ssd-1tb-kingston-fury-renegade-nvme-m2-2280-pcie-40-con-disipador-pnsfyrsk1000g.jpg",
                            "preciov": "578.55",
                            "precioc": "551.00",
                            "stock": "1",
                            "unidadm": "UND",
                            "proveedor": "Memorykings",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '2',
                            "idActivo": '1'

                        },
                        {
                            "id": 14,
                            "nombre": "PLACA ASROCK B560M-HDV DDR4 LGA 1200",
                            "descripcion": "PN:90-MXBF50-A0UAYZ",
                            "imagen": "https://cyccomputer.pe/34217-large_default/placa-asrock-b560m-hdv-ddr4-lga-1200-pn90-mxbf50-a0uayz.jpg",
                            "preciov": "327.18",
                            "precioc": "311.60",
                            "stock": "11",
                            "unidadm": "UND",
                            "proveedor": "CyC Computer",
                            "activo": "Activo",
                            "idUnidaddm": '1',
                            "idProveedor": '1',
                            "idActivo": '1'

                        }
                    ],
                    listaTabla2: [
                        {
                            "id": 1,
                            "nombre": "CyC Computer",
                            "telefono": "992591551",
                            "direccion": "Avenida Garcilazo de la de Vega 1249 - Interior 404 4to piso",
                            "estado": "Activo"

                        },
                        {
                            "id": 2,
                            "nombre": "Memorykings",
                            "telefono": "998245564",
                            "direccion": "Avenida Garcilazo de la de Vega 1261 - Stand 226-227",
                            "estado": "Activo"

                        },
                        // {
                        //     "id": 2,
                        //     "nombre": "Phantom",
                        //     "telefono": "960984854",
                        //     "direccion": "Avenida Garcilazo de la de Vega 1337 - Centro Cívico, C.C. Real Plaza",
                        //     "estado": "Activo"

                        // },
                        // {
                        //     "id": 3,
                        //     "nombre": "Impacto SA",
                        //     "telefono": "955227737",
                        //     "direccion": "Avenida Garcilazo de la Vega 1251 - CC. COMPUPLAZA - Int. 302",
                        //     "estado": "Activo"

                        // }
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
                            "celular": "965038347",
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
                            "celular": "999074631",
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
                            "celular": "998536478",
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
                            "celular": "998563925",
                            "distrito": "Los Olivos",
                            "direccion": "Pasaje Los Sacaorganos 666"
                        },
                        {
                            "id": 5,
                            "nombres": "Antonio",
                            "apellidos": "Mayuri Valdez",
                            "correoelectronico": "anto.mv98@gmail.com",
                            "sexo": "Masculino",
                            "tipodocumento": "DNI",
                            "numdocumento": "705968547",
                            "celular": "956321478",
                            "distrito": "Chorrillos",
                            "direccion": "Jirón Pitucopobre 123 Dpto. 205"
                        }
                    ],
                    listaTabla4: [
                        {
                            "id": 1,
                            "nombre": "Unidad",
                            "descripcion": "Unidad",
                            "abreviatura": "UND",
                            "estado": "Activo"
                        },
                        {
                            "id": 2,
                            "nombre": "Litro",
                            "descripcion": "Litro",
                            "abreviatura": "L",
                            "estado": "Activo"
                        }
                    ],
                    addProducto : {
                        "nombre": "",
                        "descripcion": "",
                        "preciov": "",
                        "urlImage": "",
                        "previoc": "",
                        "stock": "",
                        "unidadm": "",
                        "proveedor": "",
                        "activo": ""
                    },
                    editProducto : {
                        "id": "",
                        "nombre": "",
                        "descripcion": "",
                        "preciov": "",
                        "urlImage": "",
                        "precioc": "",
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
