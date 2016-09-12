'use strict';

angular.module('fixtApp')
  .directive('fixtSandBoxButton', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            label: "@",
            image: "@",
            height: "@",
            width: "@",
            buttonClick: "&"
        },
        template: function(){
            
            var html =  '<div class="iconBox" align="center" ng-click="onButtonClick()">' +
                            '<span>' +
                                '<img src="styles/images/{{image}}" width="{{width}}" height="{{height}}" alt=""/>' +
                            '</span>' +
                            '<div>{{label}}</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
                
            scope.onButtonClick = function(){
                scope.buttonClick();
            };
        }
    };
  });
