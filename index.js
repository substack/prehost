var net = require('net');
module.exports = function () {
    var args = [].slice.call(arguments, 0, -1);
    var cb = arguments[arguments.length - 1];
    
    args.push(function (stream) {
        var bufs = [];
        var line = '';
        
        stream.on('data', function listener (buf) {
            bufs.push(buf);
            
            for (var i = 0; i < buf.length; i++) {
                if (buf[i] === '\n') {
                    if (line === '') {
                        cb('No "Host" HTTP header encountered.', {
                            stream : stream,
                            host : null,
                            buffers : bufs
                        });
                        stream.removeListener('data', listener);
                        break;
                    }
                    else {
                        var m = line.match(/^host:\s*(\S+)/i);
                        if (m) {
                            var host = m[1];
                            stream.removeListener('data', listener);
                            cb(null, {
                                stream : stream,
                                host : host,
                                buffers : bufs
                            });
                            break;
                        }
                        line = '';
                    }
                }
                else line += String.fromCharCode(buf[i]);
            }
        });
    });
    
    net.createServer.apply(null, args);
};