'use strict';

angular.module('fixtApp')
  .directive('fixtCardDetailView', function (constantLoader) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            details: "=",
            showCardViewClick: "&"
        
        },
        template: function(){
            
            var html =  '<div class="cardCver">' +
                            '<div class="cardExpand">' +
                                '<div class="crdExpheader">' +
                                    '<div class="crdExptitle">' +
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
                                                        '</span> Create Node' +
                                                    '</li>' +
                                                    '<li class="sbox-menu-item">' +
                                                        '<span class="imgBox">' +
                                                            '<img src="styles/images/icon_export.png" width="16" height="16" alt=""/>' +
                                                        '</span> Export' +
                                                    '</li>' +
                                                    '<li class="sbox-menu-item">' +
                                                        '<span class="imgBox">' +
                                                            '<img src="styles/images/icon_jump.png" width="16" height="16" alt=""/>' +
                                                        '</span> Go to EUAM' +
                                                    '</li>' +
                                                '</ul>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="sBxbox1-2">' +
                                            '<span class="pointer" ng-click="goToCardView()">' +
                                                '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                            '</span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="crdExpComoncol">' +
                                    '<fixt-node-hierarchy nodes="details.parentNodes"></fixt-node-hierarchy>' +
                                    '<div class="crdExpMidcol"></div>' +
                                    '<div class="crdExpRightcol">' +
                                        '<ul class="nav nav-tabs">' +
                                            '<li ng-repeat="cat in details.categoryList" ng-class="{active: $index===0}" class="pointer">' +
                                                '<a data-target="#{{$index}}_{{cat.category}}" data-toggle="tab">{{cat.category}}</a>' +
                                            '</li>' +
                                        '</ul>' +
                                        '<div class="tab-content">' +
                                            '<div class="tab-pane fade" ng-repeat="cat in details.categoryList" ' +
                                                'ng-class="{in:($index===0), active:($index===0)}" ' +
                                                'id="{{$index}}_{{cat.category}}">' +
                                                '<div class="crdTabComoncol">' +
                                                    '<div ng-repeat="col in cat.cols | limitTo: ' + 
                                                        constantLoader.defaultValues.MAX_CARD_DETAILS_COL_COUNT + 
                                                        '" class="crdTabcol">' +
                                                        '<div class="crdTabLeftcol">' +
                                                            '<div ng-repeat="field in details.fields | filter: {column: col.col, category: cat.category} | orderBy: row">' +
                                                                '<div class="txtMed">{{field.displayName}}:</div>' +
                                                                '<div class="txtRt">{{field.value}}</div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="crdTabMidcol" ng-if="$even && cat.cols.length>1"></div>' +
                                                    '</div>' +
//                                                    '<span class="txtTit">Service Location Address</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="crdExpfooter">' +
                                    '<div class="crdExpfooterLeft">' +
                                        '<span class="sBxfooter1-ext" ng-click="goToCardView()">Back to card view</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<!---sandBox end-->' +
                        '</div><!---card Cvr end-->';
        
            return html;
        },
        link: function(scope){
            scope.goToCardView = function(){
                scope.showCardViewClick();
            };
            
        }
    };
  });
