sap.ui.define([
    'sap/m/MessageBox',
    "./utilController",
   ],function(MessageBox, utilController){
       "use strict";
       return {
           console: function (msg) {
           },
           messageBox: function (msg, icon, title) {
               MessageBox.show(msg, {
                   icon: MessageBox.Icon[icon],
                   title: title,
                   actions: [MessageBox.Action.OK],
                   emphasizedAction: MessageBox.Action.OK
               });
           }
       };
   });
