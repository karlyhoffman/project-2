var Bookshelf = require('./db');

// var db = require('./db'); // database :)
// var bookshelf = require('bookshelf')(db);

require('./UserModel');

var PhotoModel = Bookshelf.Model.extend({
    tableName: 'photos',
    user: function() {
        return this.belongsTo('UserModel');
    }
});

module.exports = Bookshelf.model('PhotoModel', PhotoModel);
module.exports = PhotoModel;

