var QUnit = require('./qunit').QUnit,
    qunitTap = require('qunit-tap').qunitTap,
    util = require('util'),
    fs = require('fs');

qunitTap(QUnit, util.puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

var visual_width = require('../visualwidth.js');
with ({is: QUnit.equal, subtest: QUnit.test, truncate: visual_width.truncate, width: visual_width.width}) {
    var content = fs.readFileSync('t/test.js', 'utf-8');
    eval(content);
}

QUnit.start();
