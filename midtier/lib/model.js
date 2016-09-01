module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    
    var Node = new Schema({
        nodeId: String,
        hierarchyPointId: String,
        timestamp: Number,
        body: String
    });
    
    var Card = new Schema({
        name: String,
        userId: String,
        nodeId: String,
        nodeDetails: Node,
        sandboxIndex: Number,
        hierarchy: Number,
        timestamp: Number
    });
    
    var Sandbox = new Schema({
        name: String,
        userId: String,
        timestamp: Number,
        cards: [Card]
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
    
    // This is the status of a transaction
    var Status = new Schema({
        name: String,
        index: Number
    });
    
    
    // Each "transaction" is on a single node;
    // A traditional transaction will be a collection of these.
    // Note that each of these will have a unique transaction ID
    var Transaction = new Schema({
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
        transactions: [Schema.Types.ObjectId]
    });
    
    var models = {
        Sandboxes: mongoose.model('Sandboxes', Sandbox),
        Cards: mongoose.model('Cards', Card),
        Roles: mongoose.model('Roles', Role),
        Users: mongoose.model('Users', User),
        Nodes: mongoose.model('Nodes', Node),
        Statuses: mongoose.model('Statuses', Status),
        Transactions: mongoose.model('Transactions', Transaction),
        RelinkCards: mongoose.model('RelinkCards', RelinkCard),
        UnifyCards: mongoose.model('UnifyCards', UnifyCard)
    };
    return models;
}