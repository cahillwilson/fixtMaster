'use strict';

angular.module('fixtApp')
    .constant('relativeUrls', {
        CARD_DETAILS: "/scripts/services/json/NodeDetails_Multi.json",
        CARD_CHILD: "/scripts/services/json/GetChildrenAPIresponse.json",
        SEARCH_SUMMARY: "/scripts/services/json/Initial_Search.json",        
        GET_SANDBOXES: "/sandbox",
        INITIAL_SEARCH: "/initialSearch"
    });
