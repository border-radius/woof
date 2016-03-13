'use strict';

module.exports = [
  '$scope',
  '$routeParams',
  'bnw',
  function ($scope, $routeParams, bnw) {
    $scope.show = bnw.get({
      tag: $routeParams.tag,
      user: $routeParams.user,
      club: $routeParams.club,
      message: $routeParams.post,
      replies: $routeParams.post ? 1 : null
    });
  }
];