'use strict';

angular.module('fixtApp')
  .directive('fixtSearchListHeading', function (handlerLoader, constantLoader, commonUtility) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            showRecordCount: "=",
            enableAdd: "=",
            singleTagDelete: "&",
            clearAllTags: "&"
        },
        template: function(){
            
            var html =  '<div>' +
                            '<div class="srchRsltHeader">' +
                                '<div class="srchRslTitl">Search Result:</div>' +
                                '<div class="tagContainer">' +
                                    '<div class="srchTagBox" ng-repeat="tag in tagList">' +
                                        '<span class="srchtagItem">{{tag}}</span>' +
                                        '<div class="tagClosr">' +
                                            '<span class="pointer" ng-click="onTagClick(tag)">' +
                                                '<img src="styles/images/icn-close-gray.png" width="14" height="14" alt=""/>' +
                                            '</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="tagClear pointer" ng-hide="isClearTagHide">' +
                                        '<span ng-click="onClearTagsClick()">Clear tags</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sBxbox1-2">' +
                                '<div class="addSearch pointer" ng-class="{\'active\':enableAdd}">' +
                                    '<span class="addSearchItem">Add to Sandbox</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="srchDisply">Displaying {{showRecordCount}} of ' +
                                '{{\'SEARCH_LIST_TOT_COUNT\' | fixtRootScope : true}} Results</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            
            scope.isClearTagHide = false;
            
            function initialized(){
                scope.tagList = handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false);
                if(commonUtility.isDefinedObject(
                    handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false))){
                    setClearTagVisibility();
                }
            }
            
            function setClearTagVisibility(){
                scope.isClearTagHide = 
                    !(handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, 
                        false).length > 0);
            }
            
            scope.onClearTagsClick = function(){
                var tags = [];
                if(commonUtility.isDefinedObject(
                    handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false))){
                    tags = handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false);
                    for(var index=tags.length-1; index>=0; index--){
                        tags.splice(tags.indexOf(tags[index]), 1);
                    }
                    setClearTagVisibility();
                    scope.clearAllTags();
                }
            };
            
            scope.onTagClick = function(tag){
                var tags = [];
                if(commonUtility.isDefinedObject(
                    handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false))){
                    tags = handlerLoader.sessionHandler.get(constantLoader.sessionItems.FILTER_TAGS, false);
                    tags.splice(tags.indexOf(tag), 1);
                }
                handlerLoader.sessionHandler.set(constantLoader.sessionItems.FILTER_TAGS, tags, false);
                setClearTagVisibility();
                scope.singleTagDelete();
            };
            
            initialized();
        }
    };
  });
