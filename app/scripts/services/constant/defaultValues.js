'use strict';

angular.module('fixtApp')
    .constant('defaultValues', {
        BASE_URL: "",
        BLANK_STRING: "",
        SEARCH_TYPE_INIT_VALUE: "Type/ Select",
        SANDBOX_TITLE: "Untitled",
        MAX_NODE_TYPE_COUNT: 6,
        MAX_NODE_FIELD_COUNT: 5,
        HEIRARCHY_LABEL_SEPARATOR1: ": ",
        HEIRARCHY_LABEL_SEPARATOR2: " - ",
        JSON_DELIMETER: ".",
        MAX_CARD_IN_SANDBOX: 2,
        CONFIRM_BOX_YES: "Yes",
        CONFIRM_BOX_NO: "No",
    });
