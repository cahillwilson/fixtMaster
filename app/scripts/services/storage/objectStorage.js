'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
    var cardDetail = {};
    
    Object.defineProperty(cardDetail, "cardDetail", {
        get: function() {
            return cardDetail;
        },
        set: function(card) {
            cardDetail = card;
        }
    });
});