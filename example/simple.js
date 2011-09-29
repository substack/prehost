var prehost = require('../');

prehost(function (err, req) {
    if (err) console.error('Error: ' + err)
    else console.log('Host: ' + req.host)
}).listen(8000);
