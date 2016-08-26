'use strict';

angular.module('fixtApp')
  .factory('modalHandler', function (ngDialog) {
    
    var modalDialog = {};

        modalDialog.showMsg = function(message){
        
            ngDialog.open({
                template: '<p>' + message + '</p>' +
                        '<div class="ngdialog-buttons"> <button type="button" ' +
                        'class="ngdialog-button ngdialog-button-secondary" ' +
                        'ng-click="closeThisDialog(0)">OK</button></div>',
                plain: true,
                closeByDocument: false
            });
        };
        
        return modalDialog;
  });
