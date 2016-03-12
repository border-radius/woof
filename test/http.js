var request = require('supertest');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var app = require('../lib/http');

describe('http', function () {
  it('should serve jsons', function (done) {
    request(app)
    .get('/json/test.json')
    .expect('content-type', 'application/json')
    .expect(200)
    .expect(function (res) {
      var testPath = path.join(__dirname, '../data/test.json');
      var testData = fs.readFileSync(testPath, { encoding: 'utf8' });
      assert.equal(testData, res.text);
    })
    .end(done);
  });
});