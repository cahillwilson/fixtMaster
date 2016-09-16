'use strict';

angular.module('fixtApp')
  .directive('fixtSearchListPagination', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            totalRecord: "@"
        },
        template: function(){
            
            var html =  '<div class="srchInFooter">' +
                            '<ul class="srchInFooter">' +
                                '<li class="Pgnsn1 pointer" ng-click="onLeftClick()">' +
                                    '<span ng-if="activePage>1">' +
                                        '<img ng-src="styles/images/arrow_blu-lft.png" width="5" height="8" alt=""/>' +
                                    '</span>' +
                                    '<span ng-if="activePage===1">' +
                                        '<img ng-src="styles/images/arrow_gry-lft.png" width="5" height="8" alt=""/>' +
                                    '</span>' +
                                '</li>' +
                                '<li class="Pgnsn pointer" ng-repeat="page in [] | fixtRange: pageCount | ' +
                                    'limitTo: 2" ng-class="{\'pg-acton\':activePage==={{page}}}" ng-click="onPageClick(page)">' +
                                    '{{page}}' +
                                '</li>' +
                                '<li class="Pgnsn1" ng-if="((pageCount>10) && activePage>8)">...</li>' +
                                '<li class="Pgnsn pointer" ng-repeat="page in [] | fixtRange: pageCount-2 | ' +
                                    'limitTo: ((activePage<9)?((pageCount>7)?8:pageCount):activePage) | limitTo: -6" ng-class="{\'pg-acton\':activePage==={{page}}}" ' +
                                    'ng-click="onPageClick(page)">' +
                                    '{{page}}' +
                                '</li>' +
                                '<li class="Pgnsn1" ng-if="((pageCount>10) && activePage<(pageCount - 2))">...</li>' +
                                '<li class="Pgnsn pointer" ng-if="(pageCount)>10" ' +
                                    'ng-repeat="page in [] | fixtRange: pageCount | ' +
                                    'limitTo: -2" ng-class="{\'pg-acton\':activePage==={{page}}}" ' +
                                    ' ng-click="onPageClick(page)">' +
                                    '{{page}}' +
                                '</li>' +
                                '<li class="Pgnsn1 pointer" ng-click="onRightClick()">' +
                                    '<span ng-if="activePage<pageCount">' +
                                        '<img ng-src="styles/images/arrow_blu-rt.png" width="5" height="8" alt=""/>' +
                                    '</span>' +
                                    '<span ng-if="activePage===pageCount">' +
                                        '<img ng-src="styles/images/arrow_gry-rt.png" width="5" height="8" alt=""/>' +
                                    '</span>' +
                                '</li>' +
                            '</ul>' +
                            '<div class="srchInFtrBox cmnFrteen">' +
                                'Items per page' +
                                '<div class="dropdown srchPrPg">' +
                                    '<div data-toggle="dropdown" class="dropdown-toggle pointer">' +
                                        '<span class="srchPrPgitm">{{itemCount}} Per page</span> ' +
                                        '<span>' +
                                            '<img src="styles/images/dropdwn-arrow.png" width="18" height="10" alt=""/>' +
                                        '</span>' +
                                    '</div>' +
                                    '<ul class="dropdown-menu search-menu">' +
                                        '<li ng-repeat="item in perPageItems" ' +
                                            'ng-click="onPagePerItemClick(item)">{{item}} Per page</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            scope.activePage = 1;
            scope.itemCount = 10;
            scope.perPageItems = [10, 20, 30];
            scope.pageCount = (scope.totalRecord / scope.itemCount) + 
                ((scope.totalRecord % scope.itemCount) > 0 ? 1 : 0);
            
            scope.onPageClick = function(page){
                scope.activePage = Number(page);
            };
            
            scope.onLeftClick = function(){
                if(scope.activePage>1){
                    scope.activePage = scope.activePage - 1;
                }
            };
            
            scope.onRightClick = function(){
                if(scope.activePage<scope.pageCount){
                    scope.activePage = scope.activePage + 1;
                }
            };
            
            scope.onPagePerItemClick = function(item){
                scope.itemCount = item;
                scope.pageCount = (scope.totalRecord / scope.itemCount) + 
                    ((scope.totalRecord % scope.itemCount) > 0 ? 1 : 0);
            };
        }
    };
  });
