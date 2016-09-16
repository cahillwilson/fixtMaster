'use strict';

angular.module('fixtApp')
  .filter('fixtRange', function () {
    return function(input, total) {
        total = parseInt(total);

        for (var i=1; i<=total; i++) {
            input.push(i);
        }

        return input;
    };
  });