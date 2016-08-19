'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function () {

    var vm =  this;
    vm.isSearchMenuShow = false;
   
    function initialized() {
        
    }
    
    vm.onSearchButtonClick = function(){
        vm.isSearchMenuShow = !vm.isSearchMenuShow;
    };
    
    initialized();
         
  });
