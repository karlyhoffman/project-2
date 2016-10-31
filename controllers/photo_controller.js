var express = require('express');
var photoCtrl = express.Router();
var PhotoModel = require('../models/PhotoModel');

photoCtrl.post('/upload', photoUpload);
photoCtrl.get('/upload', function(req, res, next){
    res.render('photoupload',{})
});

function photoUpload(req, res, next){
    console.log(req.body);
    var photo = new PhotoModel({
        location: req.body.location,
        artist: req.body.artist,
        user_id: '1',
        image_as_base64: req.body.image_as_base64
    }).save()
}

module.exports = photoCtrl;