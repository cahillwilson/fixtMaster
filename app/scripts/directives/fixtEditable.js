'use strict';

angular.module('fixtApp')
  .directive('fixtEditable', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            item: "="
        },
        template: function(){
            
            var html =  '<input type="text" ng-model="item" ' +
                            'class="editable-field" />';
        
            return html;
        }
    };
  });
