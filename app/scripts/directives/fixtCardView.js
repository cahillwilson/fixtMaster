'use strict';

angular.module('fixtApp')
  .directive('fixtCardView', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            details: "=",
            cardTitle: "=",
            detailsClick: "&",
            hierarchyClick: "&"
        },
        template: function(){
            
            var html =  '<div class="sandBox" data-drag="true" data-jqyoui-options="{revert: \'false\', containment: \'window\'}" ' +
                            'ng-model="details" jqyoui-draggable="{animate:true}">' +
                            '<div class="sBxheader">' +
                                '<div class="sBxtitle">' +
                                    '<fixt-editable item="cardTitle"></fixt-editable>' +
                                '</div>' +
                                '<div class="sBxaction">' +
                                    '<div class="sBxbox1-1">' +
                                        '<div class="dropdown pull-right">' +
                                            '<div class="dropdown-toggle pointer" data-toggle="dropdown">' +
                                                '<span>Actions</span>' +
                                                '<span>' +
                                                    '<img src="styles/images/dropdwn-arrow-sml.png" width="16" height="9" alt=""/>' +
                                                '</span>' +
                                            '</div>' +
                                            '<ul class="dropdown-menu">' +
                                                '<li class="sbox-menu-item">' +
                                                    '<span class="imgBox">' +
                                                        '<img src="styles/images/icon_create.png" width="16" height="18" alt=""/>' +
                                                    '</span>' +
                                                    'Create Node' +
                                                '</li>' +
                                                '<li class="sbox-menu-item">' +
                                                    '<span class="imgBox">' +
                                                        '<img src="styles/images/icon_export.png" width="16" height="16" alt=""/>' +
                                                    '</span>' +
                                                    'Export' +
                                                '</li>' +
                                                '<li class="sbox-menu-item">' +
                                                    '<span class="imgBox">' +
                                                        '<img src="styles/images/icon_jump.png" width="16" height="16" alt=""/>' +
                                                    '</span>' +
                                                    'Go to EUAM' +
                                                '</li>' +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="sBxbox1-2">' +
                                        '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sandBoxComoncol">' +
                                '<div class="sandBoxLeftcol">' +
                                    '<div ng-repeat="item in details.parentNodes">' +
                                        '<div style="padding-left: {{$index*10}}px;">' +
                                            '<div class="sbxFolder">' +
                                                '<img src="styles/images/icon_folder-sml.png" width="24" height="14" alt=""/>' +
                                            '</div>' +
                                            '<div class="sbxLeftItem">' +
                                                '<span ng-class="{\'sbox-item-title\':!($index < details.parentNodes.length -1)}">{{item}}</span>' +
                                            '</div>' +
                                        '</div><br>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="sandBoxMidcol"></div>' +
                                '<div class="sandBoxRightcol">' +
                                    '<div ng-repeat="field in details.topFields">' +
                                        '<div class="sbxRightItem1-1">{{field.name}}: </div>' +
                                        '<div class="sbxRightItem1-2">{{field.value}}</div><br>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="sBxfooter">' +
                                    '<div class="sBxfooter1-1">' +
                                        '<span class="sBxfooter1-ext" ng-click="onHierarchyClick()">Explore hierarchy</span>' +
                                    '</div>' +
                                    '<div class="sBxfooter1-2">' +
                                        '<span class="sBxfooter1-ext" ng-click="onDetailsClick()">More details</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        
            return html;
        },
        link: function(scope){
            scope.onDetailsClick = function(){
                scope.detailsClick();
            };
            
            scope.onHierarchyClick = function(){
                scope.hierarchyClick();
            };
        }
    };
  });
