var express = require('express');
var http = require('http');
var router = express.Router();
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


router.post('/', function (req, res) {

  var stream = cloudinary.uploader.upload_stream(function (result) {
    return res.send(result);
  });

  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

    file.on('error', function (err) {
      console.log('error white buffering stream: ', err);
      return res.send(err);
    });

    file.pipe(stream);

  });

  req.pipe(req.busboy);
});

module.exports = router;
