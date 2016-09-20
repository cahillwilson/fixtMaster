// TODO: URLs longer than 2048 characters are not allowed; set up code to verify, and a test for it.
var logger = require('./lib/logger');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
//var dbUrl = 'mongodb://testuser:notsecurepwd@ds015325.mlab.com:15325/exampledata';
var dbUrl = 'mongodb://127.0.0.1/fixt'
mongoose.connect(dbUrl);
var models = require('./lib/model')(mongoose);
app.use(bodyParser.json());
var traverse = require('traverse');

logger.info('FIXT logging enabled');

var topfive = [];
models.Topfives.find({}, function (err, result) {
    logger.info('finding topfive now');
    if (err) {
        logger.error('error during topfive lookup');
    } else {
        logger.info('search complete, count is ' + Object.keys(result).length);
        topfive = result;
    }
});

var layout = [];
models.Layouts.find({}, function (err, result) {
    logger.info('finding layouts now');
    if (err) {
        logger.error('error during layouts lookup');
    } else {
        logger.info('search complete, count is ' + Object.keys(result).length);
        layout = result;
    }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, userid");
  next();
});

// API 24 GET USER ENVIRONMENT
router.get('/environment', function (req, res) {
    logger.info('Getting saved environment');
    models.Environments.findOne({
        'userId': req.headers['userid']
    }, function(err, enviro) {
        if (err) {
            res.send('error in get environment call');
        } else {
            res.send(enviro);
        }
    });
});

// API 25 UPDATE USER ENVIRONMENT
router.post('/environment', function (req, res) {
    logger.info('Updating saved environment');
    logger.info('input: ' + JSON.stringify(req.body));
    models.Environments.findOneAndUpdate({'userId': req.headers['userid']}, {
        'userId': req.headers['userid'],
        'sandboxes': [req.body.sandboxes]
    }, {upsert: true, new: true}, function (err, enviro) {
        if (err) {
            res.send('error in update environment call');
        } else {
            res.send(enviro);
        }
    });
});

// API 1: GET ALL SANDBOXES FOR USER
router.get('/sandbox', function (req, res, next) {
    logger.info('get all sandboxes [user ' + req.headers['userid'] + ']');
    var sandboxes = [];
    models.Sandboxes.find({
        'userId': req.headers['userid']
    }, function (err, sandboxes) {
        res.send(sandboxes);
    });
});

// API 2: GET SANDBOX
router.get('/sandbox/:sandboxId', function (req, res, next) {
    logger.info('get sandbox ' + req.params.sandboxId + ' [user ' + req.headers['userid'] + ']');
    var sandbox = models.Sandboxes.findOne({
        'userId': req.headers['userid'],
        '_id': req.params.sandboxId
    }, function (err, sandbox) {
        res.send(sandbox);
    });
});

// Get a card (open a card)
router.get('/card/:cardId', function (req, res, next) {
    logger.info('get card ' + req.params.cardId + ' from sandbox ' + req.params.sandboxId + ' [user ' + req.headers['userid'] + ']');
    models.Cards.find({
        'userId': req.headers['userid'],
        '_id': req.params.cardId
    }, function (err, card) {
        res.send(card);
    });
});

// Create a card and add it to sandbox
router.post('/sandbox/:sandboxId/:nodeId', function (req, res) {
    logger.info('create card for node ' + req.params.nodeId);
    var timenow = Math.floor(new Date() / 1000);
    var card = new models.Cards({
        name: req.params.cardName,
        timestamp: timenow,
        nodeId: req.params.nodeId,
        userId: req.headers['userid']
    });
    models.Sandboxes.findByIdAndUpdate(
        req.params.sandboxId, {
            $push: {
                cards: card
            },
            $set: {
                timestamp: timenow
            }
        }, {
            safe: true,
            upsert: true
        },
        function (err, model) {
            logger.log(err);
        }
    );
    card.save(function (err, card) {
        if (err) {
            res.send('error during card persist');
        } else {
            logger.info('Card saved');
        }
    });
    res.send(card);
});

router.post('/node/:nodeid/card', function (req, res) {
    logger.info('create card for node ' + req.params.nodeId);
    var card = new models.Cards({
        name: req.params.cardName,
        timestamp: Math.floor(new Date() / 1000),
        nodeId: req.params.nodeId,
        userId: req.headers['userid']
    });
    card.save(function (err, card) {
        if (err) {
            res.send('error during card persist');
        } else {
            logger.info('Card saved');
        }
    });
    res.send(card);
});

// Delete a card
router.delete('/card/:cardId', function (req, res) {
    logger.info('Delete card ' + req.params.cardId);
    models.Cards.remove({
        _id: req.params.cardId
    }, function (err) {
        if (err) {
            res.send('Error during card deletion');
        } else {
            res.send('Card deleted');
        }
    });
});

router.put('/sandbox/:sandboxId/cards', function (req, res) {
    logger.info('adding cards to sandbox');
    // Verify that the sandbox ID is good by fetching the sandbox
    // Verify that the card IDs are good by fetching the cards
    // Add the cards to the sandbox only if they aren't there already
    // Return the modified sandbox
    res.send('added cards to sandbox');
});

// Close card
router.put('/sandbox/:sandboxId/:cardId', function (req, res) {
    logger.info('close card ' + req.params.cardId);
    // TODO: update the card in mongo
    res.send('Card ' + req.params.cardId + ' closed');
});


// Create a sandbox
router.post('/sandbox', function (req, res, next) {
    logger.info('create sandbox "' + req.body.name + '" [user ' + req.headers['userid'] + ']');
    var sandbox = new models.Sandboxes({
        name: req.body.name,
        userId: req.headers['userid'],
        timestamp: Math.floor(new Date() / 1000)
    });
    sandbox.save(function (err, sandbox) {
        if (err) {
            return console.error(err);
        }
        logger.info('Sandbox saved, object id ' + sandbox._id);
    });
    logger.info('creating sandbox entry with name ' + req.body.name);
    res.send(sandbox);
});

// Delete a sandbox
router.delete('/sandbox/:sandboxId', function (req, res, next) {
    logger.info('delete sandbox ' + req.params.sandboxId);
    models.Sandboxes.remove({
        _id: req.params.sandboxId
    }, function (err) {
        if (err) {
            res.send('error deleting sandbox');
        } else {
            res.send('sandbox deleted');
        }
    });
});

router.get('/lockStatus', function (req, res) {
    logger.info('requesting lock status');
    // customerId, hierarchyPointId
    request({
        url: 'http://localhost:9000/restservices/csi-billinggateway/v1/status/account',
        qs: {
            customerId: req.query.customerId,
            hierarchyPointId: req.query.hierarchyPointId
        },
        auth: {
            user: 'fedtest_bgw',
            pass: 'fedtest_bgw0805',
            sendImmediately: true
        },
        method: 'GET',
        headers: {
            'TransactionID': '1234',
            'UserID': req.headers['userid']
        }
    }, function (error, response, body) {
        logger.info('lock status API call completed');

        if (error) {
            logger.info('error during lock status API execution');
            res.send('error during lock status check');
        } else {
//            res.set(response.headers);
            res.send(JSON.parse(body));
        }
    });
});


// Execute initial search
router.get('/initialSearch/:searchCategory/:searchType/:searchString', function (req, res) {
    logger.info('initial search called');
    request({
        url: 'http://localhost:9000/services/BGWFIXT/v1/search/initialSearch/' + req.params.searchCategory + '/' + req.params.searchType + '/' + req.params.searchString,
        qs: {
            start: req.query.start,
            end: req.query.end,
            segment: req.query.segment
        },
        auth: {
            user: 'fedtest_bgw',
            pass: 'fedtest_bgw0805',
            sendImmediately: true
        },
        method: 'GET',
        headers: {
            'TransactionID': '1234',
            'UserID': req.headers['userid']
        }
    }, function (error, response, body) {
        logger.info('initial search api call completed');
        if (error) {
            logger.info('An error occurred during backend search');
            res.send('something bad happened during search');
        } else {
            models.Users.findOne({
                'userId': req.headers['userid']
            }, function (err, user) {
                if (err) {
                    logger.info('db lookup error for user');
                    res.send('Lookup error');
                } else if (user === null) {
                    logger.info('user is null');
                    res.send('Invalid user');
                } else {
                    logger.info('user ' + user.name + ' found');
                    logger.info('user role: ' + user.role);
                    models.Roles.findOne({
                        'index': user.role
                    }, function (err, role) {
                        logger.info('role: ' + role.name);
                        logger.info('editable: ' + role.editableFields);
                        logger.info('unreadable: ' + role.unreadableFields);
                        var bodyobj = JSON.parse(body);
                        for (var i = 0; i < role.unreadableFields.length; i++) {
                            var removeTag = role.unreadableFields[i];
                            delete bodyobj.nodeDetails[0][removeTag];
                        }
                        bodyobj.editableFields = role.editableFields;
//                        res.set(response.headers);
                        res.send(bodyobj);
                    });
                }
            });

        }
    });
});

// API 60 GET CHILDREN
router.get('/node/:nodeID/children', function (req, res) {
    logger.info('requesting child info');
    request({
        url: 'http://localhost:9000/restservices/csi-billinggateway/v1/customerHierarchy/childNode',
        qs: {
            hierarchyPointId: req.params.nodeID
        },
        auth: {
            user: 'fedtest_bgw',
            pass: 'fedtest_bgw0805',
            sendImmediately: true
        },
        method: 'GET'
    }, function(error, response, body) {
        logger.info('get children call completed');
        if (error) {
            logger.info('error during get children API call');
            res.send('error during get children call');
        } else {
//            res.set(response.headers);
            res.send(JSON.parse(body));
        }
    });
});

router.get('/node/:nodeID/users', function (req, res) {
    logger.info('requesting all node users');
    // search for cards whose node id is :nodeID
    // fish out the user IDs from the results
    var users = models.Cards.find({
        'nodeId': req.params.nodeID
    }, 'userId', function (err, users) {
        logger.info('node users found');
        res.send(users);
    });

});

// API 51
// Execute invoice node detail call
router.get('/invoiceDetail', function (req, res) {
    logger.info('Invoice node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    // FIXME: Temporarily removed cached node until cached is processed for role etc.
    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'invoiceNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'invoiceNode', res);
        }
    });
});

// API 53
// Execute subaccount node detail call
router.get('/subaccountDetail', function (req, res) {
    logger.info('Subaccount node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    // FIXME: Temporarily removed cached node until cached is processed for role etc.
    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'subaccountNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'subaccountNode', res);
        }
    });
});

// API 52
// Execute bundle node detail call
router.get('/bundleDetail', function (req, res) {
    logger.info('Bundle node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    // FIXME: Temporarily removed cached node until cached is processed for role etc.
    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'bundleNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'bundleNode', res);
        }
    });
});

// API 55
// Execute customer node detail call
router.get('/customerDetail', function (req, res) {
    logger.info('Customer node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'customerNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'customerNode', res);
        }
    });
});

// API 54
// Execute cdg node detail call
router.get('/cdgDetail', function (req, res) {
    logger.info('CDG node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'cdgNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'cdgNode', res);
        }
    });
});

// API 56
// Execute hierarchy node detail call
router.get('/hierarchyDetail', function (req, res) {
    logger.info('Hierarchy node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'hierarchyNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'hierarchyNode', res);
        }
    });
});

// API 57
// Execute site node detail call
router.get('/siteDetail', function (req, res) {
    logger.info('Site node detail called');
    // TODO: Check if mongo has the node already and use it if so
    var cachedNode;
    var acctQuery = models.Nodes.findOne({
        nodeId: '"' + req.query.accountNumber + '"'
    });
    var hierarchyQuery = models.Nodes.findOne({
        hierarchyPointId: '"' + req.query.hierarchyPointId + '"'
    });
    var query;

    if (req.query.accountNumber) {
        query = acctQuery;
    } else {
        query = hierarchyQuery;
    }

    query.exec(function (err, cachedNode) {
        if (err) {
            logger.info('error during cache lookup, calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'siteNode', res);
            //        } else if (cachedNode) {
            //            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
            //            prepareNodeForCard(cachedNode, true, res);
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'siteNode', res);
        }
    });
});

function prepareNodeForCard(body, fromCache, res) {
    models.Users.findOne({
        'userId': userId
    }, function (err, user) {
        if (err) {
            logger.info('db lookup error for user');
            res.send('Lookup error');
        } else if (user === null) {
            logger.info('user is null');
            res.send('Invalid user');
        } else {
            logger.info('user ' + user.name + ' found');
            logger.info('user role: ' + user.role);
            models.Roles.findOne({
                'index': user.role
            }, function (err, role) {
                logger.info('role: ' + role.name);
                logger.info('editable: ' + role.editableFields);
                logger.info('unreadable: ' + role.unreadableFields);
                var bodyobj = JSON.parse(body);
                var node = new models.Nodes({
                    nodeId: JSON.stringify(bodyobj.invoiceNodeDetails.nodeID),
                    hierarchyPointId: JSON.stringify(bodyobj.invoiceNodeDetails.hierarchyPointID),
                    timestamp: Math.floor(new Date() / 1000),
                    body: body
                });
                node.save(function (err, node) {
                    if (err) {
                        return console.error(err);
                    }
                    logger.info('Node saved, object id ' + node._id);
                });
                for (var i = 0; i < role.unreadableFields.length; i++) {
                    var removeTag = role.unreadableFields[i];
                    delete bodyobj.invoiceNodeDetails[removeTag];
                }
                bodyobj.editableFields = role.editableFields;
                // TODO: Add top 5 and layout tags
//                res.set(response.headers);
                res.send(bodyobj);
            });
        }
    });

};

function findNode(accountNumber, hierarchyPointId, userId, nodeTypeIndicator, res) {
    logger.info('finding node in CSIBGW');
    request({
        url: 'http://localhost:9000/restservices/csi-billinggateway/v1/customerHierarchy/' + nodeTypeIndicator,
        qs: {
            accountNumber: accountNumber,
            hierarchyPointId: hierarchyPointId
        },
        auth: {
            user: 'fedtest_bgw',
            pass: 'fedtest_bgw0805',
            sendImmediately: true
        },
        method: 'GET',
        headers: {
            'TransactionID': '1234',
            'UserID': userId
        }
    }, function (error, response, body) {
        logger.info('node detail search api call completed');
        if (error) {
            logger.info('An error occurred during backend search');
            res.send('something bad happened during search');
        } else {
            var bodyobj = JSON.parse(body);
            var node;
            switch (nodeTypeIndicator) {
                case "invoiceNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.invoiceNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.invoiceNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "bundleNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.bundleNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.bundleNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "cdgNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.cdgNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.cdgNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "customerNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.customerNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.customerNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "hierarchyNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.hierarchyNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.hierarchyNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "siteNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.siteNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.siteNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
                case "subaccountNode":
                    node = new models.Nodes({
                        nodeId: JSON.stringify(bodyobj.subAccountNodeDetails.nodeID),
                        hierarchyPointId: JSON.stringify(bodyobj.subAccountNodeDetails.hierarchyPointID),
                        timestamp: Math.floor(new Date() / 1000),
                        body: body
                    });
                    break;
            }
//            logger.info('creating the node object');
//            var node = new models.Nodes({
//                nodeId: JSON.stringify(bodyobj.nodeDetails.nodeID),
//                hierarchyPointId: JSON.stringify(bodyobj.nodeDetails.hierarchyPointID),
//                timestamp: Math.floor(new Date() / 1000),
//                body: body
//            });
            logger.info('saving the node in the db');
            node.save(function (err, node) {
                if (err) {
                    return console.error(err);
                }
                logger.info('Node saved, object id ' + node._id);
            });
            models.Users.findOne({
                'userId': userId
            }, function (err, user) {
                if (err) {
                    logger.info('db lookup error for user');
                    res.send('Lookup error');
                } else if (user === null) {
                    logger.info('user is null');
                    res.send('Invalid user');
                } else {
                    logger.info('user ' + user.name + ' found');
                    logger.info('user role: ' + user.role);
                    models.Roles.findOne({
                        'index': user.role
                    }, function (err, role) {
                        logger.info('role: ' + role.name);
                        logger.info('editable: ' + role.editableFields);
                        logger.info('unreadable: ' + role.unreadableFields);
                        for (var i = 0; i < role.unreadableFields.length; i++) {
                            var removeTag = role.unreadableFields[i];
                            delete bodyobj.invoiceNodeDetails[removeTag];
                        }
                        bodyobj.editableFields = role.editableFields;
                        var foundfive = topfive.filter(function (item) {
                            return item.nodeType == nodeTypeIndicator;
                        });
                        bodyobj.topfive = foundfive;
                        var foundlayout = layout.filter(function (item) {
                            return item.nodeType == nodeTypeIndicator;
                        });
                        bodyobj.layout = foundlayout;
//                        res.set(response.headers);
                        res.send(bodyobj);
                    });
                }
            });

        }
    });

};


app.use('/fixt', router);

var server = app.listen(3000, function () {
    logger.info('Server started on port 3000');
});
