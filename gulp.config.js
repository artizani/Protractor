(function() {

  'use strict';

  module.exports = function() {

    var root = './',
      src = './src/',
      app = src + 'app/',
      reports = './reports/',
      dist = './dist/',
      assets = src + 'assets/',
      e2e = './e2e/';

    var wiredep = require('wiredep');
    var packageJson = require('./package.json');

    var config = {
      build_dir: dist,
      build_destination: 'dist',
      distConfig: 'dist/app/config/',
      distStyles: './dist/styles',
      vendorStyles: 'src/assets/styles/vendor.less',
      cssToMerge: ['dist/styles/app.css', 'dist/styles/index.css'],
      imagesSrc: 'src/images/**',
      bowerFiles: '**/*.js',
      protFiles: [
        'e2e/**/*.e2e.js',
        'src/app/views/**/*.e2e.js'
      ],
      protractorConfig: 'e2e/protractor.dev.conf.js',
      pa11yFailureLevel: 'error',
      lazyLoadedJs: [
        'src/**/components/**/*.js',
        'src/**/views/**/*.js',
        '!src/app/views/routes.module.js',
        '!src/**/*.spec.js',
        '!src/**/*.e2e.js',
        '!src/**/*.page.js',
        '!src/app/components/dev-tools/**/*.js'
      ],
      appJs: [
        'src/app/**/*.js',
        '!src/**/*.spec.js',
        '!src/**/*.e2e.js',
        '!src/**/*.page.js'
      ],
      allTestFiles: [
        'src/**/*.spec.js'
      ],
      languageFiles: 'src/**/*.lang.json',
      routesFile: ['src/app/**/routes.json'],
      allAppCss: ['**/app*.css', '**/index*.css'],
      distScripts: 'dist/scripts',
      distVendor: 'dist/vendor',
      distLanguages: 'dist/languages',
      allLangualgesFiles: 'src/app/**/*.lang.json',
      coreJs: [
        'app/app.module.js',
        'app/app.component.js',
        'app/components/application/api/api-http-backend.service.js',
        'app/components/application/api/notifications.service.js',
        'app/components/application/api/api.service.js',
        'app/components/application/api/api.js',
        'app/components/application/application.module.js',
        'app/components/application/services/utility.service.js',
        'app/components/application/services/api-calls.service.js',
        'app/views/routes.module.js',
        'app/views/index/index.module.js',
        'app/config/**/*.js',
        'app/components/application/scroll/scroll.js',
        'app/components/application/layout/ui-header/header.component.js',
        'app/components/application/layout/ui-footer/footer.component.js',
        'external/**/*.js',
        'app/components/dev-tools/**/*.js',
        'app/components/application/directives/connection-banner/*.js',
        '!**/*.spec.js',
        '!**/*.e2e.js',
        '!**/*.page.js'
      ],
      nodeImages: [
        'node_modules/govuk_frontend_toolkit/images/**',
        'node_modules/@govuk/platform-template/lib/govuk_template/images/**',
        'node_modules/@govuk/platform-template/assets/images/**',
        'node_modules/@govuk/platform-template/lib/govuk_template/stylesheets/images/**'
      ],
      distApp: dist + 'app',
      allAppJs: 'src/app/**/*.js',
      fontFiles: [
        'bower_components/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
        'bower_components/bootstrap/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
        'node_modules/@govuk/platform-template/assets/fonts/*.{otf,eot,svg,ttf,woff,woff2}'
      ],
      fontDest: 'dist/assets/fonts',
      cppAssets: ['bower_components/ng-gov-uk/dist/assets/**/*', '!bower_components/ng-gov-uk/dist/assets/css/**'],
      bowerCss: ['bower_components/**/*.css', '!bower_components/ng-gov-uk/**/*'],
      appProd: '**/app-*.min.{js,css}',
      indexHtml: 'src/index.html',
      allHtml: '**/*.html',
      vendorCss: '**/vendor*.css',
      prodVendorJs: 'scripts/vendor*.js',
      allConfigJs: 'src/app/config/*.js',
      configJs: dist + '**/config.module.js',
      allImagesFiles: '**/*.{png,jpg,jpeg,gif}',
      distImages: 'dist/assets/images',
      banner: '/*! Version ' + packageJson.version + ' - ' + new Date().toString() + ' */\n',
      version: packageJson.version,
      src_dir: src,
      root: root,
      reports: reports,
      pa11y_dir: reports + 'pa11y/',
      pa11y_sources: reports + 'protractor/page-sources/',
      e2e_report_dir: reports + 'e2e/',
      tests_report_dir: reports + 'coverage/',

      globs: {
        js: [
          src + 'app/**/*.js',
          e2e + '**/*.js'
        ],

        translations: './languages/*',
        tests: [src + '**/test/*']
      },

      templates: {

        module_name: 'cpp-ui-spa-master',

        src: ['./src/**/*.html'],

        dest: {
          production: {
            file_name: 'app-templates.js',
            dir: dist + 'scripts'
          },
          development: {
            file_name: 'app-templates.js',
            dir: dist + 'app'
          }
        }

      },

      /*
       * Karma and test settings
       */
      karmaConf: __dirname + '/karma.conf.js',
      karmaPlugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-sinon',
        'karma-junit-reporter',
        'karma-ng-html2js-preprocessor',
        'karma-babel-preprocessor'
      ],
      karmaBowerDependencies: getKarmaBowerDependencies(),
      npmDependencies: [__dirname + '/node_modules/@govuk/angularjs-components/angularjs-components.js'],
      appFilesToTest: [
        app + 'config/bootstrap.service.js',
        app + '**/*.module.js',
        app + '**/!(*.e2e|*.page).js'
      ],

      /*
       * Browser sync serving paths
       */
      serve: {
        dev: {
          root: dist,
          port: 9009,
          index: 'index.html'
        },
        dist: {
          root: dist, // path to serve from
          port: 9009
        },
        prod: {
          root: dist,
          port: 9009
        }
      },

      browserReloadDelay: 1000,

      /*
       * Node settings
       */
      defaultPort: 8080,
      host: 'http://localhost:',
      serverFiles: 'mock',
      ramlServer: 'mock/server.js',
      raml: 'mock/raml/'
    };

    config.karma = getKarmaOptions();

    return config;

    ///////////////////////

    function getKarmaBowerDependencies() {

      return wiredep({
        devDependencies: true
      })['js'];
    }

    function getKarmaOptions() {
      var options = {
        files: [].concat(
          'testing/install-locale.js', {
            pattern: 'src/app/config/app.config.json',
            watched: true,
            served: true,
            included: false
          },
          config.karmaBowerDependencies, // karma dependencies i.e. angular mocks
          config.npmDependencies, //pdk components
          config.appFilesToTest, // app modules and files to test
          {
            pattern: 'src/app/**/*.html',
            watched: true,
            served: true,
            included: true
          }, {
            pattern: 'src/**/*.lang.json',
            included: false
          }
        ),
        coverage: {
          dir: config.tests_report_dir,
          reporters: [ // types of reporters to use
            {
              type: 'html',
              subdir: 'report-html'
            }, // report in browser
            {
              type: 'lcov',
              subdir: 'report-lcov'
            }, // for jenkin reading
            {
              type: 'text-summary'
            } // output to the console
          ]
        },
        preprocessors: {
          'src/**/*.js': ['babel'],
          'src/**/!(test)/*.js': ['coverage'],
          'src/app/**/*!(index).html': 'ng-html2js'
        },
        babelPreprocessor: {
          options: {
            presets: ['es2015'],
            sourceMap: 'inline'
          },
          filename: function(file) {
            return file.originalPath.replace(/\.js$/, '.es5.js');
          },
          sourceFileName: function(file) {
            return file.originalPath;
          }
        },
        ngHtml2JsPreprocessor: {
          stripPrefix: 'src/',
          moduleName: 'templates'
        }
      };

      return options;
    }
  };
}());

