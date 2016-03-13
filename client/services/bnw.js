'use strict';

module.exports = [
  '$resource',
  function ($resource) {
    return $resource('https://bnw.im/api/:method', {
      method: 'show'
    });
  }
];