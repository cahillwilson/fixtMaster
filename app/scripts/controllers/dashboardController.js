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
        var maxId = 0;
        if(commonUtility.isDefinedObject(vm.sandBoxes)){
            for(var index=0; index<vm.sandBoxes.length; index++){
                maxId = (maxId < Number(vm.sandBoxes[index].boxId)) ? 
                    vm.sandBoxes[index].boxId : maxId;
                vm.sandBoxes[index].isActive = false;
            }
        }
        
        vm.sandBoxes.push({
            boxId: (maxId + 1),
            title: constantLoader.defaultValues.SANDBOX_TITLE,
            isActive: true,
            cards: []
        });
        
        localStorage.setObject("sandBoxes", vm.sandBoxes);
        objectStorage.isSandboxAdded = true;
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    initialized();
         
  });
