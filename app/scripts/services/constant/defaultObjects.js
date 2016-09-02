'use strict';

var fakeData = 
        [
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161715109",
                "accountType": "S"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161715108",
                "accountType": "AS"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161715101",
                "accountType": "S"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161715100",
                "accountType": "AS"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161679852",
                "accountType": "AG"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161679818",
                "accountType": "S"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161679816",
                "accountType": "I"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860201",
                "hierarchyPointID": "161679814",
                "accountType": "AB"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161679811",
                "accountType": "AG"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161679775",
                "accountType": "S"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161679774",
                "accountType": "I"
            },
            {
                "custID": "38469907",
                "hierarchyId": "40860191",
                "hierarchyPointID": "161679773",
                "accountType": "AB"
            }
        ];


       var idsOnly = fakeData.map(function (d) {
           return d.hierarchyPointID;
        });

angular.module('fixtApp')
    .constant('defaultObjects', {
        SEARCH_LIST: [
            {
                id: "customer",
                value: "Customer"
            }, 
            {
                id: "mcn",
                value: "MCN"
            }, 
            {
                id: "vendor",
                value: "Vendor ID"
            }, 
            {
                id: "css",
                value: "CSS #"
            }, 
            {
                id: "foreignAccount",
                value: "Foreign Account #"
            }, 
            {
                id: "contract",
                value: "Contract #"
            }, 
            {
                id: "address",
                value: "Address"
            }, 
            {
                id: "inventory",
                value: "Inventory Element ID"
            }, 
            {
                id: "account",
                value: "Account #"
            }],
            FAKE_DATA: idsOnly
    });
