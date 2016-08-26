'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader) {

    var vm =  this;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardDetails = {};
    vm.cardDetails.items = ["C: Walmart 09854-DC", "D: I",
                            "E: 1717858114129", "F: UAMCITRIXDROIDLEAD",
                            "H: 124988287", "L: 19-APR-01"];
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
