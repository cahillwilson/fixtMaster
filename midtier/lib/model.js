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
        title: String,
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
    
    var Topfive = new Schema({
        nodeType: String,
        displayTags: [String]
    });
    
    var Layout = new Schema({
        nodeType: String,
        field: String,
        category: String,
        column: Number,
        row: Number,
        displayName: String
    });
    
    var Environment = new Schema({
        userId: String,
        sandboxes: [String]
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
        Topfives: mongoose.model('Topfives', Topfive),
        Layouts: mongoose.model('Layouts', Layout),
        Statuses: mongoose.model('Statuses', Status),
        Environments: mongoose.model('Environments', Environment),
        Transactions: mongoose.model('Transactions', Transaction),
        RelinkCards: mongoose.model('RelinkCards', RelinkCard),
        UnifyCards: mongoose.model('UnifyCards', UnifyCard)
    };
    return models;
}