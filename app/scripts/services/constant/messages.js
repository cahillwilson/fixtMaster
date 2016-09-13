'use strict';

angular.module('fixtApp')
    .constant('messages', {
        SEARCH_NOT_VALID: "Please enter a valid search term",
        SEARCH_ITEM_NOT_VALID: "Please enter a valid search item",
        SEARCH_ERROR_MSG: "Please enter a valid ",
        SANDBOX_DELETE_HEADING: "Deleting {sandbox} Sandbox",
        SANDBOX_DELETE_MSG: "Please confirm that you would like to delete the {sandbox} Sandbox.",
        MAX_CARD_ERROR_HEADING: "Maximum of {cardCount} reached!",
        MAX_CARD_ERROR_MSG: "You are attempting to add more that {cardCount} cards to this sandbox."
    });
