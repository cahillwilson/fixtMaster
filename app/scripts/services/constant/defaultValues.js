'use strict';

angular.module('fixtApp')
    .constant('defaultValues', {
        BASE_URL: "http://localhost:3000/fixt",
        BLANK_STRING: "",
        SEARCH_CAT_INIT_VALUE: "Type/ Select",
        SEARCH_TYPE_INIT_VALUE: "Select",
        SANDBOX_TITLE: "Untitled",
        MAX_NODE_TYPE_COUNT: 6,
        MAX_NODE_FIELD_COUNT: 5,
        HEIRARCHY_LABEL_SEPARATOR1: ": ",
        HEIRARCHY_LABEL_SEPARATOR2: " - ",
        JSON_DELIMETER: ".",
        MAX_CARD_IN_SANDBOX: 2,
        CONFIRM_BOX_YES: "Yes",
        CONFIRM_BOX_NO: "No",
        MAX_CARD_DETAILS_COL_COUNT: 2,
        SANDBOX_SAVE_INTERVAL_IN_SEC: 100,
        SANDBOX_REPLACABLE_NAME: "{sandbox}",
        CARD_COUNT_REPLACABLE_TEXT: "{cardCount}"
    });
