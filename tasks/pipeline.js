/**

Copyright 2016, Cloud Compass Computing, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   ../
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'node_modules/angular-material/angular-material.css',
  'node_modules/nvd3/build/nv.d3.css',
  'node_modules/mdi/css/materialdesignicons.min.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'node_modules/socket.io-client/socket.io.js',
  'node_modules/sails.io.js/sails.io.js',
  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-resource/angular-resource.min.js',
  'node_modules/angular-animate/angular-animate.min.js',
  'node_modules/angular-cookies/angular-cookies.min.js',
  'node_modules/angular-aria/angular-aria.min.js',
  'node_modules/d3/d3.min.js',
  'node_modules/nvd3/build/nv.d3.min.js',
  'node_modules/angular-nvd3/dist/angular-nvd3.min.js',
  'node_modules/angular-sanitize/angular-sanitize.min.js',
  'node_modules/angular-messages/angular-messages.min.js',
  'node_modules/angular-material/angular-material.min.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  'node_modules/ui-router-extras/release/modular/ct-ui-router-extras.core.min.js',
  'node_modules/ui-router-extras/release/modular/ct-ui-router-extras.transition.min.js',
  'node_modules/ui-router-extras/release/modular/ct-ui-router-extras.previous.min.js',
  'node_modules/angular-sails/dist/angular-sails.min.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'app/**/*.js',
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'app/views/**/*.html',
  'templates/**/*.html'
];


// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (tplPath) {
  return require('path').join('assets/', tplPath);
});

module.exports.jsFilesToCopy = jsFilesToInject;
module.exports.cssFilesToCopy = cssFilesToInject;


