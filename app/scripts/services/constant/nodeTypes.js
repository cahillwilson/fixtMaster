'use strict';

angular.module('fixtApp')
    .constant('nodeTypes', {
        CUSTOMER: "C",
        HEIRARCHY: "H",
        BUNDLE: "BA",
        INVOICE: "I",
        CUSTOMER_DEFINED_GRP: "CDG",
        SUB_ACCOUNT: "SA",
        SITE: "S",
        PORT_RT: "PRT"
    });
