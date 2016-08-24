'use strict';

angular.module('fixtApp')
    .constant('defaultObjects', {
        SEARCH_LIST: [
            {
                code: "Customer",
                value: "Customer",
                id: 'customer'
            }, 
            {
                code: "MCN",
                value: "MCN",
                id: 'mcn'
            }, 
            {
                code: "Vendor ID",
                value: "Vendor ID",
                id: 'vendor'
            }, 
            {
                code: "CSS #",
                value: "CSS #",
                id: 'css'
            }, 
            {
                code: "Foreign Account #",
                value: "Foreign Account #",
                id: 'foreign-account'
            }, 
            {
                code: "Contract #",
                value: "Contract #",
                id: 'contract'
            }, 
            {
                code: "Address",
                value: "Address",
                id: 'address'
            }, 
            {
                code: "Inventory Element ID",
                value: "Inventory Element ID",
                id: 'inventory'
            }, 
            {
                code: "Account #",
                value: "Account #",
                id: 'account'
            }]
    });
