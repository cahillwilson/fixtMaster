'use strict';

angular.module('fixtApp')
.filter('fixtSplit', function (commonUtility, constantLoader) {
    return function (input, splitChar, valueIndex) {
        if (!commonUtility.is3DValidKey(input)) {
            return constantLoader.defaultValues.BLANK_STRING;
        }
        return input.split(splitChar)[valueIndex];
    };
});