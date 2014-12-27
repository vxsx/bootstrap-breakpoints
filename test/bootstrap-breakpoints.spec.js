/* global window, $, describe, Breakpoint, it, expect, afterEach, beforeEach, jasmine */
describe('Boostrap Breakpoints', function () {
    var resizeWindowTo = function (width) {
        window.innerWidth = width;
        $(window).trigger('resize');
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
        $(window).on('change:breakpoint', spy);
        resizeWindowTo(800);
        resizeWindowTo(820);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(jasmine.any(Object), 'sm', 'xs');
        expect(spy.calls.count()).toEqual(1);
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
        });
    });
});
