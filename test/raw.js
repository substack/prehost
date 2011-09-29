var test = require('tap').test;
var prehost = require('../');
var net = require('net');

test('raw without a host', function (t) {
    t.plan(2);
    
    var port = (Math.random() * Math.pow(2,32) - 1e4) + 1e4;
    var s = prehost(function (err, req) {
console.log('prehost');
        t.ok(err);
        t.equal(req.host, null);
        t.end();
        req.stream.end();
        s.close();
    });
    
    s.listen(port, function () {
console.log('ready');
        net.createConnection(port, function (c) {
console.log('client');
            c.write('GET /lul HTTP/1.0\r\n\r\n');
        }).on('error', t.fail.bind(t));
    });
});
