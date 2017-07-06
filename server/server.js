var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


// Name of the collection we are using for MongoDB
var CONTACTS_COLLECTION = "contacts";

// Create new express application
var app = express();


// for parsing application/json
app.use(logger('dev'));
app.use(cookieParser());
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Create link to Angular build directory
app.use(express.static(path.join(__dirname, '../dist/')));


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 4300, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


/***** CONTACTS API ROUTES BELOW *****/

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    // 500 - Internal Server Error
    res.status(code || 500).json({"error": message});
}


/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */


app.get("/api/contacts", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({
        // finds all matching documents, returns a cursor (pointer to result
        // of query) and then converts to an array of documents
    }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            // 200 - OK
            // json() sets correct headers and applies JSON.stringify()
            res.status(200).json(docs);
        }
    });
});


app.post("/api/contacts", function(req, res) {
    // create new contact from request body - req.body contains key-value pairs
    // of data submitted in the request body. By default, it is undefined, and is
    // populated when you use body-parsing middleware such as body-parser and multer.
    var newContact = req.body;
    console.log('inside /api/contacts POST');

    // if new contact is missing name
    if (!req.body.name) {
        handleError(res, "Invalid user input (name)", "Must provide a name.", 400);
    }

    // if new contact is missing email
    if (!req.body.email) {
        handleError(res, "Invalid user input (email)", "Must provide an email.", 400);
    }

    // insert the new contact
    db.collection(CONTACTS_COLLECTION).insert(newContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            // 201 - Created
            res.status(201).json(doc.ops[0]);
        }
    });
});


/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */


app.get("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});


app.put("/api/contacts/:id", function(req, res) {

    // get the contact object from the request body
    var updatedContact = req.body;
    // remove the id, we cannot change it
    delete updatedContact._id;

    // updateOne(<filter> selection criteria / query selectors, <update> modifications to apply, callback function)
    db.collection(CONTACTS_COLLECTION).updateOne( { _id: new ObjectID(req.params.id) }, updatedContact, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            updatedContact._id = req.params.id;
            res.status(200).json(updatedContact);
        }
    });
});


app.delete("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});
