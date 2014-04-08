describe('Big', function () {
    beforeEach(module('Big'));

    describe('constant', function () {
        it('zero, one, two, ten should all be correct', function () {
            inject(function (zero, one, two, ten) {
                expect(zero.toFixed()).toEqual("0");
                expect(one.toFixed()).toEqual("1");
                expect(two.toFixed()).toEqual("2");
                expect(ten.toFixed()).toEqual("10");
            });
        });
    });

    describe('service big', function () {
        it('should be able to make a big number', function () {
            inject(function (big) {
                expect(big.make("5").toFixed()).toEqual("5");
            });
        });

        it('should add two big numbers', function () {
            inject(function (big, one, two, ten) {
                expect(big.add(one, two).toFixed()).toEqual("3");
                expect(big.add(two, ten).toFixed()).toEqual("12");
            });
        });

        it('should multiply two big numbers', function () {
            inject(function (big, one, two, ten) {
                expect(big.multiply(one, two).toFixed()).toEqual("2");
                expect(big.multiply(two, ten).toFixed()).toEqual("20");
            });
        });

        it('should find the sum of many big numbers', function () {
            inject(function (big, one, two, ten) {
                expect(big.sum([one, two]).toFixed()).toEqual("3");
                expect(big.sum([two, ten]).toFixed()).toEqual("12");
            });
        });

        it('should find the product of many big numbers', function () {
            inject(function (big, one, two, ten) {
                expect(big.product([one, two]).toFixed()).toEqual("2");
                expect(big.product([two, ten]).toFixed()).toEqual("20");
            });
        });
    });

    describe('filter', function () {
        it('fixed should work correctly', function () {
            inject(function (two, fixedFilter) {
                expect(fixedFilter(two)).toEqual("2");
                expect(fixedFilter(two, 2)).toEqual("2.00");
                expect(fixedFilter(two, 6)).toEqual("2.000000");
            });
        });
    });
});
