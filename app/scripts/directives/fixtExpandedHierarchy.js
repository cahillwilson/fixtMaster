'use strict';

angular.module('fixtApp') 
    .directive('fixtExpandedHierarchy', function(constantLoader){
        return{
            restrict:'EA',
            replace: true,
            scope:{
                childList: "=",
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
                                    '<div ng-repeat="item in details.parentNodes | limitTo: showLevel">' +
                                        '<div class="hrNode1-1" style="padding-left: {{($index+1)*20}}px;">' +
                                            '<div ng-class="{\'hrNode1-1-1\':($index>0),\'hrNode1-1-1-first\': ($index===0)}">' +
                                                '<div ng-class="{\'space-div\':($index>0),\'space-div-first\': ($index===0)}"></div>' +
                                                '<span class="nodeIcon">' +
                                                    '<img ng-if="(details.parentNodes.length !== $index+1)" ' +
                                                        'ng-src="{{(!isLevelShow && (showLevel === ($index+1))) ? ' +
                                                        '\'styles/images/Hrchy-expand.jpg\' : \'styles/images/Hrchy-collapse.jpg\'}}" ' +
                                                        'width="20" height="20" alt="" class="pointer" ' +
                                                        'ng-click="onHideLevels($index)" />' +
                                                    '<img ng-if="(details.parentNodes.length === $index+1)" ng-src="{{!isChildrenVisible ? ' +
                                                        '\'styles/images/Hrchy-expand.jpg\' : \'styles/images/Hrchy-collapse.jpg\'}}" ' + 
                                                        'width="20" height="20" alt="" class="pointer" ' +
                                                        'ng-click="onFinalLevelClick($index)" />' +
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
                                    '</div>' +
                                    '<div class="hrNode2-1" ng-show="isChildrenVisible" style="margin-left: {{(details.parentNodes.length*24)-(details.parentNodes.length/2)}}px; ' + 
                                        'height: {{(childList.length*20)-9}}px;">' +
                                        '<div ng-repeat="child in childList" class="nodeIcon-child" ng-click="onChildClick(child.hierarchyPointId)">' +
                                            '<div class="inner-div-space"></div>' +
                                            '<img id="nodeBubble" src="styles/images/Hrchy-child.jpg" width="10" height="10" alt=""/>' +
                                            '<span ng-class="{\'sbox-item-title\':(activeChild === child.hierarchyPointId)}">' +
                                                '{{child.hierarchyPointId}}-{{child.description}}' +
                                            '</span>' +
                                        '</div>' +
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
                
                scope.activeChild = 0;
                scope.isChildrenVisible = true;
                scope.showLevel = scope.details.parentNodes.length;
                scope.isLevelShow = true;
                
                scope.onChildClick = function(id){
                    scope.activeChild = id;
                };
                
                scope.onCardViewClick = function(){
                    scope.showCardViewClick();
                };
                
                scope.onFinalLevelClick = function(index) {
                    if(scope.details.parentNodes.length === (index + 1)){
                        scope.isChildrenVisible = !scope.isChildrenVisible;
                    }
                };
                
                scope.onHideLevels = function(index){
                    scope.showLevel = index + 1;
                    scope.isLevelShow = !scope.isLevelShow;
                    if(scope.isLevelShow){
                        scope.showLevel = scope.details.parentNodes.length;
                    }
                    scope.isChildrenVisible = scope.isLevelShow;
                };
                
                scope.onCloseClick = function(details){
                    scope.closeClick({
                        card: details
                    });
                };
                
                scope.onOpenNewCardClick = function(){
                    scope.openNewCard({
                        id: scope.activeChild
                    });
                };
            }
        };
});


