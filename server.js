//https://scotch.io/tutorials/node-and-angular-to-do-app-application-organization-and-structure

// set up ======================================================================
var express  = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const cors = require('cors');
var app = express();
var port = 8081;
var DIR = __dirname + '/file-hoster/';

//Serving music files for web app
app.use('/file-server', express.static(path.join(__dirname, 'file-hoster')));

// load the routes
require('./routes.js')(app, DIR);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

//Configurations
/*eslint-disable*/
 
var upload = multer({dest: DIR});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Content-Type,X_FILE_NAME');
  next();
});
 
app.use(multer({
  dest: __dirname ,
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
}).any());
