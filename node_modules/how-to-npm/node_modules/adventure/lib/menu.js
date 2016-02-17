var tmenu = require('terminal-menu');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var showHelp = require('./help.js');

module.exports = function (opts) {
    var emitter = new EventEmitter;
    
    var menu = tmenu({
      width: 65,
      x: 3, y: 2, 
      bg: opts.bg || 'blue',
      fg: opts.fg || 'white'
    });
    
    menu.reset();
    
    var title = opts.title || 'UNTITLED\n';
    menu.write(title + '\n');
    menu.write(Array(title.length+1).join('-') + '\n');
    
    (opts.names || []).forEach(function (name) {
        var isDone = (opts.completed || []).indexOf(name) >= 0;
        if (isDone) {
            var m = '[COMPLETED]';
            menu.add(
                name
                + Array(65 - m.length - name.length + 1).join(' ')
                + m
            );
        }
        else menu.add(name);
    });
    menu.write('-----------------\n');
    menu.add('HELP');
    menu.add('EXIT');
    
    menu.on('select', function (label) {
        var name = label.replace(/\s{2}.*/, '');
        
        menu.close();
        if (name === 'EXIT') {
            return emitter.emit('exit');
        }
        else if (name === 'HELP') {
            console.log();
            showHelp(opts);
        }
        else emitter.emit('select', name);
    });
    process.stdin.setRawMode(true);
    process.stdin.pipe(menu.createStream()).pipe(process.stdout);
    menu.once('close', function () {
        process.stdin.setRawMode(false);
        if (opts.autoclose) {
            process.stdin.end();
        }
    });
    emitter.close = function () { menu.close() };
    
    return emitter;
};
