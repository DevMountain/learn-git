var fs = require('fs');
var path = require('path');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = function (args, cb) {
    var res = require(path.resolve(args[0]));
    if (/beep/.test(res) && /boop/.test(res)) {
        console.log('That sounds about right!\n');
        cb(true);
    }
    else if (/beep/.test(res) || /boop/.test(res)) {
        console.log('Hmm that sounds partly convincing but try harder.\n');
        cb(false);
    }
    else {
        console.log("That doesn't sound like a robot at all.\n");
        cb(false);
    }
};
