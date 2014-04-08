module.exports = function (config) {
    config.set({
        files: [
            'vendor/angular/angular.js',
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/big.js/big.js',
            'app/js/src/**/*.js',
            'app/js/test/unit/**/*.js'
        ],
        port: 9999,
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: true,
        colors: true
    });
};
