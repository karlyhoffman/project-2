var Bookshelf = require('./db');

// var db = require('./db'); // database :)
// var bookshelf = require('bookshelf')(db);

require('./PhotoModel');

var UserModel = Bookshelf.Model.extend({
    tableName: 'user_accounts',
    photos: function() {
        return this.hasMany('PhotoModel');
    }
});

module.exports = Bookshelf.model('UserModel', UserModel);

// module.exports = UserModel;

