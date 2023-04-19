sap.ui.define([
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/export/Spreadsheet',
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
], function(MessageBox,MessageToast,Spreadsheet,Export, ExportTypeCSV) {
	"use strict";
	return {
        initModelView: function (controller) {
			controller.getView().setModel(new JSONModel({}));
		},
		i18n: function (name) {
            var source = dataPass.viewDetail.getView().getModel('i18n').getResourceBundle();
            return source.getText(name);
        },
		exportSpreadSheetXLSX: function (aCols, oSettings, oTable,fileName) {
			var oSheet;
			const oRowBinding = oTable.getBinding("items");
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
		}
	};
});
