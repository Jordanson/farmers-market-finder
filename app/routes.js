// Dependencies
var mongoose        = require('mongoose');
var Market            = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all markets in the db
    app.get('/markets', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Market.find({});
        query.exec(function(err, markets){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all markets
            res.json(markets);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new markets in the db
    app.post('/markets', function(req, res){

        // Creates a new Market based on the Mongoose schema and the post bo.dy
        var newmarket = new Market(req.body);

        // New Market is saved in the db.
        newmarket.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new market
            res.json(req.body);
        });
    });
    
            // Retrieves JSON records for all markets that meet a certain set of query conditions
        app.post('/query/', function(req, res){

            // Grab all of the query parameters from the body.
            var lat             = req.body.latitude;
            var long            = req.body.longitude;
            var distance        = req.body.distance;
            var address         = req.body.address;

            // Opens a generic Mongoose Query. Depending on the post body we will...
            var query = Market.find({});

            // ...include filter by Max Distance (converting miles to meters)
            if(distance){

                // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
                query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                    // Converting meters to miles. Specifying spherical geometry (for globe)
                    maxDistance: distance * 1609.34, spherical: true});
            }

            // ...include filter by Address
            if(address){
                query = query.where('address').equals(address);
            }

            // Execute Query and Return the Query Results
            query.exec(function(err, markets){
                if(err)
                    res.send(err);

                // If no errors, respond with a JSON of all markets that meet the criteria
                res.json(markets);
            });
        });

    // Retrieves JSON records for all markets who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Market.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});
        }

        // ... Other queries will go here ... 

        // Execute Query and Return the Query Results
        query.exec(function(err, markets){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all markets that meet the criteria
            res.json(markets);
        });
    });
};  