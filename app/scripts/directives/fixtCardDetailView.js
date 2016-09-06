'use strict';

angular.module('fixtApp')
  .directive('fixtCardDetailView', function () {
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
                                                '<a data-target="{{$index}}_{{cat.category}}" data-toggle="tab">{{cat.category}}</a>' +
                                            '</li>' +
                                        '</ul>' +
                                        '<div class="tab-content">' +
                                            '<div class="tab-pane fade" ng-repeat="cat in details.categoryList" ng-class="{in:($index===0), active:($index===0)}" ' +
                                                'id="{{$index}}_{{cat.category}}">' +
                                                '<div class="crdTabComoncol">' +
//                                                    '<div ng-repeat="n in cat.cols | filter: {cat: cat.category}" class="crdTabcol">' +
//                                                        '<div class="crdTabLeftcol">' +
//                                                            '<div>n={{n}}' +
//                                                                '<div class="txtMed">Type:</div>' +
//                                                                '<div class="txtRt">IP Service</div>' +
//                                                            '</div>' +
//                                                        '</div>' +
//                                                        '<div class="crdTabMidcol"></div>' +
//                                                    '</div>' +
//                                                    
//                                                    '<span class="txtTit">Service Location Address</span>' +
//                                                    '<div class="crdTabRightcol">' +
//                                                        '<div>' +
//                                                            '<div class="txtMed">Type:</div>' +
//                                                            '<div class="txtRt">IP Service</div>' +
//                                                        '</div>' +
//                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
//                                            '<div class="tab-pane fade" id="charges">' +
//                                                '<h3>Wallmart- Details - Charges</h3>' +
//                                                '<p>Some content in Pending.</p>' +
//                                            '</div>' +
//                                            '<div class="tab-pane fade" id="contacts">' +
//                                                '<h3>Wallmart- Details - Telephone Numbers</h3>' +
//                                                '<p>Some content in Pending.</p>' +
//                                            '</div>' +
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
