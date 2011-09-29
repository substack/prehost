var test = require('tap').test;
var prehost = require('../');
var net = require('net');

test('raw with a host', function (t) {
    t.plan(2);
    var sent = false;
    
    var port = (Math.random() * Math.pow(2,16) - 1e4) + 1e4;
    var s = prehost(function (err, req) {
        if (err) t.fail(err);
        
        t.equal(req.host, 'lulzy');
        t.ok(sent);
        
        s.close();
    });
    
    s.listen(port, function () {
        var c = net.createConnection(port, function () {
            c.write('GET /lul HT');
            setTimeout(function () {
                c.write('TP/1.1\r\nHo');
            }, 20);
            setTimeout(function () {
                c.write('st: lulz');
            }, 40);
            setTimeout(function () {
                sent = true;
                c.write('y\r\nFoo: bar');
            }, 60);
            setTimeout(function () {
                sent = true;
                c.write('\r\n\r\n');
                c.end();
                t.end();
            }, 80);
        });
    });
});
