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
        var oldBreakpoint = _currentBreakpoint;
        // we need to use innerWidth because of scrollbars
        // this is ie9 +
        // ie8 support would require to create extra element
        var viewport = _win[0].innerWidth;
        for (var breakpoint in _breakpoints) {
            if (viewport >= _breakpoints[breakpoint].min &&
                viewport <= _breakpoints[breakpoint].max) {
                _currentBreakpoint = breakpoint;
                if (_currentBreakpoint !== oldBreakpoint) {
                    _win.trigger('change:breakpoint', [_currentBreakpoint, oldBreakpoint || 'xs']);
                }
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

    var init = function (breakpoints) {
        _breakpoints = $.extend(true, _defaults, breakpoints);
        //making sure that we don't have millions of handlers in case of multiple inits
        destroy();
        _initWatch();
    };

    var destroy = function () {
        _win.off('resize.bootstrap.breakpoints');
        _currentBreakpoint = undefined;
    };

    return {
        init: init,
        destroy: destroy,
        is: is,
        current: current,
        getBreakpoints: getBreakpoints
    };
}());
