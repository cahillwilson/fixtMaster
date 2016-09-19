'use strict';

angular.module('fixtApp')
  .directive('fixtQuickView', function (constantLoader) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            details: "="
        },
        template: function(){
            
            var html =  
                    '<div> ' +
                        '<fixt-node-hierarchy nodes="details.parentNodes"></fixt-node-hierarchy>' +                            
                        '<div class="sandBoxMidcol" ng-if="details!== null;"></div>' +
                        '<div class="sandBoxRightcol">' +
                            '<div ng-repeat="field in details.fields | filter: {rank:\'!0\'} | orderBy: \'rank\' | limitTo:' + 
                                constantLoader.defaultValues.MAX_NODE_FIELD_COUNT + '">' +
                                '<div class="sbxRightItem1-1">{{field.displayName}}: </div>' +
                                '<div class="sbxRightItem1-2">{{field.value}}</div><br>' +
                            '</div>' +
                        '</div>' +
                    '</div>' ;        
            return html;
        }
    };
  });
