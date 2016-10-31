var db = require('./db'); // database :)
var bookshelf = require('bookshelf')(db);

var UserModel = bookshelf.Model.extend({
    tableName: 'user_accounts',
    photos: function() {
        return this.hasMany(PhotoModel);
    }
});

module.exports = UserModel;

