var db = require('./db'); // database :)
var bookshelf = require('bookshelf')(db);

var UserModel = bookshelf.Model.extend({
    tableName: 'user_accounts'
});

module.exports = UserModel;

