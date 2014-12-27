Boostrap Breakpoints
====================

[![Build Status](https://travis-ci.org/vxsx/bootstrap-breakpoints.svg?branch=master)](https://travis-ci.org/vxsx/bootstrap-breakpoints)
[![Code Climate](https://codeclimate.com/github/vxsx/bootstrap-breakpoints/badges/gpa.svg)](https://codeclimate.com/github/vxsx/bootstrap-breakpoints)
[![Test Coverage](https://codeclimate.com/github/vxsx/bootstrap-breakpoints/badges/coverage.svg)](https://codeclimate.com/github/vxsx/bootstrap-breakpoints)

Tiny script to enable easier checks for current responsive breakpoint. Assumes you are using bootstrap, but can potentially work with other custom breakpoints.

## Usage

Put the script somewhere in the html as you usually do.
For now the script depends on jQuery and works in IE9+.

```js
Breakpoint.init();

if (Breakpoint.is('xs')) {
    //do mobile stuff
}

if (Breakpoint.is('sm')) {
    //do tablet stuff
}

$(window).on('change:breakpoint', function (e, current, previous) {
    console.log('previous breakpoint was', previous);
    console.log('current breakpoint is', current);
});

//etc
```

If you need to customize breakpoint values, you do

```
Breakpoint.init({
    xs: {
        min: 0,
        max: 499
    },
    sm: {
        min: 500,
        max: 1000,
    }
    //etc
});
```

## How it works

On init script registers an event handler on window resize where it just checks window.width 
and if correct breakpoint is found it sets the value internally as well as triggering 'change:breakpoint' event
on window.  You may want to throttle the event handler, but it's not yet possible without modifying source code.

## API

### `.is(breakpoint)`

Returns true if passed value is a correct breakpoint.

### `.current()`

Returns string representing current breakpoint (xs, sm, etc).

### `.getBreakpoints()`

Get all the breakpoints values.

### `.init(breakpoints)`

Initializes the script. Without calling this first - won't work.

### `.destroy()`

Removes resize watcher.

## Demo

TODO

## Contributing

Make PR, write your stuff, don't forget tests.
