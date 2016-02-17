var net = require('net');
var host = process.argv[2];
var port = Number(process.argv[3]);

var c = net.connect(port, host);
process.stdin.pipe(c).pipe(process.stdout);

process.stdin.setRawMode(true);
process.stdin.on('data', function (buf) {
    if (buf[0] === 3) c.end();
});

c.on('end', function () {
    process.stdin.setRawMode(false);
    process.exit();
});
