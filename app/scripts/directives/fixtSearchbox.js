'use strict';

angular.module('fixtApp')
  .directive('fixtSearchbox', function (constantLoader, commonUtility) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            label: "=",
            items: "=",
            labelBinding: "@",
            modelBinding: "@",
            ngModel: "=",
            selectionChanged: "&",
            searchClick: "&"
        },
        template: function(element, attrs){
            
            var html =  '<div class="col-xs-6 col-xs search-body-height">' +
                            '<div class="input-group">' +
                                '<div class="input-group-btn search-panel">' +
                                    '<div class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
                                        '<div contenteditable ng-show="!isShowOnly" ng-model="label" class="elementfx">{{label}}</div>' +
                                        '<div ng-show="isShowOnly" ng-click="onShowOnlyClick()" class="elementfx">{{label}}</div>' +
                                        '<span>' +
                                            '<img src="styles/images/dropdwn-arrow.png" width="18" height="10" alt=""/>' +
                                        '</span>' +
                                    '</div>' +
                                    '<ul class="dropdown-menu search-menu">' +
                                        '<li ng-repeat="item in items" value="item.' + attrs.modelBinding + '" ' +
                                            'ng-click="onOptionClick(item)">{{item.' + attrs.labelBinding + '}}</li>' +
                                    '</ul>' +
                                '</div>' +
                                '<input type="text" id="searchIcon" ng-model="ngModel" ' +
                                    'class="form-control" name="x" placeholder="Search">' +
                                '<span class="input-group-btn">' + 
                                    '<button class="btnSerch" ng-click="onSearchClick()" type="button"></button>' + 
                                '</span>' +
                            '</div>' +
                            '<div class="search-error" ng-show="isErrorShow">{{errMsg}}</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            
            scope.isShowOnly = true;
            var searchTypeItem = {};
            setErrorPlace(false, constantLoader.defaultValues.BLANK_STRING);
            
            scope.onOptionClick = function(item){
                scope.isShowOnly = true;
                scope.label = item.value;
                searchTypeItem = item;
                setErrorPlace(false, constantLoader.defaultValues.BLANK_STRING);
                scope.selectionChanged({
                    item: item
                });
            };
            
            scope.onShowOnlyClick = function(){
                scope.isShowOnly = false;
            };
            
            scope.onSearchClick = function(){
                if(!commonUtility.is3DValidKey(scope.ngModel)){
                    setErrorPlace(true, constantLoader.messages.SEARCH_NOT_VALID);
                    return false;
                }
                if(!commonUtility.filterInArray(scope.items, {"value": scope.label}).length>0){
                    setErrorPlace(true, constantLoader.messages.SEARCH_ITEM_NOT_VALID);
                    return false;
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 0) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[0].id)){
                    if(!constantLoader.validationPatterns.SEARCH_CUSTOMER.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_CUSTOMER);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 1) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[1].id)){
                    if(!constantLoader.validationPatterns.SEARCH_MCN.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_MCN);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 2) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[2].id)){
                    if(!constantLoader.validationPatterns.SEARCH_VENDOR.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_VENDOR);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 3) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[3].id)){
                    if(!constantLoader.validationPatterns.SEARCH_CSS.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_CSS);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 4) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[4].id)){
                    if(!constantLoader.validationPatterns.SEARCH_VALIDATION_FOREIGN_ACCOUNT.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_FOREIGN_ACCOUNT);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 5) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[5].id)){
                    if(!constantLoader.validationPatterns.SEARCH_CONTRACT.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_CONTRACT);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 6) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[6].id)){
                    if(!constantLoader.validationPatterns.SEARCH_ADDRESS.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_ADDRESS);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 7) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[7].id)){
                    if(!constantLoader.validationPatterns.SEARCH_INVENTORY.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_INVENTORY);
                        return false;
                    }
                }
                if((constantLoader.defaultObjects.SEARCH_LIST.length > 8) &&
                    (searchTypeItem.id === constantLoader.defaultObjects.SEARCH_LIST[8].id)){
                    if(!constantLoader.validationPatterns.SEARCH_ACCOUNT.test(scope.ngModel)){
                        setErrorPlace(true, constantLoader.messages.SEARCH_VALIDATION_ACCOUNT);
                        return false;
                    }
                }
                scope.searchClick();
            };
            
            var previouslySelectedItem = constantLoader.defaultValues.BLANK_STRING;
            scope.$watch("ngModel", function (newValue) {

                if (newValue !== previouslySelectedItem && angular.isDefined(newValue)) {

                    setErrorPlace(false, constantLoader.defaultValues.BLANK_STRING);
                    previouslySelectedItem = newValue;
                }
            });
            
            function setErrorPlace(isShow, msg){
                scope.isErrorShow = isShow;
                scope.errMsg = msg;
            }
        }
    };
  });
