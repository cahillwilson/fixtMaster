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
                                '<div class="srchPrPg">' +
                                    '<div class="dropdown">' +
                                        '<span class="srchPrPgitm">10 Per page</span> ' +
                                        '<span>' +
                                            '<img src="styles/images/dropdwn-arrow.png" width="18" height="10" alt=""/>' +
                                        '</span>' +
                                        '<ul class="dropdown-menu perpage pull-left">' +
                                            '<li>20 Per page</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            scope.activePage = 1;
            scope.pageCount = (scope.totalRecord / 10) + ((scope.totalRecord%10) > 0 ? 1 : 0);
            
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
        }
    };
  });
