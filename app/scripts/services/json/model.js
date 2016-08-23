module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    
    var Sandbox = new Schema({
        name: String,
        userId: String,
        cards: [Schema.Types.ObjectId]
    });
    
    var Card = new Schema({
        name: String,
        id: Schema.Types.ObjectId,
        nodeId: String,
        hierarchy: Number
    });
    
    var Role = new Schema({
        name: String,
        index: Number,
        editableFields: [String],
        unreadableFields: [String]
    });
    
    var User = new Schema({
        name: String,
        userId: String,
        role: Number
    });
    
    var Node = new Schema({
        nodeId: String,
        hierarchyPointId: String,
        body: String
    });

    // This is the status of a transaction
    var Status = new Schema({
        name: String,
        index: Number
    });
    
    
    // Each "transaction" is on a single node;
    // A traditional transaction will be a collection of these.
    // Note that each of these will have a unique transaction ID
    var TransactionFoo = new Schema({
        transactionId: Number,
        type: Number,
        currentParentId: String,
        newParentId: String,
        cardId: Schema.Types.ObjectId,
        status: Number
    });
    
    var RelinkCard = new Schema({
        userId: String,
        transactions: [Schema.Types.ObjectId]
    });
    
    var UnifyCard = new Schema({
        userId: String,
        cards: [Schema.Types.ObjectId]
    });
    
    var models = {
        Sandboxes: mongoose.model('Sandboxes', Sandbox),
        Cards: mongoose.model('Cards', Card),
        Roles: mongoose.model('Roles', Role),
        Users: mongoose.model('Users', User),
        Nodes: mongoose.model('Nodes', Node),
        Statuses: mongoose.model('Statuses', Status),
        TransactionFoos: mongoose.model('TransactionFoos', TransactionFoo),
        RelinkCards: mongoose.model('RelinkCards', RelinkCard),
        UnifyCards: mongoose.model('UnifyCards', UnifyCard)
    };
    return models;
}