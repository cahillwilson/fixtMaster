'use strict';

angular.module('fixtApp')
  .directive('fixtSearchList', function () {
    return {
	restricted: "E",
	replace: true,
        scope: {
            searchList: "=",
            onQuickView: "&"
            
        },
        template: function(){
            
            var html =  
            '<div ng-repeat="item in searchList">' +
                    '<div class="srchInfo">' +
                        '<div class="srchTtlDtls">' +
                            '<div class="chkHoldr">' +
                                '<input id="checkbox_{{$index}}" type="checkbox" />' +  
                                    '<label for="checkbox_{{$index}}"></label>' + 
                            '</div>' +  
                            '<div class="rsltDtlsCol"> ' +
                                '<div class="srchDtCnt-a">{{item.nodeDetail.nodeLabel}} {{item.nodeDetail.nodeType}} {{item.nodeDetail.nodeID}}</div>' +
                                '<div class="srchDtContainr">' +
                                    '<span class="srchDtCnt-b">ID</span>' +
                                    '<span class="srchDtCnt-C">{{item.nodeDetail.nodeID}}</span>' +
                                    '<span class="srchDtCnt-b">Label</span>' +
                                    '<span class="srchDtCnt-C">{{item.nodeDetail.nodeLabel}}</span>' +
                                    '<span class="srchDtCnt-b">Start Date</span>' +
                                    '<span class="srchDtCnt-C">{{item.nodeDetail.startDate | fixtSplit:\' \' : 0|date: \'MM/dd/yyyy\'}}</span>' +
                                    '<span class="srchDtCnt-b">Address</span>' +
                                    '<span class="srchDtCnt-C">123 Main street Dallas TX12345</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +    
                        '<span class="expandInfo pointer"  ng-click="onClick(item.nodeDetail, $index)">' +
                            '<img ng-src="{{!item.showQuickView ? \'styles/images/Hrchy-expand.jpg\' : \'styles/images/Hrchy-collapse.jpg\'}}" width="20" height="20"/></span>' +
                    '</div>' +
                '<div class="brdrInf"></div>' +
            '</div>';
            return html;
        },
        link: function(scope){
            
            scope.onClick = function (node, index) {
                    scope.onQuickView({
                        nodeDetail: node, index: index
                    });
                };
        }
    };
  });
