'use strict';

angular.module('fixtApp')
  .factory('sandboxBusiness', function (commonUtility, constantLoader, 
      localStorage, objectStorage) {
    
    var sandboxBusiness = {};
    
    sandboxBusiness.addSandbox = function(successCallback){
        var maxId = 0;
        var sandboxes = [];
        if(commonUtility.isDefinedObject(localStorage.getObject("sandBoxes"))){
            sandboxes = localStorage.getObject("sandBoxes");
        }
        if(commonUtility.isDefinedObject(sandboxes)){
            for(var index=0; index<sandboxes.length; index++){
                maxId = (maxId < Number(sandboxes[index].boxId)) ? 
                    sandboxes[index].boxId : maxId;
                sandboxes[index].isActive = false;
            }
        }
        
        sandboxes.push({
            boxId: (maxId + 1),
            title: constantLoader.defaultValues.SANDBOX_TITLE,
            isActive: true,
            cards: []
        });
        
        localStorage.setObject("sandBoxes", sandboxes);
        commonUtility.callback(successCallback);
    };
    
    sandboxBusiness.saveSandBox = function(sandBoxes, activeBoxId, title, cards){
        if(commonUtility.filterInArray(sandBoxes, {boxId: activeBoxId}).length > 0){
            commonUtility.filterInArray(sandBoxes, {boxId: activeBoxId})[0].title = title;
            commonUtility.filterInArray(sandBoxes, {boxId: activeBoxId})[0].cards = [];
            for(var index=0; index<cards.length; index++){
                if(cards[index].boxId === activeBoxId){
                    commonUtility.filterInArray(sandBoxes, 
                        {boxId: activeBoxId})[0].cards.push(cards[index].id);
                }
            }
        }
        localStorage.setObject("sandBoxes", sandBoxes);
    };
    
    sandboxBusiness.deleteSandbox = function(cards, activeBoxId, sandBoxes){
        if(commonUtility.isDefinedObject(cards)){
            for(var index=(cards.length-1); index>=0; index--){
                if(cards[index].boxId === activeBoxId){
                    cards.splice(cards[index], 1);
                }
            }
        }
        for(var index=0; index<sandBoxes.length; index++){
            if(sandBoxes[index].boxId === activeBoxId){
                sandBoxes.splice(sandBoxes[index], 1);
                break;
            }
        }
        
        objectStorage.cardList = cards;
        localStorage.setObject("sandBoxes", sandBoxes);
    };
    
    return sandboxBusiness;
  });
