'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader) {

    var vm =  this;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardDetails = {};
    vm.cardDetails.items = ["C: Walmart 09854-DC", "D: Walmart 09854-DC",
                            "E: Walmart 09854-DC", "F: Walmart 09854-DC",
                            "H: Walmart 09854-DC", "L: Walmart 09854-DC"];
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
