'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var ngSanitize = require('angular-sanitize');

var app = angular.module('woof', [ngRoute, ngResource, ngSanitize]);

app.config(require('./router'));
app.service('bnw', require('./services/bnw'));
app.directive('message', require('./directives/message'));
app.directive('userpic', require('./directives/userpic'));
app.directive('username', require('./directives/username'));
app.directive('text', require('./directives/text'));
app.directive('taglist', require('./directives/taglist'));
app.directive('datestr', require('./directives/datestr'));
app.directive('recommendations', require('./directives/recommendations'));
app.controller('index', require('./controllers/index'));