require('dotenv').config(); //# dot-env
var db = require('knex')({	//# knex
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'ccdba',
        password: 'cameraless_concerts',
        database: 'cameraless_concerts'
    }
});

var bookshelf = require('bookshelf')(db);

bookshelf.plugin('registry');

module.exports = bookshelf;
