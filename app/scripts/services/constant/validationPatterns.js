'use strict';

angular.module('fixtApp')
  .constant('validationPatterns', {
        SEARCH_CUSTOMER: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_MCN: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_VENDOR: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_CSS: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_FOREIGN_ACCOUNT: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_CONTRACT: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_ADDRESS: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_INVENTORY: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/,
        SEARCH_ACCOUNT: /^[a-z].*[A-Z]|[A-Z].*[a-z]*$/
  });
