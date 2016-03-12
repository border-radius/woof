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

  it('should serve compiled css', function (done) {
    request(app)
    .get('/index.css')
    .expect('content-type', 'text/css; charset=UTF-8')
    .expect(200)
    .end(done);
  });

  it('should serve client scripts', function (done) {
    request(app)
    .get('/index.js')
    .expect('content-type', 'application/javascript')
    .expect(200)
    .end(done);
  });

  it('should serve compiled jade template', function (done) {
    request(app)
    .get('/')
    .expect('content-type', 'text/html; charset=utf-8')
    .expect(200)
    .expect(function (res) {
      assert(res.text.indexOf('Woof') > -1);
    })
    .end(done);
  });

  it('should serve compiled jade template on different URL', function (done) {
    request(app)
    .get('/u/krkm')
    .expect('content-type', 'text/html; charset=utf-8')
    .expect(200)
    .expect(function (res) {
      assert(res.text.indexOf('Woof') > -1);
    })
    .end(done);
  });
});