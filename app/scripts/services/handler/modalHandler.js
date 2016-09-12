'use strict';

angular.module('fixtApp')
  .factory('modalHandler', function (ngDialog, constantLoader) {
    
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
        modalDialog.showConfirm = function(heading, message){
            var nestedConfirmDialog = ngDialog.openConfirm({
                template:   '<h3>' + heading + '</h3>' +
                            '<p>' + message + '</p>' +
                            '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ' +
                                    ' ng-click="confirm(1)">' + 
                                    constantLoader.defaultValues.CONFIRM_BOX_YES + '</button>' +
                                '<button type="button" class="ngdialog-button ngdialog-button-secondary" ' +
                                    'ng-click="closeThisDialog(0)">' + 
                                    constantLoader.defaultValues.CONFIRM_BOX_NO + '</button>' +
                            '</div>',
                plain: true,
                closeByDocument: false
            });
            return nestedConfirmDialog;
        };
        
        modalDialog.showMediumHTML = function(HTMLLink){
            ngDialog.open({ 
                template: HTMLLink ,
                className: 'ngdialog-theme-medium ngdialog-overlay',
                overlay: false
            });
        };
        
        modalDialog.closeHTML = function(HTMLLink){
            ngDialog.close({ template: HTMLLink });        
        };
        
        return modalDialog;
  });
