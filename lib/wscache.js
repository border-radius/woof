var lodash = require('lodash');
var path = require('path');
var ws = require('mokou-websocket');
var fs = require('fs');

var enc = { encoding: 'utf8' };

function wscache (opts) {
  this.opts = lodash.defaults(opts, {
    sockets: [],
    output: path.join(__dirname, '../data/cache.json'),
    limit: 100
  });

  this.sockets = [];
  this.opts.sockets.forEach(this.listen.bind(this));
}

wscache.prototype.listen = function (url) {
  var socket = new ws(url);
  var that = this;
  
  socket.onmessage = function (message) {
    try {
      message = JSON.parse(message.data);
    } catch (e) {}

    that.save.call(that, message);
  };

  this.sockets.push(socket);
};

wscache.prototype.save = function (message) {
  var cache;

  try {
    cache = fs.readFileSync(this.opts.output, enc);
    cache = JSON.parse(cache);
  } catch (e) {
    cache = [];
  }

  cache.unshift(message);
  cache = cache.slice(0, this.opts.limit);
  cache = JSON.stringify(cache);
  fs.writeFileSync(this.opts.output, cache, enc);
};

module.exports = wscache;