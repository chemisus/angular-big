angular.module('Big', [])
    .constant('zero', new Big("0"))
    .constant('one', new Big("1"))
    .constant('two', new Big("2"))
    .constant('ten', new Big("10"))
    .service('big', function (zero, one) {
        this.make = function (value) {
            return new Big(value);
        };

        this.add = function (a, b) {
            return a.plus(b);
        };

        this.multiply = function (a, b) {
            return a.times(b);
        };

        this.sum = function (values) {
            return values.reduce(function (current, value) {
                return current.plus(value);
            }, zero);
        };

        this.product = function (values) {
            return values.reduce(function (current, value) {
                return current.times(value);
            }, one);
        };
    })
    .filter('fixed', function () {
        return function (value, decimals) {
            return value.toFixed(decimals);
        };
    })
;
