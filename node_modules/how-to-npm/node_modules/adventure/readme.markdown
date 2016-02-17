# adventure

quickly hack together a [nodeschool](http://nodeschool.io) adventure

This is an alternative to the
[workshopper](https://www.npmjs.org/package/workshopper)
module, which you should also look at.

`workshopper` is more convention-driven and fully-featured, but expects a
particular (configurable) filesystem organization for problems.

`adventure` is entirely api-driven and has fewer configuration options.

# tutorial

You can fork this tutorial from the
[example-adventure](https://github.com/substack/example-adventure) repo.

First make a `runner.js`. This is the file you can wire up to the `package.json`
`"bin"` field.

``` js
#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('example-adventure');

shop.add('dinosaurs', function () { return require('./dinosaurs') });
shop.add('robots', function () { return require('./robots') });
shop.add('wowsers', function () { return require('./wowsers') });

shop.execute(process.argv.slice(2));
```

You simply `.add(name, fn)` each of the adventures in your problem set and then
`.execute()` the adventure with the command-line arguments.

The interface to problem files is very simple. The simplest version of a problem
is just an object with a `.problem` string and `.verify` function.

Here's what we can put in `dinosaurs/index.js`:

``` js
exports.problem = 'Make a dinosaur sound.\n'
    + 'Use `$ADVENTURE_COMMAND verify YOUR_TEXT...` to make your sound.'
;

exports.verify = function (args, cb) {
    if (/RAWR/.test(args)) {
        console.log('Wow that is a convincing dinosaur.\n');
        cb(true);
    }
    else if (/rawr/i.test(args)) {
        console.log('Close, but too quiet. Try louder.\n');
        cb(false);
    }
    else {
        console.log("That doesn't sound like a dinosaur at all.\n");
        cb(false);
    }
};
```

You don't need to put this in a file necessarily even, you just need to return
an object with these properties from the function you pass to `.add()`.

Your `verify(args, cb)` function will get the arguments passed to it on the
command-line and a callback that you can use to indicate whether the solution
was successful or not.

You can return many different kinds of objects in your `.problem` or `.solution`
functions: a string, a buffer, a stream, or a function that returns a string, a
buffer, or a stream.

Now in `robots/index.js` we can use streams for the problem and solution:

``` js
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
```

Finally, we can use
[adventure-verify](https://npmjs.org/package/adventure-verify)
to verify solutions using [tape](https://npmjs.org/package/tape) with
friendly [colorized tap output](https://npmjs.org/package/tap-colorize).

In `wowsers/index.js` we can use
[adventure-verify](https://npmjs.org/package/adventure-verify) to do:

``` js
var fs = require('fs');
var path = require('path');
var verify = require('adventure-verify');

exports.problem = fs.createReadStream(__dirname + '/problem.txt');
exports.solution = fs.createReadStream(__dirname + '/solution.txt');

exports.verify = verify({ modeReset: true }, function (args, t) {
    var f = require(path.resolve(args[0]));
    t.equal(typeof f, 'function', 'you exported a function');
    t.equal(f(2,3), 6, '2 * 3 = 6');
    t.equal(f(1,1), 1, '1 * 1 = 1');
    t.equal(f(0.5,0.5), 0.25, '0.5 * 0.5 = 0.25');
    t.end();
});
```

Here we use `modeReset` so that when a user does `console.log()` or
`console.error()` in their solution, their text shows up as the terminal default
instead of getting mixed up with the TAP colors.

Now just fill in the `problem.txt` and `solution.txt` files and you will have a
working nodeschool-style adventure! Yay!

# methods

``` js
var adventure = require('adventure')
```

## var shop = adventure(opts)

Create a new nodeschool workshop adventure.

options are:

* `opts.name` - name of your adventure (required)
* `opts.command` - the name of the adventure command (inferred from `opts.name`)
* `opts.title` - title to use for your adventure
(default: `opts.name.toUpperCase()`)
* `opts.datadir` - directory used to store the current level and the list of
completed levels. default: `'~/.config/' + opts.name`

* `opts.colors` - object mapping color types to `[r,g,b]` arrays
* `opts.colors.pass` - show passing solution messages with this color
* `opts.colors.fail` - show failing solution messages with this color
* `opts.colors.info` - show extra info with this color

* `opts.fg` - menu foreground color
* `opts.bg` - menu background color

* `opts.autoclose` - whether to close stdin automatically after the menu is
shown

If `opts` is a string, it will be treated as the `opts.name`.

## shop.add(name, fn)

Your `fn()` should return a problem object in the format described below.

## shop.execute(args)

Run whatever commands are specified in the command-line `args`.

## shop.showMenu(opts)

If you don't want to let `.execute()` show the menu, you can show the menu
yourself explicitly with `.showMenu()`.

The options are:

* `opts.fg` - foreground color
* `opts.bg` - background color
* `opts.title` - menu title text
* `opts.autoclose` - whether to close stdin automatically after the menu is
shown

## shop.select(name)

You can explicitly select a level with this method if you don't want to rely on
the user to select a menu for themselves from the graphical menu.

# problem object format

Problems must have a `verify()` function. All other fields are optional.

## problem.verify(args, cb)

This function will be called when a user attempts to verify a problem with the
`verify` command on the command-line.

You will get an array of the arguments given after the `verify` command in
`args`.

You must call `cb(ok)` with `ok`, a boolean containing whether the solution was
acceptible.

Check out [adventure-verify](https://npmjs.org/package/adventure-verify)
for a higher-level way of verifying solutions with
[tape](https://npmjs.org/package/tape).

## problem.run(args)

This function will be called when the user uses the `run` command from the
command-line. You can implement this if you want to but it doesn't make sense
for all problems.

## problem.problem

This message will be displayed when a user selects the problem from the menu.

`problem.problem` can be a string, a buffer, a stream, or a function that
returns a string, a buffer, or a stream.

## problem.solution

This message will be displayed when a user successfully completes a problem,
after the success notification.

`problem.solution` can be a string, a buffer, a stream, or a function that
returns a string, a buffer, or a stream.

## problem.pass

This message will be displayed when a user successfully completes a level. The
default `problem.pass` is says `YOUR SOLUTION IS CORRECT` in a box of made of
`@`s.

`problem.pass` can be a string, a buffer, a stream, or a function that
returns a string, a buffer, or a stream.

## problem.fail

This message will be displayed when a user's solution fails to pass all the
tests. The default `problem.fail` is says `YOUR SOLUTION IS NOT CORRECT` in a
box of made of `#`s.

`problem.fail` can be a string, a buffer, a stream, or a function that
returns a string, a buffer, or a stream.

# events

## shop.on('pass', function (name) {})

This event fires when a solution passed.

## shop.on('fail', function (name) {})

This event fires when a solution failed.

## shop.on('finished', function () {})

This event fires when all the levels are completed.

# problem variables

These variables will be automatically replaced any time you use them in any of
the problem messages, whether in a string, a buffer, a stream, or a function
that returns a string, a buffer, or a stream.

* `$ADVENTURE_NAME` - the name of the adventure
* `$ADVENTURE_COMMAND` - the name of the adventure command

# usage

The `.execute(args)` function accepts these commands:

```
$COMMAND
$COMMAND menu

  Show the menu.

$COMMAND verify [ARGS...]

  Verify the currently selected problem with ARGS.

$COMMAND run [ARGS...]

  Run the currently selected problem with ARGS.
  Not all problems support `run`.

$COMMAND solution

  Show the solution for the currently selected problem.

$COMMAND print

  Print the text of the currently selected level.

$COMMAND selected

  Print the name of the currently selected level.
 
$COMMAND select LEVEL

  Set the currently selected LEVEL.

$COMMAND list

  List the available levels.

$COMMAND completed

  List the completed levels.
 
$COMMAND reset

  Reset the list of completed levels.

$COMMAND help

  Show this message.

```

# install

With [npm](https://npmjs.org) do:

```
npm install adventure
```

# license

MIT
