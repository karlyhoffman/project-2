var express = require('express');
var ctrl = express.Router();
var ig = require('instagram-node').instagram();

ig.use({ client_id: 'bdea16361b5641c9a78a572312476041',
  client_secret: 'fe323443fc4149d58e9ac7c73c8a08f5' });

/* GET home page. */
ctrl.get('/test', function(req, res, next) {
  res.render('index', { title: 'CAMERALESS CONCERTS' });
  tagSearch('banana');
});

function tagSearch(input){
  ig.tag_search(input, function(result) {
    console.log(result)
  });
}

module.exports = ctrl;
