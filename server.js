var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');



app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    



app.listen(8889);


/*Connect dB*/
mongoose.connect('mongodb://localhost/LMS');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 
    var bookSchema = mongoose.Schema({
      isbn: { type:String, required: true, unique: true },
      title: String,
      author: String,
      price: Number,
      availableOn:Array
        });
    
    
    var bookData = mongoose.model('bookData', bookSchema);
    
    /*var book1 = new bookData({
       
            "isbn": "ISBN-546-3789",
            "title": "Harry Potter",
            "author": "J.K. Rowling",
            "price": 1000,
            "availableOn": [
              "Amazon",
              "Snapdeal",
              "Ebay"
            ]
    });

    book1.save(function(err) {
      if (err) throw err;

      console.log('Book saved successfully!');
    });    
    */
    
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
    
    
    
    app.post('/book/new',function(req,res) {
     
    var book1 = new bookData({
       
            "isbn": req.body.isbn,
            "title": req.body.title,
            "author": req.body.author,
            "price": req.body.price,
            "availableOn": req.body.availableOn
    });

    book1.save(function(err,book1){
       
    if(err) 
        res.send(err);
    
    var data = {"message":"book is saved"};
        
        
    res.send(data);
    //res.end();
        
    });
      
});
    
    

app.post('/book/byisbn',function(req,res) {
     
        bookData.find({isbn:req.body.isbn},function(err, book) {
           
            
            if(err)
                res.send(err);
            
            res.json(book);
  
        });
        
    });
        

app.put('/book/update',function(req,res){
   
    bookData.find({isbn:req.body.isbn},function(err, book) {

        if(err)
                res.send(err);
            
           /* console.log(book[0].title);
            console.log(req.body.title);
        */
            book[0].title = req.body.title;
            book[0].author = req.body.author;
            book[0].price = req.body.price;
            
            book[0].save(function(err,book){
                
                if(err)
                    res.send(err);
                
                 var data = {"message":"book is updated"};
        
                 res.json(data);
            })
        
           
  
        });
    
    });
    
    
app.delete('/book/remove',function(req,res){
   
    bookData.find({isbn:req.body.isbn},function(err, book) {

        if(err)
             res.send(err);

            book[0].remove(function(err){
                
                if(err)
                    res.send(err);
                
                var data = {"message":"book is Deleted"};
        
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






