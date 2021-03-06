'use strict';

angular.module('fixtApp')
  .directive('fixtCardView', function (constantLoader) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            details: "=",
            detailsClick: "&",
            hierarchyClick: "&",
            closeClick: "&"
        },
        template: function(){
            
            var html =  '<div class="sandBox" data-drag="true" data-jqyoui-options="{revert: \'false\', containment: \'window\'}" ' +
                            'ng-model="details" jqyoui-draggable="{animate:true}">' +
                            '<div class="sBxheader">' +
                                '<div class="sBxtitle">' +
                                    '<span>{{details.nodeId | fixtHideChar: ":"}}</span>-' +
                                    '<fixt-editable item="details.nodeLabel"></fixt-editable>' +
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
                                        '<span class="pointer" ng-click="onCloseClick(details)">' +
                                            '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                        '</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sandBoxComoncol">' +
                                '<fixt-node-hierarchy nodes="details.parentNodes"></fixt-node-hierarchy>' +
                                '<div class="sandBoxMidcol"></div>' +
                                '<div class="sandBoxRightcol">' +
                                    '<div ng-repeat="field in details.fields | filter: {rank:\'!0\'} | orderBy: \'rank\' | limitTo:' + 
                                        constantLoader.defaultValues.MAX_NODE_FIELD_COUNT + '">' +
                                        '<div class="sbxRightItem1-1">{{field.displayName}}: </div>' +
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
            
            scope.onCloseClick = function(details){
                scope.closeClick({
                    card: details
                });
            };
        }
    };
  });
