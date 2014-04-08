module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        files: {
            js: 'app/js/**/*.js',
            build: 'dist/angular-big.js',
            src: 'app/js/src/**/*.js',
            unit: 'app/js/test/unit/**/*.js',
            e2e: 'app/js/test/e2e/**/*.js'
        },

        shell: {
            options: {
                stdout: true
            },
            selenium: {
                command: './selenium/start',
                options: {
                    stdout: false,
                    async: true
                }
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            npm_install: {
                command: 'npm install'
            }
        },

        connect: {
            options: {
                base: 'public/index.php'
            },
            webserver: {
                options: {
                    hostname: 'localhost',
                    port: 8888,
                    keepalive: true
                }
            },
            devserver: {
                options: {
                    port: 8888
                }
            },
            testserver: {
                options: {
                    port: 9999
                }
            },
            coverage: {
                options: {
                    base: 'coverage/',
                    port: 5555,
                    keepalive: true
                }
            }
        },

        protractor: {
            options: {
                configFile: "protractor.conf.js"
            },
            singlerun: {},
            auto: {
                keepAlive: true,
                options: {
                    args: {
                        seleniumPort: 4444
                    }
                }
            }
        },

        jshint: {
            options: {
//                jshintrc: '.jshintrc'
            },
            all: [
//                'Gruntfile.js',
                '<%= files.js %>'
            ]
        },

        concat: {
//            styles: {
//                dest: './app/assets/app.css',
//                src: [
//                    'app/styles/app.css',
//                    //place your Stylesheet files here
//                ]
//            },
            scripts: {
                options: {
                    separator: ''
                },
                dest: '<%= files.build %>',
                src: [
//                    'bower_components/angular/angular.js',
//                    'bower_components/angular-route/angular-route.js',
//                    'bower_components/angular-animate/angular-animate.js',
                    '<%= files.src %>',
                ]
            }
        },

        watch: {
            options: {
                livereload: 7777
            },
            assets: {
                files: [
//                    'app/styles/**/*.css',
                    '<%= files.src %>'
                ],
                tasks: ['concat']
            }
//            protractor: {
//                files: [
//                    '<%= files.src %>',
//                    '<%= files.e2e %>'
//                ],
//                tasks: ['protractor:auto']
//            },
//            karma: {
//                files: [
//                    '<%= files.src %>',
//                    '<%= files.unit %>'
//                ],
//                tasks: ['karma:unit_coverage']
//            }
        },

        open: {
            devserver: {
                path: 'http://localhost:8888'
            },
            coverage: {
                path: 'http://localhost:5555'
            }
        },

        karma: {
            unit: {
                configFile: 'karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_auto: {
                configFile: 'karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            },
            unit_coverage: {
                configFile: 'karma-unit.conf.js',
                autoWatch: true,
                singleRun: false,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                    'app/js/src/**/*.js': ['coverage']
                },
                coverageReporter: {
                    type: 'html',
                    dir: 'coverage/'
                }
            }
        }
    });

    //single run tests
    grunt.registerTask('test', ['jshint', 'test:unit', 'test:e2e']);
    grunt.registerTask('test:unit', ['jshint', 'concat', 'karma:unit']);
    grunt.registerTask('test:e2e', ['jshint', 'concat', 'connect:testserver', 'protractor:singlerun']);

    //autotest and watch tests
    grunt.registerTask('autotest', ['karma:unit_auto']);
    grunt.registerTask('autotest:unit', ['karma:unit_auto']);
    grunt.registerTask('autotest:e2e', ['connect:testserver', 'shell:selenium', 'watch:protractor']);

    //coverage testing
    grunt.registerTask('test:coverage', ['karma:unit_coverage']);
    grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);

    //installation-related
    grunt.registerTask('install', ['update', 'shell:protractor_install']);
    grunt.registerTask('update', ['shell:npm_install', 'concat']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['update', 'connect:devserver', 'open:devserver', 'watch:assets']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);
};