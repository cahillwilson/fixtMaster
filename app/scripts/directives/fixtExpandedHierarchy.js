'use strict';

angular.module('fixtApp') 
    .directive('fixtExpandedHierarchy', function(constantLoader){
        return{
            restrict:'EA',
            replace: true,
            scope:{
                myList: "=",
                toggleDetails: "&",
                isVisible: "=",
                
                showCardViewClick: "&",
                closeClick: "&",
                details: "=",
                openNewCard: "&"
            },
            template: function(){
     
                var html=   '<div class="sbxHierarchy">' +
                                '<div class="sBxbox1-2">' +
                                    '<span class="pointer" ng-click="onCloseClick(details)">' +
                                        '<img id="expandedClose" src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                    '</span>' +
                                '</div>' +
                                '<div class="sBxheader">' +
                                    '<div class="sBxtitle">' +
                                        '<span>{{details.nodeId | fixtHideChar: ":"}}</span>-' +
                                        '<span>{{details.nodeLabel}}</span>' +
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
                                    '</div>' +
                                '</div>' +
                                '<div class="sbxHrchyCol" >' +
                                    '<div ng-repeat="item in details.parentNodes">' +
                                        '<div class="hrNode1-1" style="margin-top:14px; margin-left: {{($index+1)*21}}px;">' +
                                            '<span class="nodeIcon">' +
                                                '<img ng-if="(details.parentNodes.length !== $index+1)" src="styles/images/Hrchy-collapse.jpg" width="20" height="20" alt=""  />' +
                                                '<img ng-if="(details.parentNodes.length === $index+1)" ng-src="{{!isVisible ? \'styles/images/Hrchy-expand.jpg\' : \'styles/images/Hrchy-collapse.jpg\'}}" width="20" height="20" alt="" ' +
                                                    'ng-click="toggleDetails(details.parentNodes.length, $index)" />' +
                                            '</span>' +
                                            '<span>' +
                                                '<span>{{item.slice(0, item.indexOf("' + 
                                                    constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + 
                                                '")+2)}}</span>{{item.slice(item.indexOf("' + 
                                                    constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + 
                                                '")+2)}}' +
                                            '</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="hrNode2-1" ng-show="isVisible">' +
                                        '<span class="nodeIcon">' +
                                            '<div ng-repeat="children in myList">' +
                                                '<img id="nodeBubble" src="styles/images/Hrchy-child.jpg" width="10" height="10" alt=""/>' +
                                                '{{children}}-IBM MSA' +
                                            '</div>' +
                                        '</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="sbxHrchyFooter">' +
                                    '<div class="sbxHrchyFtrLeft">' +
                                        '<span class="sBxfooter1-ext" ng-click="onCardViewClick()">' +
                                            'Back to card view' +
                                        '</span>' +
                                    '</div>' +
                                '<div class="sbxHrchyFtrRight">' +
                                    '<span class="sBxfooter1-ext" ng-click="onOpenNewCardClick()">Open in new card</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                return html;
            },

            link: function(scope){
                scope.onCardViewClick = function(){
                    scope.showCardViewClick();
                };
                
                scope.toggleDetails = function(length, index) {
                    if(length === (index + 1)){
                        scope.isVisible = !scope.isVisible;
                    }
                };
                
                scope.onCloseClick = function(details){
                    scope.closeClick({
                        card: details
                    });
                };
                
                scope.onOpenNewCardClick = function(){
                    scope.openNewCard();
                };
            }
        };
});


