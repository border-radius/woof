'use strict';

var ws = require('ws');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var assert = require('assert');
var wscache = require('../lib/wscache');

var testData = path.join(__dirname, '../data/test.json');

var testMessages = [
  { foo: 'bar' },
  { biz: 'buzz', kek: 'pook' }
];

var extraMessages = [
  { test: true },
  { test: true },
  { test: true },
  { test: true },
  { test: true }
];

function getTestData () {
  try {
    var json = fs.readFileSync(testData, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
    return [];
  }
}

describe('wscache', function () {
  it('should remove test data', function (done) {
    fs.unlink(testData, done.bind(null, null));
  });

  var wsServer;

  it('should create test websocket server', function (done) {
    var testMessagesCopy = lodash.cloneDeep(testMessages);

    wsServer = new ws.Server({ port: 8100 });
    
    wsServer.on('connection', function (ws) {
      while(testMessagesCopy.length) {
        ws.send(JSON.stringify(testMessagesCopy.pop()));
      }
    });

    done();
  });

  var wscacheInstance;

  it('should connect to the test server', function (done) {
    wscacheInstance = new wscache({
      sockets: ['ws://localhost:8100'],
      output: testData,
      limit: 5
    });

    setTimeout(done, 300);
  });

  it('should check messages saved properly', function (done) {
    assert.deepEqual(testMessages, getTestData());
    done();
  });

  it('should recreate test server to check reconnection', function (done) {
    wsServer.close();

    wsServer = new ws.Server({ port: 8100 });
    wsServer.on('connection', function (ws) {
      done();
    });
  });

  it('should send another message', function (done) {
    var anotherMessage = { what: { the: { fuck: { is: { going: 'on' } } } } };
    wsServer.clients[0].send(JSON.stringify(anotherMessage));
    testMessages.unshift(anotherMessage);
    setTimeout(done, 300);
  });

  it('should check another messages is saved', function (done) {
    assert.deepEqual(testMessages, getTestData());
    done();
  })

  it('should flood with extra messages', function (done) {
    var extraMessagesCopy = lodash.cloneDeep(extraMessages);
    
    while(extraMessagesCopy.length) {
      wsServer.clients[0].send(JSON.stringify(extraMessagesCopy.pop()));
    }

    setTimeout(done, 300);
  });

  it('should check cache are not out of limit', function (done) {
    assert.deepEqual(extraMessages, getTestData());
    done();
  });
});