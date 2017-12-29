'user strict';
var mongoose = require('mongoose');
var modelSchemaInstance = mongoose.Schema;

var bookSchema = new modelSchemaInstance({
    isbn: { type: String, required: true, unique: true },
    title: String,
    author: String,
    price: Number,
    availableOn: Array
});

module.exports = mongoose.model('bookdatas', bookSchema);