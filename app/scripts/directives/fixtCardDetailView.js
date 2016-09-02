'use strict';

angular.module('fixtApp')
  .directive('fixtCardDetailView', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            cardId: "=",
            cardLabel: "=",
            parentNodes:"=",
            showCardViewClick: "&"
        
        },
        template: function(){
            
            var html =  '<div class="cardCver">' +
                            '<div class="cardExpand">' +
                                '<div class="crdExpheader">' +
                                    '<div class="crdExptitle">' +
                                        '<span ng-bind="cardId"></span>-' +
                                        '<fixt-editable item="cardLabel"></fixt-editable>' +
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
                                            '<img src="styles/images/btn-close-sml.png" width="12" height="10" alt=""/>' +
                                        '</div>' +
                                    '</div><!---sBxaction end-->' +
                                '</div><!---sBxheader end-->' +
                                '<div class="crdExpComoncol">' +
                                    '<fixt-node-hierarchy nodes="parentNodes"></fixt-node-hierarchy>' +

                                    '<div class="crdExpMidcol"></div>' +
                                    '<div class="crdExpRightcol">' +
                                        '<ul class="nav nav-tabs">' +
                                            '<li class="active"><a data-target="#overview" data-toggle="tab">Overview</a></li>' +
                                            '<li><a data-target="#charges" data-toggle="tab">Charges</a></li>' +
                                            '<li><a data-target="#contacts" data-toggle="tab">Telephone Numbers</a></li>' +
                                        '</ul>' +
                                        '<div class="tab-content">' +
                                            '<div class="tab-pane fade in active" id="overview">' +
                                                '<div class="crdTabComoncol">' +
                                                    '<div class="crdTabLeftcol">' +
                                                        '<div>' +
                                                            '<div class="txtMed">Type:</div>' +
                                                            '<div class="txtRt">IP Service</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">Start Date:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="crdTabMidcol"></div>' +
                                                    '<span class="txtTit">Service Location Address</span>' +
                                                    '<div class="crdTabRightcol">' +
                                                        '<div>' +
                                                            '<div class="txtMed">Type:</div>' +
                                                            '<div class="txtRt">IP Service</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">Start Date:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                        '<div>' +
                                                            '<div class="txtMed">#######:</div>' +
                                                            '<div class="txtRt">###########</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="tab-pane fade" id="charges">' +
                                                '<h3>Wallmart- Details - Charges</h3>' +
                                                '<p>Some content in Pending.</p>' +
                                            '</div>' +
                                            '<div class="tab-pane fade" id="contacts">' +
                                                '<h3>Wallmart- Details - Telephone Numbers</h3>' +
                                                '<p>Some content in Pending.</p>' +
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
