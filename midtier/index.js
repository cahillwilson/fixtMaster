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

// topFive table = nodeType string, displayTags array
var topfive = [];
models.Topfives.find({}, function (err, result) {
    logger.info('finding topfive now');
    if (err) {
        logger.error('error during topfive lookup');
    } else {
        logger.info('search complete, count is ' + Object.keys(result).length);
        topfive = result;
//        var foundfive = topfive.filter(function(item) {
//            return item.nodeType == 'I';
//        });
//        logger.info('found five: ' + foundfive);
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

// Get all sandboxes for the given user
router.get('/sandbox', function (req, res, next) {
    logger.info('get all sandboxes [user ' + req.headers['userid'] + ']');
    var sandboxes = [];
    models.Sandboxes.find({
        'userId': req.headers['userid']
    }, function (err, sandboxes) {
        res.send(sandboxes);
    });
});

// Get a sandbox
router.get('/sandbox/:sandboxId', function (req, res, next) {
    logger.info('get sandbox ' + req.params.sandboxId + ' [user ' + req.headers['userid'] + ']');
    var sandbox = models.Sandboxes.find({
        'userId': req.headers['userid'],
        '_id': req.params.sandboxId
    }, function (err, sandbox) {
        res.send(sandbox);
    });
});

// TODO: Revisit whether a sandbox is required here or not
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

// Close card
router.put('/sandbox/:sandboxId/:cardId', function (req, res, next) {
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
    })
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
                        res.set(response.headers);
                        res.send(bodyobj);
                    });
                }
            });

        }
    });
});

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
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'I', res);
//        } else if (cachedNode) {
//            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
//            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'I', res);
        }
    });
});

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
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'C', res);
//        } else if (cachedNode) {
//            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
//            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'C', res);
        }
    });
});

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
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'CDG', res);
//        } else if (cachedNode) {
//            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
//            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], 'CDG', res);
        }
    });
});

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
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], res);
        } else if (cachedNode) {
            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            res.send(JSON.parse(cachedNode.body));
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            // TODO: get node from backend
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], res);
        }
    });
});

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
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], res);
        } else if (cachedNode) {
            logger.info('node found in cache: ' + cachedNode);
            // TODO: Body is the whole Node, you must still filter based on role!
            //            res.send(JSON.parse(cachedNode.body));
            prepareNodeForCard(cachedNode, true, res);
        } else {
            logger.info('Node not found in cache; calling CSIBGW');
            findNode(req.query.accountNumber, req.query.hierarchyPointId, req.headers['userid'], res);
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
                res.set(response.headers);
                res.send(bodyobj);
            });
        }
    });

};

function findNode(accountNumber, hierarchyPointId, userId, nodeTypeIndicator, res) {
    logger.info('finding node in CSIBGW');
    request({
        url: 'http://localhost:9000/services/BGWFIXT/v1/hierarchy/invoiceNode',
        qs: {
            accountNumber: accountNumber,
            hierarchyPointId: hierarchyPointId
        },
        method: 'GET',
        headers: {
            'TransactionID': '1234',
            'UserID': userId
        }
    }, function (error, response, body) {
        logger.info('initial search api call completed');
        if (error) {
            logger.info('An error occurred during backend search');
            res.send('something bad happened during search');
        } else {
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
                        // TODO: Add layout tags
                        var foundfive = topfive.filter(function(item) {
                            return item.nodeType == nodeTypeIndicator;
                        });
                        bodyobj.topfive = foundfive;
                        var foundlayout = layout.filter(function (item) {
                            return item.nodeType == nodeTypeIndicator;
                        });
                        bodyobj.layout = foundlayout;
                        res.set(response.headers);
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
