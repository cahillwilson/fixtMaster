'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, $http) {

    var vm =  this;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardDetails = {};
    vm.cardDetails.items = ["C: Walmart 09854-DC", "D: I",
                            "E: 1717858114129", "F: UAMCITRIXDROIDLEAD",
                            "H: 124988287", "L: 19-APR-01"];

    //$http.get('/scripts/services/json/invoiceNodeDetails.json',{cache: true}).then(function (resp) {
    //    var data = resp.data;
    //    var summary = data.invoiceNodeDetails.summary;
        // $scope.cardScope = {};
        // $scope.cardScope.myData = summary;
        //$scope.myData = summary;
        // html: {{cardScope.myData}}
    //});
    vm.cardTitle = (vm.cardDetails.items.length>0) ? 
        vm.cardDetails.items[vm.cardDetails.items.length-1]:
            constantLoader.defaultValues.BLANK_STRING;
    
    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails(){
        
    }
    
    initialized();
         
  });
