module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            // Polyfills.
            'node_modules/core-js/client/shim.min.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',

            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'karma-test-shim.js',

             // RxJs.
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            //lodash
            { pattern: 'node_modules/lodash/**/*.js', included: false, watched: false},

            // paths loaded via module imports
            // Angular itself
            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
            { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

            { pattern: 'dist/**/*.js', included: false, watched: true },
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it
        ],
        proxies: {
            '/dist/': '/base/dist/'
        },

        port: 9875,

        logLevel: config.LOG_INFO,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-remap-istanbul',
            'karma-istanbul-threshold',
            'karma-spec-reporter'
        ],

        reporters: ['coverage', 'karma-remap-istanbul', 'istanbul-threshold', 'spec'],

        preprocessors: {
            'dist/**/!(*spec|*mock).js': ['coverage']
        },

        coverageReporter: {
            reporters: [
                {type: 'json', dir: 'coverage', subdir: '.', file: 'coverage-unmapped.json'}
            ]
        },

        remapIstanbulReporter: {
            src: 'coverage/coverage-unmapped.json',
            reports: {
                'json': 'coverage/coverage-final.json',
                'html': 'coverage'
            }
        },

        istanbulThresholdReporter: {
            src: 'coverage/coverage-final.json',
            basePath: '.',
            reporters: ['text'],
            thresholds: {
                global: {
                    statements: 90,
                    branches: 90,
                    lines: 70,
                    functions: 90
                },
                each: {
                    statements: 80,
                    branches: 80,
                    lines: 60,
                    functions: 80
                }
            }
        },

        singleRun: true
    })
}