'use strict';

module.exports = function () {
  return {
    templateUrl: 'datestr',
    scope: {
      date: '=date'
    },
    link: function (scope, elem, attrs) {
      scope.showDateBefore = new Date() / 1000 - 86000;
    }
  };
};