var db = require('./db'); // database :)
var bookshelf = require('bookshelf')(db);

var PhotoModel = bookshelf.Model.extend({
    tableName: 'photos',
    user: function() {
        return this.belongsTo(UserModel);
    }
});

module.exports = PhotoModel;

