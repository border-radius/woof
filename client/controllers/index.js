'use strict';

module.exports = [
  '$scope',
  '$routeParams',
  function ($scope, $routeParams) {
    $scope.user = $routeParams.user;
    $scope.post = $routeParams.post;
    $scope.club = $routeParams.club;
    $scope.tag = $routeParams.tag;
  }
];