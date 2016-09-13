'use strict';

angular.module('fixtApp')
  .directive('fixtSearchList', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            searchList: "=",
            
        },
        template: function(){
            
            var html =  
            '<div ng-repeat="item in searchList">' +
                    '<div class="srchInfo">' +
                        '<div class="srchTtlDtls">' +
                            '<div class="checkbox checkbox-primary">' +
                                '<input id="checkbox_{{$index}}" type="checkbox">' +  
                                '<label for="checkbox_{{$index}}">' + 
                                    '<div class="srchDtCnt-a">{{item.nodeLabel}} {{item.nodeType}} {{item.nodeID}}</div>' +
                                    '<span class="srchDtCnt-b">ID</span>' +
                                    '<span class="srchDtCnt-C">{{item.nodeID}}</span>' +
                                    '<span class="srchDtCnt-b">Label</span>' +
                                    '<span class="srchDtCnt-C">{{item.nodeLabel}}</span>' +
                                    '<span class="srchDtCnt-b">Start Date</span>' +
                                    '<span class="srchDtCnt-C">{{item.startDate | fixtSplit:\' \' : 0|date: \'MM/dd/yyyy\'}}</span>' +
                                    '<span class="srchDtCnt-b">Address</span>' +
                                    '<span class="srchDtCnt-C">123 Main street Dallas TX12345</span>' + 
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<span class="expandInfo"><img src="styles/images/Hrchy-expand.jpg" width="20" height="20" alt=""/></span>' +
                    '</div>' +
                    '<div class="brdrInf"></div>' +
                '</div>';
            return html;
        },
        link: function(scope){
            
            
        }
    };
  });
