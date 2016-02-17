var fs = require('fs');
var split = require('split');
var through = require('through2');

module.exports = function (opts) { 
    fs.createReadStream(__dirname + '/usage.txt')
        .pipe(through(function (buf, enc, next) {
            var line = buf.toString('utf8')
                .replace(/\$COMMAND/g, opts.command)
            ;
            this.push(line + '\n');
            next();
        }))
        .pipe(process.stdout)
    ;
};
