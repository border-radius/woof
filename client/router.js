'use strict';

module.exports = [
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    var opts = {
      templateUrl: 'chat',
      controller: 'index'
    };

    $routeProvider
    .when('/', opts)
    .when('/u/:user', opts)
    .when('/u/:user/t/:tag', opts)
    .when('/u/:user/c/:club', opts)
    .when('/t/:tag', opts)
    .when('/c/:club', opts)
    .when('/p/:post', opts)
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }
];