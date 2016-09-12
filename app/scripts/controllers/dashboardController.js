'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (localStorage, constantLoader,
        commonUtility, objectStorage) {

    var vm =  this;
    vm.sandBoxes = [];
   
    function initialized() {
        if(commonUtility.isDefinedObject(localStorage.getObject("sandBoxes"))){
            vm.sandBoxes = localStorage.getObject("sandBoxes");
        }
    }
    
    vm.onAddSandboxClick = function(){
        objectStorage.isSandboxAdded = true;
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    initialized();
         
  });
