var express = require('express');
var app = express();
var port = 9000;
var auth = require('basic-auth');

function isAuthenticated(req, res, next) {
    console.log('Authentication triggered');
    console.log(req.headers);
    var credentials = auth(req);
    console.log('Credentials: ' + credentials.name + ' [' + credentials.pass + ']');
    next();
}

app.get('/', function(req, res) {
    res.send('Basic GET is functional');
});

var initialSearch = '{"nodeDetails":[{"nodeType":"AS","nodeID":"8310001226402","nodeLabel":"CUSTOMBILLING","hierarchyPointID":"164241159","startDate":"2008092411:30:08","endDate":"","addressDetails":[{"addressType":null,"addressLine1":null,"addressLine2":null,"addressLine3":null,"addressLine4":null,"addressName":null,"city":null,"floor":null,"state":null,"province":null,"zipCode":null,"zipCodeSuffix":null,"foreignPostalCode":null,"countryCode":null,"geoCode":null}]}],"transactionDetails":{"transactionID":"1234","statusCode":"0","statusMessage":"Success","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":"1","timeZone":"EST"}}';

var invoiceNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var lockStatus = '{ "lockDetails":{"lockUserId":"sm9121", "lockLevel":"Customer","lockTimeStamp":"20160808 05:45:00"},"transactionDetails":{"transactionID":"1223213","statusCode":"0","statusMessage":"Success", "sourceSystem":null,"startRow":"1","endRow":"400","totalRow":"1","timeZone":"EST"}}';

var customerNodeDetail = '{        "transactionDetails":        {            "transactionId": "123333",            "statusCode": "0",            "statusMessage": "Success",            "sourceSystem": null,            "startRow": "1",            "endRow": "400",            "totalRow": null,            "segment": null,            "rowCount": "1",            "timeZone": "EST"        },        "customerNodeDetails":        {            "customerNumber": "38531632",            "customerName": "IBM MSA",            "taxIdCity": "",            "taxIdState": "",            "salesSegment": "",            "accountClassification": "",            "specialCustomerBillCode": "",            "masterAgreementNumber": "",            "billingInquiryNumber": "",            "creditCheckAuthorizationNumber": "",            "salesATTId": "",            "paymentTerm": "",            "startDate": "20020225 00:00:00",            "customerProfileClassName": "",            "endCustomerName": "",            "externalCustomerTypeCode": "",            "externalCustomerNumber": "",            "postalCodeMaskRu": null,            "postalCod": null,            "city": null,            "stateProvinence": null,            "county": null,            "country": null,            "zipCode": null,            "zipCodeSuffix": null,            "dunsNumber": "",            "mdsId": "",            "address":            {                "addressType": "Customer Address",                "addressLine1": "2101 LAPEER RD,LAPEER,MI,48446",                "addressLine2": "",                "addressLine3": "",                "addressLine4": "",                "streetAddress": "",                "addressName": "",                "city": "LAPEER",                "floor": "",                "state": "MI",                "province": "",                "zipCode": "48446",                "zipCodeSuffix": "",                "foreignPostalCode": "",                "countyName": "",                "countryName": "",                "countryCode": null,                "geoCode": "",                "serviceLocationDetails": null            }        }    }';

var hierarchyNodeDetail = '{    "parentNodeDetails": {        "subAccountExcerpt": null,        "customerExcerpt": {            "customerId": "38531632",            "customerName": "IBM MSA"        },        "hierarchyExcerpt": null,        "bundleExcerpt": null,        "invoiceExcerpt": null,        "cdgexcerpt": null    },    "hierarchyNodeDetails": {        "custBillingHierarchyId": "40921031",        "startDate": "20150612 00:00:00",        "sequenceNumber": "10",        "endDate": "",        "description": "",        "interOfferRelinkDate": "",        "billingAsSubContractor": "",        "legalEntityCountryCode": "",        "ebillIndicator": "",        "specialMRCIndicator": "",        "nonBalanceIndicator": "",        "webInitialOrderIndicator": "",        "billControlModelCode": "",        "migrationDate": "",        "prohibitRelink": "",        "specialBid": "",        "specialBidActivityType": "",        "specialBidDetails": "",        "service": "",        "accountType": "",        "availableServices": "",        "regionalBiller": "",        "attLegalEntityName": "",        "billLocked": "",        "manualBillhierarchy": "",        "attLegalEntityCode": "",        "cfmStartDate": "12-JUN-15",        "socCountry": "",        "socCountryCode": "",        "ccfDate": "",        "billingAsSubcond": "",        "nonBalanceIndi": "",        "lspVendorCode": "",        "lspVendorName": ""    },    "transactionDetails": {        "transactionID": "123333",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "400",        "totalRow": null,        "segment": null,        "rowCount": "1",        "timeZone": "EST"    }}';

var bundleNodeDetail = '{        "transactionDetails":        {            "transactionID": "123333",            "statusCode": "0",            "statusMessage": "Success",            "sourceSystem": null,            "startRow": "1",            "endRow": "400",            "totalRow": null,            "segment": null,            "rowCount": "1",            "timeZone": "EST"        },        "parentNodeDetails":        {            "subAccountExcerpt": null,            "customerExcerpt":            {                "customerId": "38531632",                "customerName": "IBM MSA"            },            "hierarchyExcerpt":            {                "parentageLevel": "1",                "custBillingHierarchyId": "40921031",                "account1Number": "",                "description": "IBM MSA",                "hierarchyPointId": "164240405"            },            "bundleExcerpt": null,            "invoiceExcerpt": null,            "cdgexcerpt": null        },        "bundleNodeDetails":        {            "nodeType": "AB",            "nodeID": "8310000000363",            "nodeLabel": "",            "hierarchyPointID": "164240438",            "startDate": "20150612 00:00:00",            "endDate": "",            "regionalAccountNumber": "",            "customerLegalName": "",            "pcsHomerNumber": "",            "rollupOption": "",            "customerProfession": "",            "rollupDetails": "",            "vatTaxCode": "",            "vatExemptCertificateNumber": "",            "vatExemptReason": "",            "vatExemptCertificateStartDate": "",            "vatMaskRule": "",            "vatExemptCertificateEndDate": "",            "vatRegistrationNumber": "",            "taxPayerId": "",            "customerStateTaxId": "",            "customerCityTaxId": "",            "taxOffice": "",            "invoiceTaxType": "",            "taxWithholdStatusCode": "",            "ratingCurrency": "",            "attention": "",            "contractName": "",            "foreignPostalCode": null,            "countryCode": null,            "rgnlTaxExmptId": null,            "rgnlTaxExmptStrtDate": null,            "rgnlTaxExmptEndDate": null,            "interOffrRlnkDate": "",            "validationIndicator": null,            "crncyConvDate": null,            "fedGovConNumber": null,            "address":            {                "addressType": "Contract Address",                "addressLine1": "",                "addressLine2": "",                "addressLine3": "",                "addressLine4": "",                "streetAddress": null,                "addressName": "",                "city": "PASADENA",                "floor": "",                "state": "TX",                "province": "",                "zipCode": "77505",                "zipCodeSuffix": "",                "foreignPostalCode": "",                "countyName": "",                "countryName": "",                "countryCode": null,                "geoCode": "0144201222000",                "serviceLocationDetails": null            }        }    }';

var cdgNodeDetail = '{    "transactionDetails": {        "transactionID": "123333",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "400",        "totalRow": null,        "segment": null,        "rowCount": "1",        "timeZone": "EST"    },    "parentNodeDetails": {        "subAccountExcerpt": null,        "customerExcerpt": {            "customerId": "38531632",            "customerName": "IBM MSA"        },        "hierarchyExcerpt": {            "parentageLevel": "3",            "custBillingHierarchyId": "40921031",            "account1Number": "",            "description": "IBM MSA",            "hierarchyPointId": "164240405"        },        "bundleExcerpt": {            "parentageLevel": "2",            "account1Number": "8310001226058",            "description": "IBM MSA",            "hierarchyPointId": "164240438",            "custBillingHierarchyId": "40921031"        },        "invoiceExcerpt": {            "parentageLevel": "1",            "account1Number": "8310001226097",            "description": "IBM MSA",            "hierarchyPointId": "164240519",            "custBillingHierarchyId": "40921031"        },        "cdgexcerpt": null    },    "cdgNodeDetails": {        "hierarchyPointID": "164240521",        "startDate": "20150612 00:00:00",        "endDate": "",        "sequenceNumber": null,        "description": "IBM MSA",        "interOfferRelinkDate": "",        "foundationAccountNumber": "",        "customerAdminId": "",        "sourceBillerId": null,        "parentForeignActID": null,        "subAcntId": null,        "asscNonAcnt": null,        "fanId": null,        "fanNumber": null    }}';

var subaccountNodeDetail = '{    "transactionDetails": {        "transactionID": "1223213",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "400",        "totalRow": null,        "segment": null,        "rowCount": "1",        "timeZone": "EST"    },    "parentNodeDetails": {        "subAccountExcerpt": null,        "customerExcerpt": {            "customerId": "38531632",            "customerName": "IBM MSA"        },        "hierarchyExcerpt": {            "parentageLevel": "4",            "custBillingHierarchyId": "40921031",            "account1Number": "",            "description": "IBM MSA",            "hierarchyPointId": "164240405"        },        "bundleExcerpt": {            "parentageLevel": "3",            "account1Number": "8310001226058",            "description": "IBM MSA",            "hierarchyPointId": "164240438",            "custBillingHierarchyId": "40921031"        },        "invoiceExcerpt": {            "parentageLevel": "2",            "account1Number": "8310001226097",            "description": "IBM MSA",            "hierarchyPointId": "164240519",            "custBillingHierarchyId": "40921031"        },        "cdgexcerpt": {            "parentageLevel": "1",            "account1Number": "000001",            "description": "IBM MSA",            "hierarchyPointId": "164240521",            "custBillingHierarchyId": "40921031"        }    },    "subAccountNodeDetails": {        "nodeType": "AS",        "nodeID": "8310000000365",        "nodeLabel": "",        "hierarchyPointID": "2394",        "startDate": "20150612 00:00:00",        "endDate": "",        "sequenceNumber": "10",        "interOfferRelinkDate": "",        "premierFAN": "",        "serviceCenter": "",        "specialBillCode": "",        "serviceType": null,        "specialBillCodeTb": null,        "regionalAccountNumber": "",        "billRefTextMOW": null,        "arrangeText": null,        "originatingSystemCD": null,        "enterpriseNumber": null,        "deleteGBPAsso": null,        "dailPlanId": "",        "webOrderNumber": "",        "salesOffice": "",        "masterCustNumber": null,        "billGroup": "",        "ratedInvTab": null,        "foreignAccountList": [            {                "foreignAccountCustNumber": null,                "parentForeignAccountId": "21354",                "foreignAccountId": "21355",                "foreignAccountNumber": "877724159",                "foreignAccountTypeCode": "BAN",                "sourceBillerId": "Mobile-NBI",                "foreignAccountStartDate": "20070813 13:12:35",                "foreignAccountEndDate": null,                "foreignAccountNb": "877724159"            }        ],        "gbpCustomerName": null,        "addressList": {            "addressType": "Taxing Address",            "addressLine1": "",            "addressLine2": "",            "addressLine3": "",            "addressLine4": "",            "streetAddress": "17300 99 HIGHWAY",            "addressName": "",            "city": "LYNNWOOD",            "floor": "",            "state": "WA",            "province": "",            "zipCode": "",            "zipCodeSuffix": "",            "foreignPostalCode": "98037",            "countyName": null,            "countryName": null,            "countryCode": "1",            "geoCode": "9900000000000",            "serviceLocationDetails": null        }    }}';

var siteNodeDetail = '{    "transactionDetails": {        "transactionID": "123333",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "400",        "totalRow": null,        "segment": null,        "rowCount": "1",        "timeZone": "EST"    },    "parentNodeDetails": {        "subAccountExcerpt": {            "parentageLevel": "1",            "account1Number": "8310000000366",            "description": "IBM MSA",            "hierarchyPointId": "2394",            "custBillingHierarchyId": "104",            "custID": null,            "hierarchyId": null,            "accountType": null        },        "customerExcerpt": {            "customerId": "38531632",            "customerName": "IBM MSA"        },        "hierarchyExcerpt": {            "parentageLevel": "5",            "custBillingHierarchyId": "40921031",            "account1Number": "",            "description": "IBM MSA",            "hierarchyPointId": "164240405"        },        "bundleExcerpt": {            "parentageLevel": "4",            "account1Number": "8310001226058",            "description": "IBM MSA",            "hierarchyPointId": "164240438",            "custBillingHierarchyId": "40921031"        },        "invoiceExcerpt": {            "parentageLevel": "3",            "account1Number": "8310001226097",            "description": "IBM MSA",            "hierarchyPointId": "164240519",            "custBillingHierarchyId": "40921031"        },        "cdgexcerpt": {            "parentageLevel": "2",            "account1Number": "000001",            "description": "IBM MSA",            "hierarchyPointId": "164240521",            "custBillingHierarchyId": "40921031"        }    },    "siteNodeDetails": {        "nodeType": null,        "nodeID": null,        "nodeLabel": "",        "hierarchyPointID": "2405",        "account1Number": "",        "sequenceNumber": "110",        "interOfferRelinkDate": "",        "startDate": null,        "endDate": null,        "address": {            "addressType": "Service Location Address",            "addressLine1": "",            "addressLine2": "",            "addressLine3": "",            "addressLine4": "",            "streetAddress": "1129 W OLNEY RD",            "addressName": "SGS NA MINERALS SERV DIV",            "city": "NORFOLK",            "floor": null,            "state": "VA",            "province": "",            "zipCode": "23507",            "zipCodeSuffix": "1312",            "foreignPostalCode": "",            "countyName": "NORFOLK",            "countryName": "",            "countryCode": "",            "geoCode": "0147710044000",            "serviceLocationDetails": {                "floor": "",                "roomNumber": "",                "buildingName": ""            }        }    }}';

var children = '{    "transactionDetails": {        "transactionID": "123333",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "10",        "totalRow": null,        "segment": null,        "rowCount": "31",        "timeZone": "EST"    },    "childDetails": [        {            "parentageLevel": null,            "account1Number": "1717905096183",            "description": "IBM MSA",            "hierarchyPointId": "152097019",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717906639118",            "description": "IBM MSA",            "hierarchyPointId": "152826948",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717907987196",            "description": "IBM MSA",            "hierarchyPointId": "153976258",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717908853703",            "description": "IBM MSA",            "hierarchyPointId": "154779960",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717909713943",            "description": "IBM MSA",            "hierarchyPointId": "155346355",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910115219",            "description": "IBM MSA",            "hierarchyPointId": "155662830",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910318388",            "description": "IBM MSA",            "hierarchyPointId": "155856966",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910353733",            "description": "IBM MSA",            "hierarchyPointId": "155911701",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910512820",            "description": "IBM MSA",            "hierarchyPointId": "156122672",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717919326261",            "description": "IBM MSA",            "hierarchyPointId": "162950524",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        }    ]}';

// *** INITIAL SEARCH API ***
// GET http://hostname:port/services/BGWFIXT/v1/search/initialSearch/{SearchCategory}/{SearchType}/{SearchString}?start={Start}&end={End}&segment={Segment}
// Example: http://localhost:9070/services/BGWFIXT/v1/search/initialSearch/UpAccountNumber/invoice/1717908853703?start=1&end=400&segment=RETAIL,WHOLESALE,GOVT
// Valid categories: UpAccountNumber
// Valid types: invoice, subAccount, bundleAccount
// Valid search string: 10 or 13 digits
// Valid segments: RETAIL, WHOLESALE, GOVT (just those 3)

// API 50
app.get('/services/BGWFIXT/v1/search/initialSearch/:searchCategory/:searchType/:searchString', isAuthenticated, function (req, res) {
    console.log('Initial search called');
    console.log('category: ' + req.params.searchCategory);    
    console.log('type: ' + req.params.searchType);    
    console.log('string: ' + req.params.searchString);
    console.log('start: ' + req.query.start);
    console.log('end: ' + req.query.end);
    console.log('segment: ' + req.query.segment);
    console.log('user ID: ' + req.headers['userid']);
    console.log('transaction: ' + req.headers['transactionid']);
//    res.send('Initial search executed on server side [transaction ' + req.headers['transactionid'] + ']');
    res.setHeader('Content-Type', 'application/json');
    res.send(initialSearch);
});

// API 51
// invoice node detail
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/invoiceNode', isAuthenticated, function(req, res) {
    console.log('invoice node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(invoiceNodeDetail);
});

// API 57
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/siteNode', isAuthenticated, function(req, res) {
    console.log('site node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(siteNodeDetail);
});

// API 53
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/subaccountNode', isAuthenticated, function(req, res) {
    console.log('subaccount node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(subaccountNodeDetail);
});

// API 54
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/cdgNode', isAuthenticated, function(req, res) {
    console.log('cdg node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(cdgNodeDetail);
});

// API 52
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/bundleNode', isAuthenticated, function(req, res) {
    console.log('bundle node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(bundleNodeDetail);
});

// API 56
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/hierarchyNode', isAuthenticated, function(req, res) {
    console.log('hierarchy node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(hierarchyNodeDetail);
});

// API 55
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/customerNode', isAuthenticated, function(req, res) {
    console.log('customer node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(customerNodeDetail);
});

// API 58
app.get('/restservices/csi-billinggateway/v1/status/account', isAuthenticated, function(req, res) {
    console.log('lock status called');
    res.setHeader('Content-Type', 'application/json');
    res.send(lockStatus);
});

// API 60
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/childNode', isAuthenticated, function (req, res) {
    console.log('get children called');
    res.setHeader('Content-Type', 'application/json');
    res.send(children);
});


app.listen(port, function(err) {
   if (err) {
       return console.log('error in csibgw', err);
   }
    console.log('csibgw server started on port ' + port);
});