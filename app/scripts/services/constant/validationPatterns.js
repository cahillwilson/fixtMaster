'use strict';

angular.module('fixtApp')
  .constant('validationPatterns', {
        ALPHA_NUMERIC: /^[0-9a-zA-Z]+$/,
        NUMERIC:/^[0-9]*$/,
        DATE: /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/,
        
  });
