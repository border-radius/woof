'use strict';

module.exports = function () {
  return {
    templateUrl: 'taglist',
    scope: {
      tags: '=tags',
      clubs: '=clubs',
      user: '=user'
    }
  }
};