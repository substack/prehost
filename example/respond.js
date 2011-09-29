var prehost = require('../');

prehost(function (err, req) {
    var s = req.stream;
    if (err) {
        s.write([
            '400 HTTP/1.1',
            'Content-Type: text/plain',
            '',
            'Error: ' + err,
            ''
        ].join('\r\n'));
        s.end();
    }
    else {
        s.write([
            '200 HTTP/1.1 OK',
            'Content-Type: text/plain',
            '',
            'Host: ' + req.host,
            ''
        ].join('\r\n'));
        s.end();
    }
}).listen(8000);
