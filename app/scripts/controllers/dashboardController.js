'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (localStorage, constantLoader,
        commonUtility, objectStorage, sandboxBusiness, handlerLoader) {

    var vm =  this;
    vm.sandBoxes = [];
   
    function initialized() {
//        loadSandboxes();
        if(commonUtility.isDefinedObject(localStorage.getObject("sandBoxes"))){
            vm.sandBoxes = localStorage.getObject("sandBoxes");
        }
    }
    
    function loadSandboxes(){
        sandboxBusiness.getAllSandboxAsync(successLoadSandboxesCall);
    }
    
    function successLoadSandboxesCall(){
        vm.sandBoxes = localStorage.getObject("sandBoxes");
    }
    
    vm.onAddSandboxClick = function(){
        objectStorage.isSandboxAdded = true;
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    vm.onSandboxClick = function(box){
        objectStorage.SandboxEditId = box.boxId;
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    vm.onDeleteSandboxClick = function(box){
        handlerLoader.modalHandler.showConfirm(
            commonUtility.replaceString(constantLoader.messages.SANDBOX_DELETE_HEADING,
                constantLoader.defaultValues.SANDBOX_REPLACABLE_NAME, box.title),
            commonUtility.replaceString(constantLoader.messages.SANDBOX_DELETE_MSG,
                constantLoader.defaultValues.SANDBOX_REPLACABLE_NAME, box.title)).then(function(response){
            if(response > 0){
                sandboxBusiness.deleteSandbox(objectStorage.cardList, box.boxId,
                    vm.sandBoxes);
                vm.sandBoxes = localStorage.getObject("sandBoxes");
            }
        });
    };
    
    initialized();
         
  });
