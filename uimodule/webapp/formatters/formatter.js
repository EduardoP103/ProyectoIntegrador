sap.ui.define([], function () {
    "use strict";
    return {
        statusText: function (fValue) {
            debugger;
            try {
                fValue = parseFloat(fValue);
                if (fValue < 0) {
                    return "Error";
                } else if (0 < fValue && fValue < 5) {
                    return "Warning";
                } else if (5 < fValue) {
                    return "Success";
                }
            } catch (err) {
                return "None";
            }
        },
    };
});
