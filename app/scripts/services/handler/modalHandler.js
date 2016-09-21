'use strict';

angular.module('fixtApp')
  .factory('modalHandler', function (ngDialog, constantLoader) {
    
    var modalDialog = {};

        modalDialog.showMsg = function(heading, message){
            ngDialog.open({
                template:   '<div class="popContinr">' +
                                '<div class="popBox">' +
                                '<div class="popTitle">' + heading + '</div>' +
                                    '<div class="popBxContRit pointer" ng-click="closeThisDialog(0)">' +
                                        '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                    '</div>' +
                                    '<div class="popDtls">' + message + '</div >' +
                                    '<div class="popboxFooter">' +
                                    '<div class="popFooterLft"></div>' +
                                    '<div class="popFooterRit pointer" ng-click="closeThisDialog(0)">' +
                                        '<span class="button active">OK</span>' + 
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                plain: true,
                closeByDocument: false
            });
        };
        modalDialog.showConfirm = function(heading, message){
            var nestedConfirmDialog = ngDialog.openConfirm({
                template:   '<div class="popContinr">' +
                                '<div class="popBox">' +
                                '<div class="popTitle">' + heading + '</div>' +
                                    '<div class="popBxContRit pointer" ng-click="closeThisDialog(0)">' +
                                        '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                    '</div>' +
                                    '<div class="popDtls">' + message + '</div >' +
                                    '<div class="popboxFooter">' +
                                    '<div class="popFooterLft pointer" ng-click="closeThisDialog(0)">' + 
                                        constantLoader.defaultValues.CONFIRM_BOX_NO + '</div>' +
                                    '<div class="popFooterRit pointer" ng-click="confirm(1)">' +
                                        '<span class="button active">' + 
                                            constantLoader.defaultValues.CONFIRM_BOX_YES + '</span>' + 
                                    '</div>' +
                                '</div>' +
                            '</div>' +
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
