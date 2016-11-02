var express = require('express');
var photoCtrl = express.Router();
var PhotoModel = require('../models/PhotoModel');

photoCtrl.post('/upload', photoUpload);
photoCtrl.get('/upload', function(req, res, next){
    res.render('photoupload',{})
});

function photoUpload(req, res, next){
    if (req.session.isLoggedIn){
        console.log('this is session id');
        console.log(req.session.userId);
        console.log(req.body);
        var the = new RegExp('the ');
        var artistInput =  (req.body.artist).toLowerCase();
        var locationInput =  (req.body.location).toLowerCase();
        var artistRemoved = artistInput.replace(the, '');
        var locationRemoved = locationInput.replace(the, '');
        console.log(artistRemoved);
        console.log(locationRemoved);
        var photo = new PhotoModel({
            location: locationRemoved,
            artist: artistRemoved,
            user_account_id: req.session.userId,
            image_as_base64: req.body.image_as_base64
        }).save();
        console.log(req.session);
        res.redirect('/home')
    }
    else{
        req.session.notLoggedInMessage = 'please log in before uploading photos';
        res.redirect('/login')
    }

}

module.exports = photoCtrl;