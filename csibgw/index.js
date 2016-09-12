var express = require('express');
var app = express();
var port = 9000;

app.get('/', function(req, res) {
    res.send('Basic GET is functional');
});

var initialSearch = '{"nodeDetails":[{"nodeType":"AS","nodeID":"8310001226402","nodeLabel":"CUSTOMBILLING","hierarchyPointID":"164241159","startDate":"2008092411:30:08","endDate":"","addressDetails":[{"addressType":null,"addressLine1":null,"addressLine2":null,"addressLine3":null,"addressLine4":null,"addressName":null,"city":null,"floor":null,"state":null,"province":null,"zipCode":null,"zipCodeSuffix":null,"foreignPostalCode":null,"countryCode":null,"geoCode":null}]}],"transactionDetails":{"transactionID":"1234","statusCode":"0","statusMessage":"Success","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":"1","timeZone":"EST"}}';

var invoiceNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var lockStatus = '{ "lockDetails":{"lockUserId":"sm9121", "lockLevel":"Customer","lockTimeStamp":"20160808 05:45:00"},"transactionDetails":{"transactionID":"1223213","statusCode":"0","statusMessage":"Success", "sourceSystem":null,"startRow":"1","endRow":"400","totalRow":"1","timeZone":"EST"}}';

//var customerNodeDetail;
//var hierarchyNodeDetail;
//var bundleNodeDetail;
//var cdgNodeDetail;
//var subaccountNodeDetail;
//var siteNodeDetail;

var customerNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var hierarchyNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var bundleNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var cdgNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var subaccountNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var siteNodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

var children = '{    "transactionDetails": {        "transactionID": "123333",        "statusCode": "0",        "statusMessage": "Success",        "sourceSystem": null,        "startRow": "1",        "endRow": "10",        "totalRow": null,        "segment": null,        "rowCount": "31",        "timeZone": "EST"    },    "childDetails": [        {            "parentageLevel": null,            "account1Number": "1717905096183",            "description": "IBM MSA",            "hierarchyPointId": "152097019",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717906639118",            "description": "IBM MSA",            "hierarchyPointId": "152826948",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717907987196",            "description": "IBM MSA",            "hierarchyPointId": "153976258",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717908853703",            "description": "IBM MSA",            "hierarchyPointId": "154779960",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717909713943",            "description": "IBM MSA",            "hierarchyPointId": "155346355",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910115219",            "description": "IBM MSA",            "hierarchyPointId": "155662830",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910318388",            "description": "IBM MSA",            "hierarchyPointId": "155856966",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910353733",            "description": "IBM MSA",            "hierarchyPointId": "155911701",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717910512820",            "description": "IBM MSA",            "hierarchyPointId": "156122672",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        },        {            "parentageLevel": null,            "account1Number": "1717919326261",            "description": "IBM MSA",            "hierarchyPointId": "162950524",            "custBillingHierarchyId": "33320982",            "custID": null,            "hierarchyId": null,            "hierarchyPointID": null,            "accountType": "I"        }    ]}';

// *** INITIAL SEARCH API ***
// GET http://hostname:port/services/BGWFIXT/v1/search/initialSearch/{SearchCategory}/{SearchType}/{SearchString}?start={Start}&end={End}&segment={Segment}
// Example: http://localhost:9070/services/BGWFIXT/v1/search/initialSearch/UpAccountNumber/invoice/1717908853703?start=1&end=400&segment=RETAIL,WHOLESALE,GOVT
// Valid categories: UpAccountNumber
// Valid types: invoice, subAccount, bundleAccount
// Valid search string: 10 or 13 digits
// Valid segments: RETAIL, WHOLESALE, GOVT (just those 3)

// API 50
app.get('/services/BGWFIXT/v1/search/initialSearch/:searchCategory/:searchType/:searchString', function (req, res) {
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
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/invoiceNode', function(req, res) {
    console.log('invoice node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(invoiceNodeDetail);
});

// API 57
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/siteNode', function(req, res) {
    console.log('site node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(siteNodeDetail);
});

// API 53
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/subaccountNode', function(req, res) {
    console.log('subaccount node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(subaccountNodeDetail);
});

// API 54
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/cdgNode', function(req, res) {
    console.log('cdg node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(cdgNodeDetail);
});

// API 52
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/bundleNode', function(req, res) {
    console.log('bundle node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(bundleNodeDetail);
});

// API 56
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/hierarchyNode', function(req, res) {
    console.log('hierarchy node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(hierarchyNodeDetail);
});

// API 55
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/customerNode', function(req, res) {
    console.log('customer node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(customerNodeDetail);
});

// API 58
app.get('/restservices/csi-billinggateway/v1/status/account', function(req, res) {
    console.log('lock status called');
    res.setHeader('Content-Type', 'application/json');
    res.send(lockStatus);
});

// API 60
app.get('/restservices/csi-billinggateway/v1/customerHierarchy/childNode', function (req, res) {
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