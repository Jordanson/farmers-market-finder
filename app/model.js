// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Market Schema. This will be the basis of how market data is stored in the db
var MarketSchema = new Schema({
    marketname: {type: String, required: true},
    address: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

// Sets the created_at parameter equal to the current time
MarketSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
MarketSchema.index({location: '2dsphere'});

// Exports the MarketSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('scotch-user', MarketSchema);