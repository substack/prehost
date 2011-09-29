var test = require('tap').test;
var prehost = require('../');
var http = require('http');

test('connect with http', function (t) {
    t.plan(3);
    var port = Math.floor(Math.random() * Math.pow(2,16) - 1e4) + 1e4;
    var s = prehost(function (err, req) {
        if (err) t.fail(err);
        
        t.equal(req.host, 'localhost:' + port);
        req.stream.write([
            'HTTP/1.1 200 200 OK',
            'Content-Type: text/plain',
            'Connection: close',
            '',
            'oh hello'
        ].join('\r\n'));
        req.stream.end();
    });
    
    s.listen(port, function () {
        var opts = {
            method : 'GET',
            host : 'localhost',
            port : port,
            path : '/'
        };
        var req = http.request(opts, function (res) {
            t.equal(res.headers['content-type'], 'text/plain');
            
            var data = '';
            res.on('data', function (buf) {
                data += buf.toString();
            });
            
            res.on('end', function () {
                t.equal(data, 'oh hello');
                s.close();
                t.end();
            });
        });
        
        req.end();
    });
});
