'use strict';

angular.module('fixtApp')
  .constant('validationPatterns', {
        SEARCH_CUSTOMER: /^[a-zA-Z]*$/,
        SEARCH_MCN: /^[a-zA-Z]*$/,
        SEARCH_VENDOR: /^[a-zA-Z]*$/,
        SEARCH_CSS: /^[a-zA-Z]*$/,
        SEARCH_FOREIGN_ACCOUNT: /^[a-zA-Z]*$/,
        SEARCH_CONTRACT: /^[a-zA-Z]*$/,
        SEARCH_ADDRESS: /^[a-zA-Z]*$/,
        SEARCH_INVENTORY: /^[a-zA-Z]*$/,
        SEARCH_ACCOUNT: /^[a-zA-Z]*$/,
        ALPHA_NUMERIC: /^[0-9a-zA-Z]+$/,
        NUMERIC:/^[0-9]*$/,
        
  });
