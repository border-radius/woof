var wscache = require('./lib/wscache');
var http = require('./lib/http');

var port = parseInt(process.env.PORT) || 8100;

var wscacheInstance = new wscache({
  sockets: [
    'wss://bnw.im/ws?v=2',
    'wss://bnw.im/comments/ws'
  ]
});

http.listen(port, function () {
  var now = new Date();
  console.log('Server launched on port', port, now.toLocaleString());
});