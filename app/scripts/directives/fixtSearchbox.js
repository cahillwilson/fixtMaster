'use strict';

angular.module('fixtApp')
  .directive('fixtSearchbox', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            label: "=",
            items: "=",
            labelBinding: "@",
            modelBinding: "@",
            selectionChanged: "&",
            searchClick: "&"
        },
        template: function(element, attrs){
            
            var html =  '<div class="col-xs-6 col-xs">' +
                            '<div class="input-group">' +
                                '<div class="input-group-btn search-panel">' +
                                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
                                        '<div class="elementfx">{{label}}   </div>' +
                                        '<span>' +
                                            '<img src="styles/images/dropdwn-arrow.png" width="18" height="10" alt=""/>' +
                                        '</span>' +
                                    '</button>' +
                                    '<ul class="dropdown-menu search-menu">' +
                                        '<li ng-repeat="item in items" value="item.' + attrs.modelBinding + '" ' +
                                            'ng-click="onOptionClick(item)">{{item.' + attrs.labelBinding + '}}</li>' +
                                    '</ul>' +
                                '</div>' +
                                '<input type="text" id="searchIcon" class="form-control" name="x" placeholder="Search ">' +
                                '<span class="input-group-btn">' + 
                                    '<button class="btnSerch" ng-click="onSearchClick()" type="button"></button>' + 
                                '</span>' +
                            '</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            scope.onOptionClick = function(item){
                scope.selectionChanged({
                    item: item
                });
            };
            
            scope.onSearchClick = function(){
                scope.searchClick();
            };
        }
    };
  });
