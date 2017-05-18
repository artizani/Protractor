'use strict';

var users = require('./util/sessions').users,
  path = require('path'),
  isProxy = process.env.proxy === 'true' || false;


var proxyConfig = {
  proxyType: 'manual',
  httpProxy: '10.224.23.8:3128',
  noProxy: 'localhost'
};

module.exports.config = {

  directConnect: false,

  chromeDriver: require('chromedriver').path,

  capabilities: {

    browserName: 'firefox',

    //shardTestFiles: true,

    //maxInstances: 2,

    chromeOptions: {
      args: ['--disable-web-security,--disable-extensions']
    },
    /*
     * Can be used to specify the phantomjs binary path.
     * This can generally be ommitted if you installed phantomjs globally.
     */
    'phantomjs.binary.path': require('phantomjs-prebuilt').path,

    /*
     * Command line args to pass to ghostdriver, phantomjs's browser driver.
     * See https://github.com/detro/ghostdriver#faq
     */
    'phantomjs.ghostdriver.cli.args': ['--loglevel=ERROR'],
    proxy: isProxy ? proxyConfig : { proxyType: 'direct' }
  },

  allScriptsTimeout: 30000,

  getPageTimeout: 29000,

  framework: 'jasmine',

  suites: {
    endpoint_load: [
      // 'specs/sjs/sjp-session-tests/sjp-with-magistrate-result-discharge.js'
      'specs/sjs/operational-reports/**/*.js'
      // ,
      // path.join(process.cwd() + '/src/app/views/**/*.e2e.js')
    ],
    sjs: [
      // 'specs/e2e/specs/sjs/operational-reports/view-operational-reports.js'
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

  baseUrl: 'http://10.124.37.6',

  params: {
    apiUrl: 'http://10.124.37.6/:81',
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
    cjscppuid: users.CHARGING_LAWYER
  },
  plugins: [{
    package: 'protractor-console',
    logLevels: ['info']
  }],

  onPrepare: require('./hooks').onPrepare,
  onComplete: require('./hooks').onComplete
};
