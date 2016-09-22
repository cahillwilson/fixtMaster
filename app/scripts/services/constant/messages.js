'use strict';

angular.module('fixtApp')
    .constant('messages', {
        SEARCH_NOT_VALID: "Please enter a valid search term",
        SEARCH_ITEM_NOT_VALID: "Please enter a valid search item",
        SEARCH_TYPE_NOT_VALID: "Please select search type",
        SEARCH_ERROR_MSG: "Please enter a valid ",
        SANDBOX_DELETE_HEADING: "Deleting {sandbox} Sandbox",
        SANDBOX_DELETE_MSG: "Please confirm that you would like to delete the {sandbox} Sandbox.",
        MAX_CARD_ERROR_HEADING: "Maximum of {cardCount} reached!",
        MAX_CARD_ERROR_MSG: "You are attempting to add more that {cardCount} cards to this sandbox.",
        SEARCH_WITH_SAME_TAG_HEADING: "Same tag!",
        SEARCH_WITH_SAME_TAG_MSG: "Please search with different tag",
        CARD_ADD_TO_SANDBOX_HEADING: "Card Added",
        CARD_ADD_TO_SANDBOX_MSG: "Card(s) is added to the sandbox successfully."
    });
