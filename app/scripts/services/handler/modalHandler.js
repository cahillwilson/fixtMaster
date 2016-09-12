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
        modalDialog.showConfirm = function(message, positiveText, negativeText){
            
            positiveText = (angular.isDefined(positiveText) &&
                    positiveText !== constantLoader.defaultValues.BLANK_STRING && positiveText !== null) ?
                    positiveText : constantLoader.defaultValues.CONFIRM_BOX_YES;
            negativeText = (angular.isDefined(negativeText) &&
                    negativeText !== constantLoader.defaultValues.BLANK_STRING && negativeText !== null) ?
                    negativeText : constantLoader.defaultValues.CONFIRM_BOX_NO;
            
            var nestedConfirmDialog = ngDialog.openConfirm({
                template:   '<p>' + message + '</p>' +
                            '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ' +
                                    ' ng-click="confirm(1)">' + positiveText + '</button>' +
                                '<button type="button" class="ngdialog-button ngdialog-button-secondary" ' +
                                    'ng-click="closeThisDialog(0)">' + negativeText + '</button>' +
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
