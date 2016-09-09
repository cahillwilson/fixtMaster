'use strict';

angular.module('fixtApp')
    .config(function($httpProvider) {
        $httpProvider.defaults.timeout = 5000;
    });