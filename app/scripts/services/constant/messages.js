'use strict';

angular.module('fixtApp')
    .constant('messages', {
        SEARCH_NOT_VALID: "Please enter a valid search term",
        SEARCH_ITEM_NOT_VALID: "Please enter a valid search item",
        SEARCH_VALIDATION_CUSTOMER: "search customer",
        SEARCH_VALIDATION_MCN: "search mcn",
        SEARCH_VALIDATION_VENDOR: "search vendor",
        SEARCH_VALIDATION_CSS: "search css",
        SEARCH_VALIDATION_FOREIGN_ACCOUNT: "search foreign acc",
        SEARCH_VALIDATION_CONTRACT: "search contract",
        SEARCH_VALIDATION_ADDRESS: "search address",
        SEARCH_VALIDATION_INVENTORY: "search inventory",
        SEARCH_VALIDATION_ACCOUNT: "search account",
        SEARCH_ERROR_MSG: "Please enter a valid "
    });
