'use strict';

angular.module('fixtApp')
  .directive('fixtSearchbox', function (constantLoader, commonUtility, handlerLoader) {
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
                                        '<div class="elementfx">' +
                                            '<fixt-editable item="label"></fixt-editable>' +
                                        '</div>' +
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
            
            scope.onSearchClick = function(){
                handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TYPE, searchTypeItem.searchType);
                if(!commonUtility.is3DValidKey(scope.ngModel)){
                    setErrorPlace(true, constantLoader.messages.SEARCH_NOT_VALID);
                    return false;
                }
                if(!commonUtility.filterInArray(scope.items, {"value": scope.label}).length>0){
                    setErrorPlace(true, constantLoader.messages.SEARCH_ITEM_NOT_VALID);
                    return false;
                }
                
                if(!constantLoader.validationPatterns[searchTypeItem.pattern].test(scope.ngModel) || scope.ngModel.length > searchTypeItem.maxLength){
                    setErrorPlace(true, constantLoader.messages.SEARCH_ERROR_MSG + scope.label);
                    return false;
                }
                /* will be deleted - start */
                if(searchTypeItem.searchType !== "id" && searchTypeItem.searchType !== "name" && searchTypeItem.searchType !== "date") {
                    setErrorPlace(true, "Not Implemented!");
                    return false;
                }
                /* will be deleted - end */
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
