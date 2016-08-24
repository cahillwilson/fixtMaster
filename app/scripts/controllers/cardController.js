'use strict';

angular.module('fixtApp')
    .controller('cardController', function () {

    var vm =  this;
    vm.cardDetails = {};
    vm.cardDetails.items = ["C: Walmart 09854-DC", "D: Walmart 09854-DC",
                            "E: Walmart 09854-DC", "F: Walmart 09854-DC",
                            "H: Walmart 09854-DC", "L: Walmart 09854-DC"];
   
    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails(){
        
    }
    
    initialized();
         
  });
