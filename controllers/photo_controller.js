var express = require('express');
var photoCtrl = express.Router();
var PhotoModel = require('../models/PhotoModel');

photoCtrl.post('/upload', photoUpload);
photoCtrl.get('/upload', function(req, res, next){
    res.render('photoupload',{})
});

function photoUpload(req, res, next){
    console.log('this is session id');
    console.log(req.session.userId);
    console.log(req.body);
    var photo = new PhotoModel({
        location: req.body.location,
        artist: req.body.artist,
        user_id: req.session.userId,
        image_as_base64: req.body.image_as_base64
    }).save();
    res.redirect('/home')
}

module.exports = photoCtrl;