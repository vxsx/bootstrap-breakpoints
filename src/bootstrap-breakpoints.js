/* global window, $ */
var Breakpoint = (function () {

    var _win = $(window);
    var _breakpoints;
    var _currentBreakpoint;
    var _defaults = {
        xs: {
            min: 0,
            max: 767
        },
        sm: {
            min: 768,
            max: 991
        },
        md: {
            min: 992,
            max: 1199
        },
        lg: {
            min: 1200,
            max: Infinity
        }
    };

    var _validate = function (breakpoint) {
        if (!_breakpoints[breakpoint]) {
            throw new Error('Invalid breakpoint');
        }
    };

    var _onResize = function () {
        // we need to use innerWidth because of scrollbars
        var oldBreakpoint = _currentBreakpoint;
        var viewport = _win[0].innerWidth;
        for (var breakpoint in _breakpoints) {
            if (viewport > _breakpoints[breakpoint].min &&
                viewport < _breakpoints[breakpoint].max) {
                _currentBreakpoint = breakpoint;
                _win.trigger('change:breakpoint', [_currentBreakpoint, oldBreakpoint]);
            }
        }
    };

    var _initWatch = function () {
        _win.on('resize.bootstrap.breakpoints', _onResize);
        _onResize();
    };

    var getBreakpoints = function () {
        return _breakpoints;
    };

    var is = function (breakpoint) {
        _validate(breakpoint);
        return (_currentBreakpoint === breakpoint);
    };

    var current = function () {
        return _currentBreakpoint;
    };

    var higher = function (breakpoint) {
        _validate(breakpoint);
        throw new Error('Not implemented');
    };

    var lower = function (breakpoint) {
        _validate(breakpoint);
        throw new Error('Not implemented');
    };

    var init = function (breakpoints) {
        _breakpoints = $.extend(_defaults, breakpoints);
        // TODO do only once
        _initWatch();
    };

    var destroy = function () {
        _win.off('resize.bootstrap.breakpoints');
    };

    return {
        init: init,
        destroy: destroy,
        is: is,
        higher: higher,
        lower: lower,
        current: current,
        getBreakpoints: getBreakpoints
    };
}());
