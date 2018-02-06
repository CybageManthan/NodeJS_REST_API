var mongoose = require('mongoose');

var userData = require('./../models/usersModel.js')

exports.get_all_users = function(req, res) {

    // use mongoose to get all books in the database
    userData.find(function(err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(users); // return all books in JSON format
    });
};

// test someting here. i want check.

exports.verify_user = function(req, res) {

    var usersList = [];
    // use mongoose to get all books in the database
    userData.find(function(err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        // get the response.
        usersList = users;

        // check users.
        if (usersList && usersList[0].username === req.body.username) {
            console.log("username matched");
            var data = { "message": "users is proper" };
            res.json(data);
        }
    });
}