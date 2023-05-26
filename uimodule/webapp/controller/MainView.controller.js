sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/f/library',
    'sap/ui/core/Fragment',
    'sap/m/MessagePopover',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/m/MessageItem',
    'sap/ui/core/message/Message',
    'sap/ui/core/library',
    'sap/ui/core/Core',
    'sap/ui/core/Element',
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
    'sap/base/util/deepExtend',
    'sap/m/ColumnListItem',
    '../util/util',
    'sap/ui/vbm/Containers',
    'sap/ui/model/FilterOperator',
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.core.Fragment} Fragment
   * @param {typeof sap.m.MessagePopover} MessagePopover
   * @param {typeof sap.m.MessageBox} MessageBox
   * @param {typeof sap.m.MessageToast} MessageToast
   * @param {typeof sap.m.MessageItem} MessageItem
   * @param {typeof sap.ui.core.message.Message} Message
   * @param {typeof sap.ui.core.Core} Core
   */
  function (
    Controller,
    JSONModel,
    library,
    Fragment,
    MessagePopover,
    MessageBox,
    MessageToast,
    MessageItem,
    Message,
    coreLibrary,
    Core,
    Element,
    Export,
    ExportTypeCSV,
    Spreadsheet,
    exportLibrary,
    deepExtend,
    ColumnListItem,
    util,
  ) {
    'use strict';
    let EdmType = exportLibrary.EdmType;
    let DynamicPageTitleArea = library.DynamicPageTitleArea;
    return Controller.extend('com.pe.proyectoIntegrador.controller.MainView', {
      onInit: function () {},
      // MODO OSCURO
      onDarkModePress: function () {
        sap.ui.getCore().applyTheme('sap_fiori_3_dark');
      },
      onLightModePress: function () {
        // @ts-ignore
        const originalTheme = document
          .getElementById('sap-ui-bootstrap')
          .getAttribute('data-sap-ui-theme');
        sap.ui.getCore().applyTheme(originalTheme);
      },
      // IMAGEN POPOVER
      onOpenViewImage: function (oEvent) {
        const oButton = oEvent.getSource();
        const oView = this.getView();
        const selectedProduct = oButton.getParent().getBindingContext('localModel').getObject();
        oView.getModel('localModel').setProperty('/selectedRowView', selectedProduct);
        if (!this.oPopover) {
          this.oPopover = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.Popover',
          });
        }
        this.oPopover.then(
          function (oPop) {
            this.pPopover = oPop;
            oPop.openBy(oButton);
          }.bind(this),
        );
      },
      oCloseImage: function (oEvent) {
        this.byId('myPopover').close();
      },
      oSelectCheckBox: function () {
        let oTable = this.getView().byId('idProductsTable');
        let oMultiSelectMode = oTable.getMode() === 'MultiSelect';
        oTable.setMode(oMultiSelectMode ? 'None' : 'MultiSelect');
      },
      createColumnConfigTableProducts: function () {
        let aCols = [];

        // aCols.push({
        //     label: 'Id',
        //     property: ['id'],
        //     type: EdmType.String,
        //     template: '{0}',
        // });

        aCols.push({
          label: 'name',
          property: ['name'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'description',
          property: ['description'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'image',
          property: ['image'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'salePrice',
          property: ['salePrice'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'purchasePrice',
          property: ['purchasePrice'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'stock',
          property: ['stock'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'unitOfMeasurementName',
          property: ['unitOfMeasurementName'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'supplierName',
          property: ['supplierName'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'statusName',
          property: ['statusName'],
          type: EdmType.String,
          template: '{0}',
        });
        aCols.push({
          label: 'datepicker',
          property: ['datepicker'],
          type: EdmType.String,
          template: '{0}',
        });

        return aCols;
      },
      createColumnConfigTableSupplier: function () {
        let aCols = [];

        aCols.push({
          label: 'name',
          property: ['name'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'phone',
          property: ['phone'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'address',
          property: ['address'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'state',
          property: ['state'],
          type: EdmType.String,
          template: '{0}',
        });

        return aCols;
      },
      createColumnConfigTableUnitOfMeasurement: function () {
        let aCols = [];

        aCols.push({
          label: 'name',
          property: ['name'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'description',
          property: ['description'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'Abreviatura',
          property: ['abbreviation'],
          type: EdmType.String,
          template: '{0}',
        });

        aCols.push({
          label: 'state',
          property: ['state'],
          type: EdmType.String,
          template: '{0}',
        });
        return aCols;
      },

      onExportSpreadSheetXLSX: function () {
        const selectedTab = this.getView()
          .getModel('localModel')
          .getProperty('/selectedIconTabBar');
        let oTable, aCols, fileName;

        switch (selectedTab) {
          case '0':
            oTable = this.getView().byId('idProductsTable');
            aCols = this.createColumnConfigTableProducts();
            fileName = 'ListaProductosEnStock.xlsx';
            break;
          case '1':
            oTable = this.getView().byId('listOfSuppliers');
            aCols = this.createColumnConfigTableSupplier();
            fileName = 'ListaProveedores.xlsx';
            break;
          case '2':
            oTable = this.getView().byId('listOfUnitOfMeasurement');
            aCols = this.createColumnConfigTableUnitOfMeasurement();
            fileName = 'ListaUnidadMedida.xlsx';
            break;
          default:
            MessageBox.warning('No existen datos, no se puede crear el documento');
            return;
        }
        const oRowBinding = oTable.getBinding('items');
        if (!oRowBinding || !oRowBinding.getLength()) {
          MessageBox.warning('No existen datos, no se puede crear el documento');
          return;
        }
        const oSettings = {
          workbook: { columns: aCols },
          dataSource: oRowBinding,
          fileName: fileName,
        };
        const oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      // EXPORTAR TABLAS EN PDF
      onExportPDFVertical: function () {
        debugger;
        const selectedTab = this.getView()
          .getModel('localModel')
          .getProperty('/selectedIconTabBar');
        let oTable, aCols, fileName, title;
        switch (selectedTab) {
          case '0':
            oTable = this.getView().byId('idProductsTable');
            aCols = this.createColumnConfigTableProducts();
            fileName = 'ListaProductosEnStockVertical.pdf';
            title = 'Productos';
            // text="{i18n>products} ({= ${localModel>/listOfProducts}.length })"
            break;
          case '1':
            oTable = this.getView().byId('listOfSuppliers');
            aCols = this.createColumnConfigTableSupplier();
            fileName = 'ListaProveedoresVertical.pdf';
            title = 'Proveedores';
            break;
          case '2':
            oTable = this.getView().byId('listOfUnitOfMeasurement');
            aCols = this.createColumnConfigTableUnitOfMeasurement();
            fileName = 'ListaUnidadMedidaVertical.pdf';
            title = 'Unidades de Medida';
            break;
          default:
            MessageBox.warning('No existen datos, no se puede crear el documento');
            return;
        }
        const oRowBinding = oTable.getBinding('items');
        if (!oRowBinding || !oRowBinding.getLength()) {
          MessageBox.warning('No existen datos, no se puede crear el documento');
          return;
        }
        try {
          let test1 = jQuery.sap.require('com/pe/proyectoIntegrador/lib/jsPDF/jspdf');
          let test = jQuery.sap.require('com/pe/proyectoIntegrador/lib/jsPDF/autotable');
        } catch (e) {}
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(18);
        doc.text(title, 14, 10);
        const tableData = oRowBinding.getCurrentContexts().map(function (oContext) {
          return aCols.map(function (column) {
            const property = column.property[0];
            return oContext.getProperty(property);
          });
        });
        doc.autoTable({
          head: [
            aCols.map(function (column) {
              return column.label;
            }),
          ],
          body: tableData,
          margin: { top: 20, left: 10, right: 10, bottom: 10 },
          startY: 20,
          tableWidth: 'auto',
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [30, 144, 255],
          },
          columnStyles: {
            0: {
              cellWidth: 50,
              fillColor: [255, 255, 255],
              textColor: 0,
            },
          },
          columnWidth: 'auto',
        });
        doc.save(fileName);
      },
      onExportPDFHorizontal: function () {
        debugger;
        const selectedTab = this.getView()
          .getModel('localModel')
          .getProperty('/selectedIconTabBar');
        let oTable, aCols, fileName, title;
        switch (selectedTab) {
          case '0':
            oTable = this.getView().byId('idProductsTable');
            aCols = this.createColumnConfigTableProducts();
            fileName = 'ListaProductosEnStockHorizontal.pdf';
            title = 'Productos';
            break;
          case '1':
            oTable = this.getView().byId('listOfSuppliers');
            aCols = this.createColumnConfigTableSupplier();
            fileName = 'ListaProveedoresHorizontal.pdf';
            title = 'Proveedores';
            break;
          case '2':
            oTable = this.getView().byId('listOfUnitOfMeasurement');
            aCols = this.createColumnConfigTableUnitOfMeasurement();
            fileName = 'ListaUnidadMedidaHorizontal.pdf';
            title = 'Unidades de Medida';
            break;
          default:
            MessageBox.warning('No existen datos, no se puede crear el documento');
            return;
        }
        const oRowBinding = oTable.getBinding('items');
        if (!oRowBinding || !oRowBinding.getLength()) {
          MessageBox.warning('No existen datos, no se puede crear el documento');
          return;
        }
        try {
          let test1 = jQuery.sap.require('com/pe/proyectoIntegrador/lib/jsPDF/jspdf');
          let test = jQuery.sap.require('com/pe/proyectoIntegrador/lib/jsPDF/autotable');
        } catch (e) {}
        const doc = new jsPDF('l', 'pt');
        doc.setFontSize(18);
        doc.text(title, 14, 20);
        const tableData = oRowBinding.getCurrentContexts().map(function (oContext) {
          return aCols.map(function (column) {
            const property = column.property[0];
            return oContext.getProperty(property);
          });
        });
        doc.autoTable({
          head: [
            aCols.map(function (column) {
              return column.label;
            }),
          ],
          body: tableData,
          margin: { top: 60, left: 10, right: 10, bottom: 10 },
          startY: 60,
          tableWidth: 'auto',
          styles: { fontSize: 10 },
          headStyles: {
            valign: 'middle',
            fillColor: [30, 144, 255],
          },
          columnStyles: {
            0: {
              cellWidth: 50,
              fillColor: [255, 255, 255],
              fontStyle: 'bold',
              valign: 'middle',
              textColor: 0,
            },
          },
          columnWidth: 'auto',
        });
        doc.save(fileName);
      },
      // CSV
      onExportSpreadSheetCSV: function (oEvent) {
        debugger;
        const selectedTab = this.getView()
          .getModel('localModel')
          .getProperty('/selectedIconTabBar');
        // let fileName;
        switch (selectedTab) {
          case '0':
            if (this.getView().getModel('localModel').getProperty('/listOfProducts').length === 0) {
              MessageBox.warning('No existen datos, no se puede crear el documento');
              return;
            }
            // fileName = "ListaProductosEnStock.csv";
            var oExport = new Export({
              exportType: new ExportTypeCSV({
                separatorChar: ',',
              }),
              models: this.getView().getModel('localModel'),
              rows: {
                path: '/listOfProducts',
              },
              columns: [
                {
                  name: 'name',
                  template: {
                    content: '{name}',
                  },
                },
                {
                  name: 'description',
                  template: {
                    content: '{description}',
                  },
                },
                {
                  name: 'image',
                  template: {
                    content: '{image}',
                  },
                },
                {
                  name: 'salePrice',
                  template: {
                    content: '{salePrice}',
                  },
                },
                {
                  name: 'purchasePrice',
                  template: {
                    content: '{purchasePrice}',
                  },
                },
                {
                  name: 'stock',
                  template: {
                    content: '{stock}',
                  },
                },
                {
                  name: 'unitOfMeasurementName',
                  template: {
                    content: '{unitOfMeasurementName}',
                  },
                },
                {
                  name: 'supplierName',
                  template: {
                    content: '{supplierName}',
                  },
                },
                {
                  name: 'statusName',
                  template: {
                    content: '{statusName}',
                  },
                },
                {
                  name: 'datepicker',
                  template: {
                    content: '{datepicker}',
                  },
                },
              ],
            });
            break;
          case '1':
            var oExport = new Export({
              exportType: new ExportTypeCSV({
                separatorChar: ',',
              }),
              models: this.getView().getModel('localModel'),
              rows: {
                path: '/listOfSuppliers',
              },
              columns: [
                {
                  name: 'Nombre',
                  template: {
                    content: '{name}',
                  },
                },
                {
                  name: 'Telefono',
                  template: {
                    content: '{phone}',
                  },
                },
                {
                  name: 'Direccion',
                  template: {
                    content: '{address}',
                  },
                },
                {
                  name: 'Estado',
                  template: {
                    content: '{statusName}',
                  },
                },
              ],
            });
            break;
          case '2':
            var oExport = new Export({
              exportType: new ExportTypeCSV({
                separatorChar: ',',
              }),
              models: this.getView().getModel('localModel'),
              rows: {
                path: '/listOfUnitOfMeasurement',
              },
              columns: [
                {
                  name: 'Nombres',
                  template: {
                    content: '{name}',
                  },
                },
                {
                  name: 'Descripcion',
                  template: {
                    content: '{description}',
                  },
                },
                {
                  name: 'Abreviatura',
                  template: {
                    content: '{abbreviation}',
                  },
                },
                {
                  name: 'state',
                  template: {
                    content: '{statusName}',
                  },
                },
              ],
            });
            break;
          default:
            console.log('Invalid tab selected');
            return;
        }
        oExport
          .saveFile()
          .catch(function (oError) {
            MessageBox.error(
              `Error when downloading data. Browser might not be supported!\n\n${oError}`,
            );
          })
          .then(function () {
            oExport.destroy();
          });
      },
      onUpload: function (e) {
        debugger;
        this._import(e.getParameter('files') && e.getParameter('files')[0]);
      },
      _import: function (file) {
        let that = this;
        let excelData = [];
        if (file && window.FileReader) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, {
              type: 'binary',
            });
            workbook.SheetNames.forEach(function (sheetName) {
              excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            });
            let id = 1;
            let listOfProducts = [
              ...that.getView().getModel('localModel').getProperty('/listOfProducts'),
            ];
            const ids = listOfProducts.map((object) => {
              return object.id;
            });
            let idsOrdenada = ids.sort(function (a, b) {
              return b - a;
            });
            if (idsOrdenada.length > 0) {
              id = idsOrdenada[0] + 1;
            }
            excelData.forEach((element) => {
              let obj = { ...element };
              obj.id = id++;
              listOfProducts.push(obj);
            });
            that.getView().getModel('localModel').setProperty('/listOfProducts', listOfProducts);
            that.getView().getModel('localModel').refresh(true);
            sap.ui.require(['sap/m/MessageBox'], function (MessageBox) {
              MessageBox.show('Excel importado correctamente', {
                icon: MessageBox.Icon.SUCCESS,
                title: 'Éxito',
                onClose: function () {},
              });
            });
          };
          reader.onerror = function (ex) {
            console.log(ex);
          };
          reader.readAsBinaryString(file);
        }
      },

      // FILTRO ASCENDENTE Y DESCENTENTE
      onSortAscending: function () {
        let oTable = this.byId('idProductsTable');
        let oBinding = oTable.getBinding('items');
        let aSorters = [];
        aSorters.push(new sap.ui.model.Sorter('salePrice', false));
        oBinding.sort(aSorters);
      },
      onSortDescending: function () {
        let oTable = this.byId('idProductsTable');
        let oBinding = oTable.getBinding('items');
        let aSorters = [];
        aSorters.push(new sap.ui.model.Sorter('salePrice', true));
        oBinding.sort(aSorters);
      },
      // FILTRAR PRODUCTOS
      onSearch: function (oEvent) {
        const newValue = oEvent.getSource().getValue();
        this.filter(newValue);
      },
      createFilter: function (property, operator, value) {
        return new sap.ui.model.Filter(property, operator, value);
      },
      filter: function (value) {
        const selectedTabIndex = this.getView().getModel('localModel').getProperty('/tabSelect');
        const properties =
          selectedTabIndex === '0'
            ? [
                'name',
                'description',
                'salePrice',
                'purchasePrice',
                'stock',
                'unitOfMeasurement',
                'supplier',
                'statusName',
              ]
            : ['name', 'phone', 'address', 'statusName'];
        const filters = properties.map((prop) =>
          this.createFilter(prop, sap.ui.model.FilterOperator.Contains, value),
        );
        const allFilters = new sap.ui.model.Filter(filters, false);
        const oBinding =
          selectedTabIndex === '0'
            ? this.getView().byId('idProductsTable').getBinding('items')
            : this.getView().byId('listOfSuppliers').getBinding('items');
        oBinding.filter(allFilters);
      },
      //   AGREGAR PRODUCTO
      onAddProduct: function () {
        if (!this.oMPAddProduct) {
          this.oMPAddProduct = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.AddProduct',
          });
        }
        this.oMPAddProduct.then(
          function (oDialog) {
            this.oDialogProducto = oDialog;
            this.oDialogProducto.open();
          }.bind(this),
        );
      },
      closeDialogProducto: function () {
        this.oDialogProducto.close();
        this.onClearInputs();
      },
      onEditProduct: function () {
        if (!this.oMPEditProduct) {
          this.oMPEditProduct = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.EditProduct',
          });
        }
        this.oMPEditProduct.then(
          function (oDialog) {
            this.oDialogEditProduct = oDialog;
            this.oDialogEditProduct.open();
          }.bind(this),
        );
      },
      closeDialogProductoe: function () {
        // this.getView().getModel("localModel").setProperty("/search", "");
        // this.onLimpiarCamposDialogo();
        this.oDialogEditProduct.close();
        this.onClearInputs();
      },

      onClearInputs: function () {
        this.getView().getModel('localModel').setProperty('/addProduct', {
          name: '',
          description: '',
          salePrice: '',
          image: '',
          purchasePrice: '',
          stock: '',
          unitOfMeasurementName: '',
          supplierName: '',
          statusName: '',
          datepicker: '',
        });

        this.getView().getModel('localModel').setProperty('/selectSupplierName', '0');
        this.getView().getModel('localModel').setProperty('/selectUnitOfMeasurementName', '0');
        this.getView().getModel('localModel').setProperty('/selectStateName', '0');
        this.getView().getModel('localModel').setProperty('/addSupplierName', {
          name: '',
          phone: '',
          address: '',
          state: '',
        });
        this.getView().getModel('localModel').setProperty('/editProduct', {
          name: '',
          description: '',
          salePrice: '',
          image: '',
          purchasePrice: '',
          stock: '',
          unitOfMeasurementName: '',
          supplierName: '',
          statusName: '',
          datepicker: '',
        });
      },
      // ELIMINAR PRODUCTOS SELECTIONADOS
      onDeleteSelected: function () {
        debugger;
        const oTable = this.byId('idProductsTable');
        const aSelectedItems = oTable.getSelectedItems();
        const aSelectedProducts = [];
        const iNumSelectedProducts = aSelectedItems.length;
        aSelectedItems.forEach(function (oItem) {
          const oProduct = oItem.getBindingContext('localModel').getObject();
          aSelectedProducts.push(oProduct);
        });
        if (aSelectedProducts.length === 0) {
          MessageBox.warning('Seleccione uno o más productos para eliminar');
          return;
        }
        MessageBox.confirm(
          `¿Está seguro que desea eliminar  ${iNumSelectedProducts} productos seleccionados?`,
          {
            onClose: function (oAction) {
              debugger;
              if (oAction === MessageBox.Action.OK) {
                const oModel = this.getView().getModel('localModel');
                const aAllProducts = oModel.getProperty('/listOfProducts');
                const aProducts = aAllProducts.filter(
                  (product) => !aSelectedProducts.includes(product),
                );
                oModel.setProperty('/listOfProducts', aProducts);
                oModel.setProperty('/totalProducts', aProducts.length);
                //   oTable.removeSelections();
                oModel.updateBindings();
              }
            }.bind(this),
          },
        );
      },

      closeDialogRemoveProduct: function () {
        this.oDialogProductDeleted.close();
      },
      // ELIMINAR PRODUCTO
      onPressDeleteProduct: function () {
        debugger;
        const aSelectedProducts = this.getView()
          .byId('table')
          .getSelectedItems()
          .map((item) => item.getBindingContext('localModel').getObject());
        const aAllProducts = this.getView().getModel('localModel').getProperty('/listOfProducts');
        const aFinalProducts = aAllProducts.filter(
          (product) => !aSelectedProducts.includes(product),
        );

        this.getView().getModel('localModel').setProperty('/listOfProducts', aFinalProducts);
        this.getView().getModel('localModel').refresh(true);

        MessageBox.success('Productos eliminados');
        this.closeDialogRemoveProduct();
      },
      onConfirmDeletionProduct: function (oEvent) {
        const oButton = oEvent.getSource(),
          oView = this.getView();
        const oProduct = oButton.getParent().getBindingContext('localModel');
        const oSelectObj = oProduct.getObject();
        this.getView().getModel('localModel').setProperty('/selectRowDelete', oSelectObj);
        if (!this.oMPProductRemoved) {
          this.oMPProductRemoved = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.DeleteProduct',
          });
        }
        this.oMPProductRemoved.then(
          function (oDialogProductDeleted) {
            this.oDialogProductDeleted = oDialogProductDeleted;
            this.oDialogProductDeleted.open();
          }.bind(this),
        );
      },
      onPressDeleteProduct: function () {
        let selectRowDelete = this.getView().getModel('localModel').getProperty('/selectRowDelete');
        let listOfProducts = this.getView().getModel('localModel').getProperty('/listOfProducts');
        let finalProducts = [];
        for (let index = 0; index < listOfProducts.length; index++) {
          const element = listOfProducts[index];
          if (element.id != selectRowDelete.id) {
            finalProducts.push(element);
          }
        }
        this.getView().getModel('localModel').setProperty('/listOfProducts', finalProducts);
        this.getView().getModel('localModel').refresh(true);
        MessageBox.success('Producto Eliminado');
        this.closeDialogRemoveProduct();
      },
      // AGREGAR UN PRODUCTO EN LA LISTA
      onAddProductTable: function () {
        const {
          name,
          description,
          image,
          salePrice,
          purchasePrice,
          stock,
          unitOfMeasurementName,
          supplierName,
          statusName,
          datepicker,
        } = this.getView().getModel('localModel').getProperty('/addProduct');
        if (!name || !description || !image || !stock || !salePrice || !purchasePrice) {
          MessageBox.warning('Es necesario saber el Nombre, Descripcion y la imagen del Producto');
          return;
        }
        const { selectStateName, selectUnitOfMeasurementName, selectSupplierName } = this.getView()
          .getModel('localModel')
          .getData();
        let id = 1;
        let listaOrdenada = this.getView()
          .getModel('localModel')
          .getProperty('/listOfProducts')
          .sort(function (a, b) {
            return b.id - a.id;
          });
        if (listaOrdenada.length > 0) {
          id = listaOrdenada[0].id + 1;
        }
        let oProducto = {
          id: id,
          name: name,
          description: description,
          image: image,
          salePrice: salePrice,
          purchasePrice: purchasePrice,
          stock: stock,
          unitOfMeasurementName: this.getView()
            .byId('idUnit')
            .getSelectedItem()
            .getProperty('text'),
          supplierName: this.getView().byId('idSupplier').getSelectedItem().getProperty('text'),
          statusName: this.getView().byId('idStatus').getSelectedItem().getProperty('text'),
          idUnitOfmeasurment: selectUnitOfMeasurementName,
          idSupplier: selectSupplierName,
          idStatus: selectStateName,
          datepicker: datepicker,
        };
        let listOfProducts = this.getView().getModel('localModel').getProperty('/listOfProducts');
        listOfProducts.push(oProducto);
        this.getView().getModel('localModel').refresh(true);
        MessageBox.success('Producto guardado');
        this.closeDialogProducto();
      },

      // DEBUGGER
      onPressEditTabla: function () {
        debugger;
        // let id = this.getView().getModel("localModel").getProperty("/editProduct").id;
        const {
          id,
          name: nameProduct,
          description: descriptionProduct,
          image: imageProduct,
          salePrice,
          purchasePrice,
          stock,
          unitOfMeasurementName,
          supplierName,
          statusName,
          datepicker,
        } = this.getView().getModel('localModel').getProperty('/editProduct');
        const { selectStateName, selectUnitOfMeasurementName, selectSupplierName } = this.getView()
          .getModel('localModel')
          .getData();
        let oSearchUnit = this.getView()
          .getModel('localModel')
          .getProperty('/ListunitOfMeasurementName')
          .filter(function (item, index) {
            return item.id == selectUnitOfMeasurementName;
          });
        let oSearchSupplierName = this.getView()
          .getModel('localModel')
          .getProperty('/listSupplierName')
          .filter(function (item, index) {
            return item.id == selectSupplierName;
          });
        let oSearchStatusName = this.getView()
          .getModel('localModel')
          .getProperty('/activo')
          .filter(function (item, index) {
            return item.id == selectStateName;
          });
        let oProducto1 = {
          id: id,
          name: nameProduct,
          description: descriptionProduct,
          image: imageProduct,
          salePrice: salePrice,
          purchasePrice: purchasePrice,
          stock: stock,
          unitOfMeasurementName: oSearchUnit[0].name,
          supplierName: oSearchSupplierName[0].name,
          statusName: oSearchStatusName[0].name,
          idUnitOfmeasurment: selectUnitOfMeasurementName,
          idsupplierName: selectSupplierName,
          idstatusName: selectStateName,
          datepicker: datepicker,
        };
        let oResp = {
          valid: false,
          mensaje: '',
        };
        if (
          nameProduct.trim().length == 0 ||
          descriptionProduct.trim().length == 0 ||
          salePrice <= 0 ||
          purchasePrice <= 0 ||
          stock <= 0 ||
          this.getView().getModel('localModel').getProperty('/selectStateName') == '0' ||
          this.getView().getModel('localModel').getProperty('/selectSupplierName') == '0' ||
          this.getView().getModel('localModel').getProperty('/selectUnitOfMeasurementName') == '0'
        ) {
          oRespuesta2.valid = false;
          oRespuesta2.mensaje = 'llena los campos';
          if (
            nameProd.trim().length == 0 ||
            descProd.trim().length == 0 ||
            pvProd <= 0 ||
            pcProd <= 0 ||
            sProd <= 0 ||
            this.getView().getModel('localModel').getProperty('/selectActivo') == '0' ||
            this.getView().getModel('localModel').getProperty('/selectProveedor') == '0' ||
            this.getView().getModel('localModel').getProperty('/selectUnidadMedida') == '0'
          ) {
            MessageBox.warning('Todos los campos son necesarios');
          }
          return oRespuesta;
        }
        let listOfProducts = this.getView().getModel('localModel').getProperty('/listOfProducts');
        let finalProducts = [];
        for (let index = 0; index < listOfProducts.length; index++) {
          const element = listOfProducts[index];
          if (element.id == oProducto1.id) {
            finalProducts.push(oProducto1);
          } else {
            finalProducts.push(element);
          }
        }
        this.getView().getModel('localModel').setProperty('/listOfProducts', finalProducts);
        this.getView().getModel('localModel').refresh(true);
        MessageBox.success('Producto actualizado');
        this.closeDialogProducto();
      },
      onPressEdit: function (oEvent) {
        let oButton = oEvent.getSource(),
          oView = this.getView();
        debugger;
        let oProduct2 = oButton.getParent().getBindingContext('localModel');
        debugger;
        let oSelectObj = oProduct2.getObject();
        debugger;
        this.getView()
          .getModel('localModel')
          .setProperty('/selectUnitOfMeasurementName', oSelectObj.idUnitOfmeasurment);
        this.getView()
          .getModel('localModel')
          .setProperty('/selectSupplierName', oSelectObj.idSupplier);
        this.getView().getModel('localModel').setProperty('/selectStateName', oSelectObj.idStatus);
        this.getView().getModel('localModel').setProperty('/editProduct', oSelectObj);
        this.onEditProduct();
      },
      // VALIDACIONES DE INPUTS TEXT
      onInputChange: function (oEvent) {
        const oInput = oEvent.getSource();
        let sValue = oInput.getValue().trim();
        const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
        if (!regex.test(sValue)) {
          setValueState('Error');
          sValue = sValue.replace(/[^\sa-zA-Z]/g, '');
          oInput.setValue(sValue);
        } else {
          oInput.setValueState('None');
        }
      },
      // VALIDACIONES DE INPUTS NUMBER
      onNumberInput: function (oEvent) {
        const oInput = oEvent.getSource();
        const sValue = oInput.getValue();
        debugger;
        const edadPattern = /[^0-9]/;
        if (edadPattern.test(sValue)) {
          oInput.setValue(sValue.replace(/[^0-9]/g, ''));
        } else {
          oInput.setValueState('None');
        }
      },
      // VALIDACION DE IMAGEN
      onImageChange: function (oEvent) {
        const oInput = oEvent.getSource();
        const sValue = oInput.getValue();
        const extension = sValue.split('.').pop();
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (allowedExtensions.indexOf(extension.toLowerCase()) === -1) {
          oInput.setValue('');
          oInput.setValueState('Error');
          oInput.setValueStateText(
            'La imagen debe tener una extensión válida (jpg, jpeg, png, gif).',
          );
        } else {
          oInput.setValueState('None');
        }
      },
      //   AGREGAR PROVEEDOR
      onAddSupplierName: function () {
        debugger;
        if (!this.oMPAddSuplierName) {
          this.oMPAddSuplierName = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.AddSupplierName',
          });
        }
        this.oMPAddSuplierName.then(
          function (oDialog) {
            this.oDialogSupplierName = oDialog;
            this.oDialogSupplierName.open();
          }.bind(this),
        );
      },
      closeDialogAddSupplierName: function () {
        this.oDialogSupplierName.close();
        this.onClearInputs();
      },
      // EDITAR PROVEEDOR
      onEditSupplierName: function () {
        if (!this.oMPEditSupplierName) {
          this.oMPEditSupplierName = this.loadFragment({
            name: 'com.pe.proyectoIntegrador.view.fragment.EditSupplierName',
          });
        }
        this.oMPEditSupplierName.then(
          function (oDialog) {
            this.oDialogEditSupplierName = oDialog;
            this.oDialogEditSupplierName.open();
          }.bind(this),
        );
      },
      closeDialogEditSupplierName: function () {
        this.oDialogEditSupplierName.close();
        this.onClearInputs();
      },
      //    AGREGAR PROVEEDOR EN LA TABLA
      onAddSupplierNameTable: function () {
        debugger;
        const { name, phone, address, state } =
          this.getView('localModel').getProperty('/editSupplierName');
        // const name = this.getView().getModel("localModel").getProperty("/addSupplierName").name;
        // const phone = this.getView().getModel("localModel").getProperty("/addSupplierName").phone;
        // const address = this.getView().getModel("localModel").getProperty("/addSuplierName").address;
        // const state = this.getView().getModel("localModel").getProperty("/addSuplierName").state;
        const oProveedor = {
          id: this.getView().getModel('localModel').getProperty('/listOfSuppliers').length + 1,
          name: name,
          phone: phone,
          address: address,
          state: this.getView().byId('idStatus').getSelectedItem().getProperty('text'),
        };
        const oRespuesta2 = {
          valid: true,
          mensaje: '',
        };
        if (
          name.trim().length == 0 ||
          dir.trim().length == 0 ||
          tel <= 0 ||
          this.getView().getModel('localModel').getProperty('/selectActivo') == '0'
        ) {
          oRespuesta2.valid = false;
          oRespuesta2.mensaje = 'llena los campos';
          MessageBox.warning(
            'Todos los campos son obligatorios y no se pueden ingresar números menores o iguales a 0',
          );
          return oRespuesta2;
        }
        const listOfSuppliers = this.getView()
          .getModel('localModel')
          .getProperty('/listOfSuppliers');
        listOfSuppliers.push(oProveedor);
        MessageBox.success('Datos ingresados correctamente');
        this.loadSupplierPost();
        this.getView().getModel('localModel').refresh(true);
        this.closeDialogProveedor();
      },
    });
  },
);
