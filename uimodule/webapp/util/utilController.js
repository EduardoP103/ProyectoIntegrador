sap.ui.define([
    'sap/m/MessageBox',
    "./utilController",
    "sap/ui/export/Spreadsheet"
   ],function(MessageBox, utilController, Spreadsheet){
       "use strict";
       return {
        exportSpreadSheetXLSX: function (oTable,aCols,fileName) {
            //var aCols, oRowBinding, oSettings, oSheet, oTable;
            let oSettings;
            let oSheet;
                debugger
            //return
            //oTable = this.getView().byId("idProductsTable1");
            let oRowBinding = oTable.getBinding("items");
            //aCols = this.createColumnConfigTableProducts();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: "Level",
                },
                dataSource: oRowBinding,
                fileName: fileName,
                worker: false, // We need to disable worker because we are using a MockServer as OData Service
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },
        
       };
   });