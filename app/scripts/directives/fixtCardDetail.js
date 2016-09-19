'use strict';

angular.module('fixtApp')
  .directive('fixtCardDetail', function (constantLoader) {
    return {
	restricted: "E",
	replace: true,
        scope: {
            details: "="
        },
        template: function(){
            
            var html =  '<div class="srchExpDtls">' +
                            '<div class="sdNodHrch box1-3 omnReg">' +
                               '<div class="nodHrchbox nod1"><span class="omnMed">C:</span>Walmart 123456 W-South</div>' +
                               '<div class="nodHrchbox nod2"><span class="omnMed">H:</span>987654123456 W-South</div>' +
                               '<div class="nodHrchbox nod3"><span class="omnMed">BA:</span>123456123456 W-South</div>' +
                               '<div class="nodHrchbox nod4"><span class="omnMed">I:</span>12343215671234 South</div>' +
                               '<div class="nodHrchbox nod5"><span class="omnMed">CDG:</span>00321 Group DC</div>' +
                            '</div>' +
                            '<div class="sdNodHrch box2-3">' +
                                   '<div class="nodDtCmn left">ID:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Node Start Date:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Node End Date:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Description:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                            '</div>' + 
                            '<div class="sdNodHrch box3-3">' +
                                   '<div class="nodDtCmn left">Source Biller ID:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Start Date:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Sub Account ID:</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                                   '<div class="nodDtCmn left">Parent Foreign ID acct :</div>' +
                                   '<div class="nodDtCmn right">###-###-###</div>' +
                            '</div>' +

                            '</div>';
                                
        
            return html;
        },
        link: function(scope){
            
        }
    };
  });
