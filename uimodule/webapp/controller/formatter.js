/* global moment:true */
jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([
	"sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
	"use strict";
	return {
		
        weightState :  function (fValue) {
            debugger
			try {
				fValue = parseFloat(fValue);
				if (fValue < 0) {
					return "None";
				} else if (fValue < 1000) {
					return "Success";
				} else if (fValue < 2000) {
					return "Warning";
				} else {
					return "Error";
				}
			} catch (err) {
				return "None";
			}
		}
 


	};
});