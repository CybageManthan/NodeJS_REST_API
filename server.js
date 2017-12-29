// Define the standard directory for default.json
process.env.CONFIG_DIR = "./config";

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// load depdendies.
var bookData = require('./models/productsModel.js');
var userData = require('./models/usersModel.js')
var appConfig = require('./config/config.js');


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded.support encoded bodies.
app.use(bodyParser.json());

var routes = require('./app.routes.js'); //importing route
routes(app); //register the route

//set port value from config.
app.set('port', appConfig.port);

// start the server ============================================================
app.listen(app.get('port'), function() {
    console.log('Node app started on port [', app.get('port'), '] on [' + new Date() + ']');
});


// allow browser though headers to access resources from different domain. 
// set header to allow all origins.
// allow http methods.

/* app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT, POST, DELETE');
        return res.status(200).json({});
    }
}); */

mongoose.Promise = global.Promise;

/*Connect dB*/
mongoose.connect('mongodb://localhost:8536/products');

// create a connection instance. 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {

    // handle favicon request.
    app.get("/favicon.ico", function(req, res) {
        res.status(200)
            .set({ 'Content-Type': 'image/x-icon' })
            .end();
    });

    app.get('/book/list', function(req, res) {

        // use mongoose to get all books in the database

        bookData.find(function(err, books) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(books);
            //  res.end();    // return all books in JSON format

        });
    });

    app.post('/book/new', function(req, res) {

        var book1 = new bookData({

            "isbn": req.body.isbn,
            "title": req.body.title,
            "author": req.body.author,
            "price": req.body.price,
            "availableOn": req.body.availableOn
        });

        book1.save(function(err, book1) {

            if (err)
                res.send(err);

            var data = { "message": "book is saved" };


            res.send(data);
            //res.end();

        });

    });



    app.post('/book/byisbn', function(req, res) {

        bookData.find({ isbn: req.body.isbn }, function(err, book) {


            if (err)
                res.send(err);

            res.json(book);

        });

    });


    app.put('/book/update', function(req, res) {

        bookData.find({ isbn: req.body.isbn }, function(err, book) {

            if (err)
                res.send(err);

            book[0].title = req.body.title;
            book[0].author = req.body.author;
            book[0].price = req.body.price;

            book[0].save(function(err, book) {

                if (err)
                    res.send(err);

                var data = { "message": "book is updated" };

                res.json(data);
            })



        });

    });


    app.delete('/book/remove', function(req, res) {

        bookData.find({ isbn: req.body.isbn }, function(err, book) {

            if (err)
                res.send(err);

            book[0].remove(function(err) {

                if (err)
                    res.send(err);

                var data = { "message": "book is Deleted" };

                res.json(data);

            })

        });

        /*        bookData.findOndAndRemove({isbn:req.body.isbn},function(err) {
                
                    if(err)
                        res.send(err);
                    
                    var data = {"message":"book is Deleted"};
                
                    res.json(data);
                
                });
                */

    });


});