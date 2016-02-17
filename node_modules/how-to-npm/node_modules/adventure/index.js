var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var x256 = require('x256');
var through = require('through2');
var split = require('split');
var minimist = require('minimist');

var showMenu = require('./lib/menu.js');
var showHelp = require('./lib/help.js');

module.exports = Shop;
inherits(Shop, EventEmitter);

function Shop (opts) {
    if (!(this instanceof Shop)) return new Shop(opts);
    if (!opts) opts = {};
    if (typeof opts === 'string') opts = { name: opts };
    
    this.name = opts.name;
    this.options = opts;
    
    if (!this.name) return this._error(
        'Your adventure must have a name! '
        + 'Supply an `opts.name` to adventure().'
    );
    this.command = opts.command || commandify(this.name);
    
    this.datadir = opts.datadir || path.resolve(
        process.env.HOME || process.env.USERPROFILE,
        '.config/' + this.name
    );
    mkdirp.sync(this.datadir);
    
    this.files = {
        completed: path.join(this.datadir, 'completed.json'),
        current: path.join(this.datadir, 'current.json')
    };
    this.state = { 
        completed: [],
        current: null
    };
    
    try { this.state.completed = require(this.files.completed) }
    catch (err) {}
    
    try { this.state.current = require(this.files.current) }
    catch (err) {}
    
    this.colors = opts.colors || {};
    var c = {
        pass: [0,255,0],
        fail: [255,0,0],
        info: [0,255,255]
    };
    var colors = Object.keys(c).reduce(function (acc, key) {
        acc[key] = '\x1b[38;5;' + x256(c[key]) + 'm';
        return acc;
    }, {});
    
    if (!this.colors.pass) this.colors.pass = colors.pass;
    if (!this.colors.fail) this.colors.fail = colors.fail;
    if (!this.colors.info) this.colors.info = colors.info;
    this.colors.reset = '\x1b[00m';
    
    this._adventures = [];
}

Shop.prototype.execute = function (args) {
    var cmd = args[0];
    var argv = minimist(args, { alias: { h: 'help' } });
    
    if (cmd === 'verify') {
        this.verify(args.slice(1), this.state.current);
    }
    else if (cmd === 'run') {
        this.run(args.slice(1), this.state.current);
    }
    else if (cmd === 'help' || argv.help) {
        showHelp({ command: this.command });
    }
    else if (cmd === 'selected') {
        console.log(this.state.current);
    }
    else if (cmd === 'list') {
        console.log(this._adventures
            .map(function (adv) { return adv.name })
            .join('\n')
        );
    }
    else if (cmd === 'completed') {
        console.log(this.state.completed.join('\n'));
    }
    else if (cmd === 'select') {
        this.select(args[1]);
    }
    else if (cmd === 'print') {
        this.select(this.state.current);
    }
    else if (cmd === 'solution') {
        var adv = this.find(this.state.current);
        if (!adv) {
            return console.log(
                'No adventure is currently selected. '
                + 'Select an adventure from the menu.'
            );
            process.exit(1);
        }
        var p = adv.fn();
        if (p.solution) this._show(p.solution);
        else console.log('No reference solution available for this adventure.')
    }
    else if (cmd === 'reset') {
        this.state.completed = [];
        this.save('completed');
        this.state.current = null;
        this.save('current');
    }
    else if (!cmd || cmd === 'menu') {
        this.showMenu(this.options);
    }
    else {
        console.log('unrecognized command: ' + cmd);
    }
};

Shop.prototype.add = function (name, fn) {
    this._adventures.push({ name: name, fn: fn });
};

Shop.prototype.find = function (name) {
    for (var i = 0; i < this._adventures.length; i++) {
        var adv = this._adventures[i];
        if (norm(adv.name) === norm(name)) return adv;
    }
    function norm (s) { return String(s).replace(/\W/g, '').toLowerCase() }
};

Shop.prototype.verify = function (args, name) {
    var self = this;
    var adv = this.find(name);
    if (!adv) return this._error(
        'No adventure is currently selected. '
        + 'Select an adventure from the menu.'
    );
    var p = adv.fn();
    if (!p.verify) return this._error(
        "This problem doesn't have a .verify function yet!"
    );
    if (typeof p.verify !== 'function') return this._error(
        'This p.verify is a ' + typeof p.verify
        + '. It should be a function instead.'
    );
    
    var s = p.verify(args, function (ok) {
        if (ok) self.pass(name, p)
        else self.fail(name, p)
    });
    if (s) this._show(s);
};

Shop.prototype.run = function (args, name) {
    var self = this;
    var adv = this.find(name);
    if (!adv) return this._error(
        'No adventure is currently selected. '
        + 'Select an adventure from the menu.'
    );
    var p = adv.fn();
    if (!p.run) return this._error(
        "This problem doesn't have a .run function."
    );
    if (typeof p.run !== 'function') return this._error(
        'This p.run is a ' + typeof p.run
        + '. It should be a function instead.'
    );
    var s = p.run(args);
    if (s) this._show(s);
};

Shop.prototype.pass = function (name, p) {
    var ix = this.state.completed.indexOf(name);
    if (ix < 0) this.state.completed.push(name);
    this.save('completed');
    
    if (p.pass) {
        this._show(p.pass);
        console.log();
    }
    else {
        console.log(
            '\n' + this.colors.pass
            + '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
        );
        console.log(
            '@@@' + this.colors.reset
            + '     YOUR SOLUTION IS CORRECT'
            + this.colors.pass + '!     @@@'
        );
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.colors.reset + '\n');
    }
    if (p.solution) this._show(p.solution);
    
    this.emit('pass', name);
    if (this.state.completed.length === this._adventures.length) {
        this.emit('finished');
    }
};

Shop.prototype.fail = function (name, p) {
    if (p.fail) {
        this._show(p.fail);
        console.log();
    }
    else {
        console.log(
            this.colors.fail
            + '#########################################'
        );
        console.log(
            '###' + this.colors.reset
            + '   YOUR SOLUTION IS NOT CORRECT!'
            + this.colors.fail + '   ###'
        );
        console.log('#########################################');
        console.log(this.colors.reset + '\n');
    }
    this.emit('fail', name);
};

Shop.prototype.select = function (name) {
    var adv = this.find(name);
    this.state.current = name;
    this.save('current');
    
    var p = adv.fn();
    if (!p.problem) {
        p.problem = this.colors.info + Array(67).join('!') + '\n'
            + '!!!' + this.colors.reset
            + ' This adventure does not have a .problem description yet! '
            + this.colors.info + ' !!!\n!!!' + this.colors.reset
            + ' Set .problem to a string, buffer, stream or function that'
            + this.colors.info + ' !!!\n!!!' + this.colors.reset
            + ' returns a string, buffer, or stream.                     '
            + this.colors.info + ' !!!\n' + Array(67).join('!') + '\n'
        ;
    }
    if (p.problem) this._show(p.problem);
};

Shop.prototype.showMenu = function (opts) {
    var self = this;
    if (!opts) opts = {};
    
    var menu = showMenu({
        fg: opts.fg,
        bg: opts.bg,
        autoclose: typeof opts.autoclose === 'boolean' ? opts.autoclose : true,
        command: this.command,
        title: opts.title || this.name.toUpperCase(),
        names: this._adventures.map(function (x) { return x.name }),
        completed: this.state.completed
    });
    menu.on('select', function (name) {
        console.log();
        self.select(name);
    });
    menu.on('exit', function () {
        menu.close();
        console.log();
    });
    return menu;
};

Shop.prototype.save = function (key) {
    fs.writeFile(this.files[key], JSON.stringify(this.state[key]));
};

Shop.prototype._error = function (msg) {
    console.error('ERROR: ' + msg);
    process.exit(1);
};

Shop.prototype._show = function (m) {
    var self = this;
    if (typeof m === 'object' && m.pipe) {
        m.pipe(split()).pipe(through(write)).pipe(process.stdout);
    }
    else if (typeof m === 'function') {
        this._show(m());
    }
    else console.log(replace(m));
    
    function write (buf, enc, next) {
        this.push(replace(buf) + '\n');
        next();
    }
    function replace (s) {
        if (typeof s !== 'string') s = String(s);
        return s
            .replace(/\$ADVENTURE_COMMAND/g, self.command)
            .replace(/\$ADVENTURE_NAME/g, self.name)
        ;
    }
}

function commandify (s) {
    return String(s).toLowerCase().replace(/\s+/g, '-');
}
