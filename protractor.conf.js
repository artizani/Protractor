/* eslint-disable quote-props */

'use strict';

const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const reporters = require('jasmine-reporters');
const matchers = require('./matchers');
const SpecReporter = require('jasmine-spec-reporter');
const req = require('./build/request');
const path = require('path');
const { prime } = require('./build/prime');
const { CHARGING_LAWYER } = require('./build/users');
const {
  installAnimationModule,
  installConsoleReporter,
  installPageCapture,
  installScrollModule,
  installTextareaModule,
  installWaitForPageReadyModule,
  proxyConfig
} = require('./config');

// proxies

const webProxy = process.env.webProxy === 'true' || false;

module.exports.config = {

  directConnect: false,

  chromeDriver: require('chromedriver').path,

  capabilities: {

    browserName: 'firefox',

    chromeOptions: {
      args: ['--disable-web-security']
    },
    proxy: webProxy ? proxyConfig : { proxyType: 'direct' }
  },

  allScriptsTimeout: 30000,

  getPageTimeout: 29000,

  framework: 'jasmine',

  suites: {
    endpoint_load: [
      'specs/endpoint-load/**/*.js',
      path.join(process.cwd() + '/src/app/views/**/*.e2e.js')
    ],
    sjs: [
      'specs/sjs/dashboards.e2e.js',
      'specs/sjs/search.js',
      'specs/sjs/sjp-case-overview.js',
      'specs/sjs/sjp-start-session.js',
      'specs/sjs/sjp-session-tests/sjp-no-magistrate-result-withdrawal.js',
      'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-withdrawal.js',
      'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-dismiss.js',
      'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-financial-penalty.js',
      'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-discharge.js',
      'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-rsjp.js',
      'specs/sjs/update-plea.js',
      'specs/sjs/sjp-awaiting-cases.js',
      'specs/sjs/sjp-pending-cases.js',
      'specs/sjs/tfl-case-overview.js',
      'specs/sjs/tfl/tfl-check-csv-upload.e2e.js',
      'specs/sjs/tfl/tfl-check-invalid-csv-upload.e2e.js',
      'specs/sjs/tfl/check-document-upload.e2e.js',
      'specs/sjs/tfl/check-invalid-document-upload.e2e.js'
    ],
    idam_integration: [
      'specs/idam-integration/login.js'
    ]
  },
  suite: 'sjs,endpoint_load',

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    displayStacktrace: true,
    displaySpecDuration: true,
    defaultTimeoutInterval: 120000,
    includeStackTrace: true,
    print: function () { }
  },

  baseUrl: 'http://localhost:9019',

  params: {
    apiUrl: 'http://localhost:8080',
    viewPath: path.join(process.cwd(), 'src', 'app', 'views/'),
    testDataPathForSpecs: path.join(process.cwd(), '/e2e/data/specs/'),
    listingRestServer: 'localhost',
    reportPath: path.join(process.cwd(), 'reports', 'protractor/'),
    listingRestPort: 8080,
    login: {
      user: 'us3rT3st',
      password: 'passw0rdT3st'
    },
    proxy: proxyConfig,
    screenshots: false,
    ecTimeout: 28000,
    cjscppuid: CHARGING_LAWYER.userId
  },
  plugins: [{
    package: 'protractor-console',
    logLevels: ['severe']
  }],

  onPrepare: function prepare() {
    if (browser.params.apiProxy) {
      req.setProxy(proxyConfig.httpProxy);
    }
    req.setTimeout(15000);
    req.setCJSCPPUID(browser.params.cjscppuid);
    req.setBaseUrl(browser.params.apiUrl);

    browser.driver.manage().window().setSize(1200, 1000);

    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

    if (browser.params.screenshots) {
      jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: path.join(browser.params.reportPath, 'html/'),
        screenshotsFolder: 'images'
      }));
    }

    jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
      savePath: path.join(browser.params.reportPath, 'xml'),
      consolidateAll: true
    }));

    installConsoleReporter();

    installAnimationModule();
    installPageCapture(path.join(browser.params.reportPath, '/page-sources/'));
    installScrollModule();
    installTextareaModule();
    installWaitForPageReadyModule();

    beforeEach(() => jasmine.addMatchers(matchers));

    if (browser.params.prime) {
      const defer = protractor.promise.defer();

      prime((err, val) => err ? defer.reject(err) : defer.fulfill(val));

      beforeAll(() => {
        req.setCJSCPPUID(browser.params.cjscppuid);
      });

      return defer.promise.then(() => console.log('primed!'));
    }
  }
};
