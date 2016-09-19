'use strict';

angular.module('fixtApp')
    .constant('defaultObjects', {
        SEARCH_LIST_CATEGORY: [
            {
                id: "cust_name",
                value: "Customer Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC",
                searchType: "name"
            },
            {
                id: "cust_legal",
                value: "Customer Legal Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC",
                searchType: "name"
            },
            {
                id: "inv_name",
                value: "Invoice Name",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC",
                searchType: "name"
            }, 
            {
                id: "mcn",
                value: "MCN/SO/BG #",
                maxLength: "25",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            }, 
            {
                id: "fa_id",
                value: "FA ID",
                maxLength: "20",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "circuit_id",
                value: "Circuit ID",
                maxLength: "48",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "sap_id",
                value: "SAP ID",
                maxLength: "11",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "ba_acc",
                value: "BA Account #",
                maxLength: "13",
                pattern: "NUMERIC",
                searchType: "id"
            },
            {
                id: "i_acc",
                value: "I Account #",
                maxLength: "13",
                pattern: "NUMERIC",
                searchType: "id"
            },
            {
                id: "sa_acc",
                value: "SA Account #",
                maxLength: "13",
                pattern: "NUMERIC",
                searchType: "id"
            },
            {
                id: "contract_no",
                value: "Contract #",
                maxLength: "16",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "sei",
                value: "SEI",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "master_aggrement",
                value: "Master Agreement",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "icor_id",
                value: "ICOR Site/Port ID",
                maxLength: "11",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "router_id",
                value: "Router ID",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "tn",
                value: "TN",
                maxLength: "10",
                pattern: "NUMERIC",
                searchType: "tbd"
            },
            {
                id: "network_id",
                value: "Network Inventory ID",
                maxLength: "250",
                pattern: "ALPHA_NUMERIC",
                searchType: "tbd"
            },
            {
                id: "site",
                value: "Site ID",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "doc",
                value: "DocViewer/PCS HomerID",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            }
        ],
        SEARCH_LIST_TYPE: [
            {
                id: "nodeID",
                value: "Node ID",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "nodeLabel",
                value: "Node Label",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "address",
                value: "Address",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "nodeType",
                value: "Node Type",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "tbd"
            },
            {
                id: "startDate",
                value: "Start Date",
                maxLength: "TBD",
                pattern: "TBD",
                searchType: "date"
            }
            
        ]
    });
