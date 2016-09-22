'use strict';

angular.module('fixtApp')
  .directive('fixtSearchListHeading', function (handlerLoader, constantLoader, commonUtility) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            showRecordCount: "=",
            totalRecCount: "=",
            enableAdd: "=",
            singleTagDelete: "&",
            clearAllTags: "&",
            closeSummary: "&",
            addToSandbox: "&",
            filterTags: "="
        },
        template: function(){
            
            var html =  '<div>' +
                            '<div class="sBxbox1-2 sBxbox1-3">' +
                                '<span class="closer-list pointer" ng-click="onCloseClick()">' +
                                    '<img src="styles/images/btn-close-sml.png" ' +
                                        'width="12" height="10" alt=""/>' +
                                '</span>' +
                            '</div>' +
                            '<div class="srchRsltHeader">' +
                                '<div class="srchRslTitl">Search Result:</div>' +
                                '<div class="tagContainer">' +
                                    '<div class="srchTagBox" ng-repeat="tag in filterTags">' +
                                        '<span class="srchtagItem">{{tag}}</span>' +
                                        '<div class="tagClosr">' +
                                            '<span class="pointer" ng-click="onTagClick(tag)" ng-hide="$index===0">' +
                                                '<img src="styles/images/icn-close-gray.png" width="14" height="14" alt=""/>' +
                                            '</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="tagClear pointer" ng-show="filterTags.length>1">' +
                                        '<span ng-click="onClearTagsClick()">Clear tags</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sBxbox1-2 sBxbox1-3">' +
                                '<div class="addSearch pointer" ng-class="{\'active\':enableAdd}">' +
                                    '<span class="addSearchItem" ng-click="onAddClick()">Add to Sandbox</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="srchDisply">Displaying {{showRecordCount}} of ' +
                                '{{totalRecCount}} Results</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            
            scope.isClearTagHide = false;
            
            scope.onClearTagsClick = function(){
                    scope.clearAllTags();
            };
            
            scope.onTagClick = function(filter){
                scope.singleTagDelete({tag: filter});
            };
            
            scope.onAddClick = function(){
                scope.addToSandbox();
            };
            
            scope.onCloseClick = function(){
                scope.closeSummary();
            };
        }
    };
  });
