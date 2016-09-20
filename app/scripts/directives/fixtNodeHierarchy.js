'use strict';

angular.module('fixtApp')
  .directive('fixtNodeHierarchy', function (constantLoader) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            nodes: "="
        },
        template: function(){
            
            var html =  '<div class="sandBoxLeftcol">' +
                            '<div ng-repeat="item in nodes">' +
                                '<div style="padding-left: {{$index*7}}px;">' +
                                    '<div class="sbxLeftItem">' +
                                        '<span ng-class="{\'sbox-item-title\':!($index < nodes.length -1)}">' +
                                            '<span style="font-weight: bold;">{{item | fixtSplit:\': \' : 0}}: </span>' +
                                                '{{item | fixtSplit:\': \' : 1}}' +
                                        '</span>' +
                                    '</div>' +
                                '</div><br>' +
                            '</div>' +
                        '</div>';
        
            return html;
        }
    };
  });
