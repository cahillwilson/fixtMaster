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
                                '<li class="Pgnsn">' +
                                    '<img src="styles/images/arrow_gry-lft.png" width="5" height="8" alt=""/>' +
                                '</li>' +
                                '<li class="Pgnsn" ng-repeat="page in [] | fixtRange: totalRecord/10 | limitTo: 8">{{page}}</li>' +
                                '<li class="Pgnsn" ng-if="(totalRecord/10)>10">...</li>' +
                                '<li class="Pgnsn" ng-if="(totalRecord/10)>10" ' +
                                    'ng-repeat="page in [] | fixtRange: totalRecord/10 | limitTo: -2">{{page}}</li>' +
                                '<li class="Pgnsn">' +
                                    '<img src="styles/images/arrow_blu-rt.png" width="5" height="8" alt=""/>' +
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
            
            
        }
    };
  });
