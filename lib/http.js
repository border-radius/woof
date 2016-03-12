var express = require('express');
var less = require('less-middleware');
var path = require('path');
var os = require('os');

var app = express();
var staticPath = path.join(__dirname, '../data');
var lessPath = path.join(__dirname, '../styles');
var tempPath = path.join(os.tmpDir(), 'woof-static');

app.use('/json', express.static(staticPath));
app.use(less(lessPath, { dest: tempPath }));
app.use(express.static(tempPath));

module.exports = app;