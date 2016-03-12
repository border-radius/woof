var express = require('express');
var path = require('path');

var app = express();
var staticPath = path.join(__dirname, '../data');

app.use('/json', express.static(staticPath));

module.exports = app;