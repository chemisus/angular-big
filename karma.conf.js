module.exports = function (config) {
    config.set({
        files: [
            'vendor/angular/angular.js',
            'vendor/angular-route/angular-route.js',
            'vendor/angular-mocks/angular-mocks.js',
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
