prehost
=======

Parse the `/^host\s*:\s*(\S+)/i` out of an HTTP stream and report back as soon as
possible. This is useful if you're writing something like a load manager.

example
=======

````javascript
var prehost = require('../');

prehost(function (err, req) {
    if (err) console.error('Error: ' + err)
    else console.log('Host: ' + req.host)
}).listen(8000);
````

Connect to the server and you'll see 'Host: ...' values get printed when you try
to visit the service on port 8000 with curl or a browser.

methods
=======

````javascript
var prehost = require('prehost');
````

prehost(..., cb)
----------------

Create a new network server with the arguments in `...` and try to parse HTTP
headers.

If there is an error, `err` will be set in `cb(err, req)`.

`req` is an object with the keys:

* stream - the stream object from the request
* host - a string with the hostname, if any was detected
* buffers - an array of the buffers received so far

`prehost()` returns the server object.

limitations
===========

After parsing the host, the parser stops looking at data.

This behavior will break for `Connection: keep-alive` or multipart requests.

install
=======

With [npm](http://npmjs.org) do:

    npm install prehost

license
=======

MIT/X11
