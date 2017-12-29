'user strict';
var mongoose = require('mongoose');
var modelSchemaInstance = mongoose.Schema;

var userSchema = new modelSchemaInstance({
    userid: Number,
    username: String,
    password: String
});

module.exports = mongoose.model('users', userSchema);