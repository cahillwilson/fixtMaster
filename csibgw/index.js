var express = require('express');
var app = express();
var port = 9000;

app.get('/', function(req, res) {
    res.send('Basic GET achieved');
});

app.get('/foo', function(req, res) {
    res.send('Got the foo call');
});
var initialSearch = '{"nodeDetails":[{"nodeType":"AS","nodeID":"8310001226402","nodeLabel":"CUSTOMBILLING","hierarchyPointID":"164241159","startDate":"2008092411:30:08","endDate":"","addressDetails":[{"addressType":null,"addressLine1":null,"addressLine2":null,"addressLine3":null,"addressLine4":null,"addressName":null,"city":null,"floor":null,"state":null,"province":null,"zipCode":null,"zipCodeSuffix":null,"foreignPostalCode":null,"countryCode":null,"geoCode":null}]}],"transactionDetails":{"transactionID":"1234","statusCode":"0","statusMessage":"Success","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":"1","timeZone":"EST"}}';

var nodeDetail = '{"transactionDetails":{"transactionID":"1234","statusCode":"MX_0000","statusMessage":"TransactionSuccess","sourceSystem":null,"startRow":"1","endRow":"400","totalRow":null,"segment":null,"rowCount":null,"timeZone":null},"parentNodeDetails":{"customerExcerpt":{"customerId":"33993395","customerName":"TESTORTABNBETA2"},"hierarchyExcerpt":{"parentageLevel":"2","custBillingHierarchyId":"36298697","account1Number":"","description":"","hierarchyPointId":"124988285"},"bundleExcerpt":{"parentageLevel":"1","account1Number":"50000349163","description":"","hierarchyPointId":"124988286","custBillingHierarchyId":"36298697"},"invoiceExcerpt":null,"cdgexcerpt":null},"invoiceNodeDetails":{"nodeType":"I","nodeID":"1717858114129","nodeLabel":"UAMCITRIXDROIDLEAD","hierarchyPointID":"124988287","startDate":"19-APR-01","endDate":"","address":{"addressType":"RE","addressLine1":"650NORTHLANDBLVDSTE600","addressLine2":"CINCINNATI,OH,452403249","addressLine3":"","addressLine4":"","addressName":"AT&T","city":"CINCINNATI","floor":"","state":"OH","province":"","zipCode":"45240","zipCodeSuffix":"3249","foreignPostalCode":"","countryCode":"","geoCode":"0133061201000"}}}';

// *** INITIAL SEARCH API ***
// GET http://hostname:port/services/BGWFIXT/v1/search/initialSearch/{SearchCategory}/{SearchType}/{SearchString}?start={Start}&end={End}&segment={Segment}
// Example: http://localhost:9070/services/BGWFIXT/v1/search/initialSearch/UpAccountNumber/invoice/1717908853703?start=1&end=400&segment=RETAIL,WHOLESALE,GOVT
// Valid categories: UpAccountNumber
// Valid types: invoice, subAccount, bundleAccount
// Valid search string: 10 or 13 digits
// Valid segments: RETAIL, WHOLESALE, GOVT (just those 3)

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
//    res.send('{"transactionDetails":{"transactionID": "12340000","statusCode": "0","statusMessage": "Success","sourceSystem": "FIXT","startRow": "1","endRow": "400","totalRow": null,"segment": "RETAIL,WHOLESALE,GOVT"},"nodeDetails":[{"nodeType": "I","nodeID": "1717908853703","nodeLabel": "My Invoice Label","hierarchyPointID": "154779960","startDate": "12-JUL-05","endDate": null,"addressDetails":[{"addressType": null,"addressLine1": "42 BROADWAY FL 20","addressLine2": "BOWLING GREEN","addressLine3": "","addressLine4": null,"addressName": "SGS NORTH AMERICA","city": "NY","floor": null,"state": "NY","province": null,"zipCode": "10004","zipCodeSuffix": null,"foreignPostalCode": null,"countryCode": "US","geoCode": null}]}]}');
    res.send(initialSearch);
});


// invoice node detail
app.get('/services/BGWFIXT/v1/hierarchy/invoiceNode', function(req, res) {
    console.log('invoice node detail called for account ' + req.query.accountNumber); 
    res.setHeader('Content-Type', 'application/json');
    res.send(nodeDetail);
});


app.listen(port, function(err) {
   if (err) {
       return console.log('error in csibgw', err);
   }
    console.log('csibgw server started on port ' + port);
});