var express = require('express');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var jade = require('jade');
var path = require('path');
var fs = require('fs');
var os = require('os');

var app = express();
var staticPath = path.join(__dirname, '../data');
var lessPath = path.join(__dirname, '../styles');
var tempPath = path.join(os.tmpDir(), 'woof-static');
var clientPath = path.join(__dirname, '../client/index.js');
var viewPath = path.join(__dirname, '../views/index.jade');
var templatesPath = path.join(__dirname, '../views/templates');

app.use('/json', express.static(staticPath));
app.use(less(lessPath, { dest: tempPath }));
app.use(express.static(tempPath));
app.use('/index.js', browserify(clientPath));

app.get([
  '/',
  '/u/:user',
  '/p/:post',
  '/t/:tag',
  '/c/:club',
  '/u/:user/t/:tag',
  '/u/:user/c/:club'
], function (req, res, next) {
  fs.readdir(templatesPath, function (e, files) {
    if (e) {
      return next(e);
    }

    files = files.map(function (file) {
      var filePath = path.join(templatesPath, file);
      return {
        id: file.replace(/\.[^\.]+$/, ''),
        html: jade.compileFile(filePath)()
      };
    });

    var html = jade.compileFile(viewPath)({
      templates: files
    });

    res.send(html);
  });
});

module.exports = app;