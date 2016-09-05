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
                id: "cust_name",
                value: "Customer Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "cust_legal",
                value: "Customer Legal Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "inv_name",
                value: "Invoice Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC"
            }, 
            {
                id: "mcn",
                value: "MCN/SO/BG #",
                maxLength: "25",
                pattern: "ALPHA_NUMERIC"
            }, 
            {
                id: "fa_id",
                value: "FA ID",
                maxLength: "20",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "circuit_id",
                value: "Circuit ID",
                maxLength: "48",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "sap_id",
                value: "SAP ID",
                maxLength: "11",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "ba_acc",
                value: "BA Account #",
                maxLength: "13",
                pattern: "NUMERIC"
            },
            {
                id: "i_acc",
                value: "I Account #",
                maxLength: "13",
                pattern: "NUMERIC"
            },
            {
                id: "sa_acc",
                value: "SA Account #",
                maxLength: "13",
                pattern: "NUMERIC"
            },
            {
                id: "contract_no",
                value: "Contract #",
                maxLength: "16",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "sei",
                value: "SEI",
                maxLength: "TBD",
                pattern: "TBD"
            },
            {
                id: "master_aggrement",
                value: "Master Agreement",
                maxLength: "TBD",
                pattern: "TBD"
            },
            {
                id: "icor_id",
                value: "ICOR Site/Port ID",
                maxLength: "11",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "router_id",
                value: "Router ID",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "tn",
                value: "TN",
                maxLength: "10",
                pattern: "NUMERIC"
            },
            {
                id: "network_id",
                value: "Network Inventory ID",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC"
            },
            {
                id: "site",
                value: "Site ID",
                maxLength: "TBD",
                pattern: "TBD"
            },
            {
                id: "doc",
                value: "DocViewer/PCS HomerID",
                maxLength: "TBD",
                pattern: "TBD"
            }],
            FAKE_DATA: idsOnly
    });
