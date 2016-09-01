'use strict';

angular.module('fixtApp')
  .directive('fixtNodeHierarchy', function () {
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
                                    '<div class="sbxFolder">' +
                                        '<img src="styles/images/icon_folder-sml.png" width="24" height="14" alt=""/>' +
                                    '</div>' +
                                    '<div class="sbxLeftItem">' +
                                        '<span ng-class="{\'sbox-item-title\':!($index < nodes.length -1)}">{{item}}</span>' +
                                    '</div>' +
                                '</div><br>' +
                            '</div>' +
                        '</div>';
        
            return html;
        }
    };
  });
