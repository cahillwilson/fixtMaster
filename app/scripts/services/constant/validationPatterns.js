'use strict';

angular.module('fixtApp')
  .constant('validationPatterns', {
        ALPHA_NUMERIC: /^[0-9a-zA-Z]+$/,
        NUMERIC:/^[0-9]*$/
        
  });
