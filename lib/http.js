var express = require('express');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var jade = require('jade');
var path = require('path');
var os = require('os');

var app = express();
var staticPath = path.join(__dirname, '../data');
var lessPath = path.join(__dirname, '../styles');
var tempPath = path.join(os.tmpDir(), 'woof-static');
var clientPath = path.join(__dirname, '../client/index.js');
var viewPath = path.join(__dirname, '../views/index.jade');

app.use('/json', express.static(staticPath));
app.use(less(lessPath, { dest: tempPath }));
app.use(express.static(tempPath));
app.use('/index.js', browserify(clientPath));

app.get(['/', '/u/:user', '/p/:post'], function (req, res, next) {
  var html = jade.compileFile(viewPath)();
  res.send(html);
});

module.exports = app;