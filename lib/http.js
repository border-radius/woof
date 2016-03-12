var express = require('express');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var path = require('path');
var os = require('os');

var app = express();
var staticPath = path.join(__dirname, '../data');
var lessPath = path.join(__dirname, '../styles');
var tempPath = path.join(os.tmpDir(), 'woof-static');
var clientPath = path.join(__dirname, '../client/index.js');

app.use('/json', express.static(staticPath));
app.use(less(lessPath, { dest: tempPath }));
app.use(express.static(tempPath));
app.use('/index.js', browserify(clientPath));

module.exports = app;