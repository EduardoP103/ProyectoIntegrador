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
                    selectKeyUnidad: "0",
                    selectKeyProveedor: "0",
                    selectKeyActivo: "0",

                    
                    // listaProductos: [],
                    listaProductos:
                    [
                        {
                            "id" : 1,
                            "nombre": "Alcohol",
                            "descripcion": "Desinfectante",
                            "imagen" : "https://vivanda.vtexassets.com/arquivos/ids/205826/20200279.jpg?v=637339185932600000",
                            "preciov": "11.90",
                            "precioc": "11.90",
                            "unidadm":"LT",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": '1',
                            "idproveedor":'3',
                            "idactivo":'1'
                        },
                        {
                            "id" : 2,
                            "nombre": "Detergente Liquido Ariel",
                            "descripcion": "Detergente",
                            "imagen" : "https://plazavea.vteximg.com.br/arquivos/ids/24300752-512-512/20128351.jpg",
                            "preciov": "25.90",
                            "precioc": "25.90",
                            "unidadm":"LT",
                            "proveedor":"Carmen",
                            "activo" : "Activo",
                            "idunidad": "1",
                            "idproveedor":"1",
                            "idactivo":"1"
                        },
                        {
                            "id" : 3,
                            "nombre": "Jabon liquido Aval",
                            "descripcion": "Jabon",
                            "imagen" : "https://corporacionliderperu.com/46605-large_default/aval-jabon-liquido-frasco-x-400-ml-antibac-frutos-rojos.jpg",
                            "preciov": "8.10",
                            "precioc": "8.10",
                            "unidadm":"ML",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"3",
                            "idactivo":"1"
                        },
                        {
                            "id" : 4,
                            "nombre": "Papel Toalla Elite",
                            "descripcion": "Papel",
                            "imagen" : "https://corporacionliderperu.com/47008-large_default/elite-papel-toalla-mega-rollo-rojo-x-106h.jpg",
                            "preciov": "2.70",
                            "precioc": "2.70",
                            "unidadm":"G",
                            "proveedor":"Carmen",
                            "activo" : "Activo",
                            "idunidad": "3",
                            "idproveedor":"1",
                            "idactivo":"1"
                        },
                        {
                            "id" : 5,
                            "nombre": "Suavitel",
                            "descripcion": "Suavizante",
                            "imagen" : "https://promart.vteximg.com.br/arquivos/ids/567787-1000-1000/120682.jpg?v=637393515659930000",
                            "preciov": "39.90",
                            "precioc": "39.90",
                            "unidadm":"LT",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": "1",
                            "idproveedor":"3",
                            "idactivo":"1"
                        },
                        {
                            "id" : 6,
                            "nombre": "Limpiavidrios Sapolio",
                            "descripcion": "Limpiavidrios",
                            "imagen" : "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/l/i/limpiavidrios-lavanda-gatllo-x650ml-sapolio-14533-default-1.jpg",
                            "preciov": "8.90",
                            "precioc": "8.90",
                            "unidadm":"ML",
                            "proveedor":"Carmen",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"1",
                            "idactivo":"1"
                        },
                        {
                            "id" : 7,
                            "nombre": "Ambientador Glade Lavanda",
                            "descripcion": "Ambientador",
                            "imagen" : "https://promart.vteximg.com.br/arquivos/ids/568243-1000-1000/116352.jpg?v=637393529653970000",
                            "preciov": "11.50",
                            "precioc": "11.50",
                            "unidadm":"ML",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"3",
                            "idactivo":"1"
                        },
                        {
                            "id" : 8,
                            "nombre": "Detergente en polvo Ace",
                            "descripcion": "detergente",
                            "imagen" : "https://plazavea.vteximg.com.br/arquivos/ids/14673266-512-512/20112024.jpg",
                            "preciov": "46.90",
                            "precioc": "46.90",
                            "unidadm":"G",
                            "proveedor":"Jhon",
                            "activo" : "Activo",
                            "idunidad": "3",
                            "idproveedor":"2",
                            "idactivo":"1"
                        },
                        {
                            "id" : 9,
                            "nombre": "Lejía Clorox",
                            "descripcion": "Lejía",
                            "imagen" : "https://vegaperu.vtexassets.com/arquivos/ids/158593/7756641003872.jpg?v=637660221588430000",
                            "preciov": "2.10",
                            "precioc": "2.10",
                            "unidadm":"ML",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"3",
                            "idactivo":"1"
                        },
                        {
                            "id" : 10,
                            "nombre": "SacaGrasa Sapolio",
                            "descripcion": "Saca grasa",
                            "imagen" : "https://plazavea.vteximg.com.br/arquivos/ids/22277544-512-512/1982354002-1.jpg",
                            "preciov": "9.90",
                            "precioc": "9.90",
                            "unidadm":"ML",
                            "proveedor":"Jhon",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"2",
                            "idactivo":"1"
                        },
                        {
                            "id" : 11,
                            "nombre": "Cera en Pasta Sapolio Amarilla",
                            "descripcion": "Cera",
                            "imagen" : "https://plazavea.vteximg.com.br/arquivos/ids/22277890-450-450/32238.jpg?v=638049614224330000",
                            "preciov": "6.50",
                            "precioc": "6.50",
                            "unidadm":"ML",
                            "proveedor":"Jhon",
                            "activo" : "Activo",
                            "idunidad": "2",
                            "idproveedor":"2",
                            "idactivo":"1"
                        },
                        {
                            "id" : 12,
                            "nombre": "Jabon Camay",
                            "descripcion": "Jabon",
                            "imagen" : "https://vegaperu.vtexassets.com/arquivos/ids/157202/7891150044500.jpg?v=637618918127670000",
                            "preciov": "2.40",
                            "precioc": "2.40",
                            "unidadm":"G",
                            "proveedor":"Karla",
                            "activo" : "Activo",
                            "idunidad": "3",
                            "idproveedor":"3",
                            "idactivo":"1"
                        },
                        {
                            "id" : 13,
                            "nombre": "Jabon Bolivar",
                            "descripcion": "Jabon Ropa",
                            "imagen" : "https://plazavea.vteximg.com.br/arquivos/ids/22278960-450-450/20236877.jpg?v=638049620688130000",
                            "preciov": "3.20",
                            "precioc": "3.20",
                            "unidadm":"G",
                            "proveedor":"Jhon",
                            "activo" : "Activo",
                            "idunidad": "3",
                            "idproveedor":"2",
                            "idactivo":"1"
                        },
                        {
                            "id" : 14,
                            "nombre": "Jabon Protex",
                            "descripcion": "Jabon Rostro",
                            "imagen" : "https://www.protex-soap.com/content/dam/cp-sites/personal-care/protex-relaunch/latam/products/protex-avena-2022.jpg",
                            "preciov": "3.20",
                            "precioc": "3.20",
                            "unidadm":"G",
                            "proveedor":"Carmen",
                            "activo" : "Activo",
                            "idunidad": "3",
                            "idproveedor":"1",
                            "idactivo":"1"
                        },                        
                    ],

                    //Lista proveedores
                    listaProveedores :
                    [
                        {
                            "id" : 1,
                            "nombre": "Carmen",
                            "telefono": "923754061",
                            "direccion" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "id" : 2,
                            "nombre": "Jhon",
                            "telefono": "923754061",
                            "direccion" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        {
                            "id" : 3,
                            "nombre": "Karla",
                            "telefono": "923754061",
                            "direccion" : "Santa Teodosia 475",
                            "estado" : "activo"
                        },
                        
                        
                    ],

                    //lista medidas
                    listaMedidas:
                    [
                       
                        {
                            "id" : 1,
                            "nombre": "Litros",
                            "descripcion": "Litros",
                            "abreviatura" : "LT",
                            "estado" : "activo"
                        },
                        {
                            "id" : 2,
                            "nombre": "Mililitros",
                            "descripcion": "Mililitros",
                            "abreviatura" : "ML",
                            "estado" : "activo"
                        },
                        {
                            "id" : 3,
                            "nombre": "Gramos",
                            "descripcion": "Gramos",
                            "abreviatura" : "GR",
                            "estado" : "activo"
                        }                        
                    ],
                    //para combo unidad medida
                    unidadMedida: [
                        {
                            "id": "0",
                            "unidad": "--Seleccione--"
                        },
                        {
                            "id": "1",
                            "unidad": "LT"
                        },
                        {
                            "id": "2",
                            "unidad": "ML"
                        },
                        {
                            "id": "3",
                            "unidad": "G"
                        }
                    ],

                    //para combo proveedor
                    proveedor : [
                        {
                            "id":"0",
                            "nombre":"--Seleccione--"
                        },
                        {
                            "id":"1",
                            "nombre":"Carmen"
                        },
                        {
                            "id":"2",
                            "nombre":"Jhon"
                        },
                        {
                            "id":"3",
                            "nombre":"Karla"
                        }

                    ],

                    //para combo activo
                    activo:[
                        {
                            "id":"0",
                            "activo":"--Seleccione"
                        },
                        {
                            "id":"1",
                            "activo":"Activo"
                        },
                        // {
                        //     "id":"2",
                        //     "activo":"Desactivo"
                        // }
                    ],

                    //agregarProducto
                    agregarProducto : {
                        "id" : "",
                        "nombre": "",
                        "descripcion": "",
                        "urlImage": "",
                        "preciov": "",
                        "precioc": "",
                        "unidadm": "",
                        "proveedor": "",
                        "activo": "",
                        "idunidad": "",
                        "idproveedor":"",
                        "idactivo":""
                    },

                    editarProducto : {
                        "id":"",
                        "nombre": "",
                        "descripcion": "",
                        "urlImage": "",
                        "preciov": "",
                        "precioc": "",
                        "unidadm": "",
                        "proveedor": "",
                        "activo": "",
                        "idunidad": "",
                        "idproveedor":"",
                        "idactivo":""
                    }
                }
                const oModel = new JSONModel(oParam);
                return oModel;
            }
        };
    }
);