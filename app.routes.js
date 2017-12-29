'use strict';

module.exports = function(app) {

    var usersController = require('./api/users.js');

    app.route('/app/users')
        .get(usersController.get_all_users);

    app.route('/app/newuser')
        .post(usersController.verify_user);
};