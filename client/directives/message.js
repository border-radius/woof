'use strict';

module.exports = function () {
  return {
    templateUrl: 'message',
    scope: {
      content: '=content',
      joinable: '=joinable',
      messages: '=messages'
    },
    link: function (scope, elem, attrs) {
      scope.getMessage = function (id) {
        if (!scope.messages) {
          return null;
        }

        var search = scope.messages.filter(function (message) {
          return message.id === id;
        });

        if (!search.length) {
          return null;
        }

        return search[0];
      };
    }
  }
};