/* global window, $, describe, Breakpoint, it, expect, afterEach, beforeEach, jasmine */
describe('Boostrap Breakpoints', function () {
    var win = $(window);
    var resizeWindowTo = function (width) {
        window.innerWidth = width;
        win.trigger('resize');
    };

    beforeEach(function () {
        resizeWindowTo(300);
        Breakpoint.init();
    });

    afterEach(function () {
        Breakpoint.destroy();
    });

    it('creates object', function () {
        expect(Breakpoint).toBeDefined();
    });

    it('has defaults', function () {
        expect(Object.keys(Breakpoint.getBreakpoints())).toEqual(['xs', 'sm', 'md', 'lg']);
    });

    it('can extend defaults', function () {
        Breakpoint.init({ lg: { max: 1900 }, xl: { min: 1901, max: Infinity }});
        expect(Breakpoint.getBreakpoints().xl).toEqual({ min: 1901, max: Infinity });
        expect(Breakpoint.getBreakpoints().lg).toEqual({ min: 1200, max: 1900 });
    });

    it('has defined public API', function () {
        expect(Object.keys(Breakpoint))
            .toEqual(['init', 'destroy', 'is', 'current', 'getBreakpoints']);
        expect(Breakpoint.init).toBeDefined();
        expect(Breakpoint.destroy).toBeDefined();
        expect(Breakpoint.is).toBeDefined();
        expect(Breakpoint.getBreakpoints).toBeDefined();
        expect(Breakpoint.current).toBeDefined();
    });

    it('triggers event on window whenever breakpoint is changed', function () {
        var spy = jasmine.createSpy('spy');
        win.on('change:breakpoint', spy);
        resizeWindowTo(800);
        resizeWindowTo(820);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), 'sm', 'xs');
        expect(spy.calls.count()).toEqual(1);
    });

    it('triggers event on window first time Breakpoint is initialized, previous is always xs', function () {
        var spy = jasmine.createSpy('spy');
        Breakpoint.destroy();
        win.on('change:breakpoint', spy);
        Breakpoint.init();
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toEqual(1);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), 'xs', 'xs');
    });

    describe('Methods', function () {

        describe('.is()', function () {
            it('returns true if current breakpoint is an argument', function () {
                expect(Breakpoint.is('xs')).toBe(true);
                resizeWindowTo(780);
                expect(Breakpoint.is('sm')).toBe(true);
            });

            it('returns false if argument is not current breakpoint', function () {
                expect(Breakpoint.is('lg')).toBe(false);
            });

            it('throws an error when invalid breakpoint is passed', function () {
                expect(function () {
                    Breakpoint.is('invalid');
                }).toThrowError('Invalid breakpoint');
            });
        });

        describe('.current()', function () {
            it('returns current breakpoint', function () {
                expect(Breakpoint.current()).toEqual('xs');
            });
            it('returns undefined is breakpoint is not initialized', function () {
                Breakpoint.destroy();
                expect(Breakpoint.current()).not.toBeDefined();
            });
        });

        describe('.init()', function () {
            it('creates only one event handler on window resize', function () {
                // uses jquery private $._data, sry about that
                expect($._data(window, 'events').resize.length).toEqual(1);
                Breakpoint.init();
                expect($._data(window, 'events').resize.length).toEqual(1);
                Breakpoint.init({ lg: { max: 1900 }, xl: { min: 1901, max: Infinity }});
                expect($._data(window, 'events').resize.length).toEqual(1);
            });
        });

        describe('.destroy()', function () {
            beforeEach(function () {
                Breakpoint.destroy();
            });
            it('unsets current breakpoint', function () {
                expect(Breakpoint.current()).not.toBeDefined();
            });
            it('removes resize handler', function () {
                expect($._data(window, 'events').resize).not.toBeDefined();
            });
        });
    });
});
