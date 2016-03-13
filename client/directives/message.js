'use strict';

module.exports = function () {
  return {
    templateUrl: 'message',
    scope: {
      content: '=content',
      joinable: '=joinable'
    }
  }
};