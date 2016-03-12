'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var ngSanitize = require('angular-sanitize');

var app = angular.module('woof', [ngRoute, ngResource, ngSanitize]);