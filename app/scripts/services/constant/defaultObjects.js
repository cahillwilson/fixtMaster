'use strict';

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
            }
        ]
    });
