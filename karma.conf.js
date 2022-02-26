// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
const packageJson = require(path.join(process.cwd(), 'package.json'));

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-sonarqube-unit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    junitReporter: {
      outputDir: path.join(process.cwd(), 'reports', 'UnitTest', 'unit'),
      suite: packageJson.name,
      useBrowserName: true,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'test-result/ut_report.xml',
      testPaths: ['./src/app'],
      testFilePattern: '.spec.ts',
      useBrowserName: false,
      overrideTestDescription: true
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' }, // Required by Darwin: necessary for QA
        { type: 'text-summary' }
      ]
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
           '--headless',
           '--disable-gpu',
           // Without a remote debugging port, Google Chrome exits immediately.
           '--remote-debugging-port=9222',
           '--no-sandbox'
       ]
     }
    },
    reporters: ['junit', 'sonarqubeUnit', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'], //'Chrome', 'Edge', 'Firefox', 'IE'
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    captureTimeout: 60000,
    singleRun: false,
    restartOnFileChange: true,
    files: [
      { pattern: './src/assets/**', watched: false, included: false, nocache: false, served: true }
    ],
    proxies: {
      "/assets/": "/base/src/assets/"
    }
  });
};
