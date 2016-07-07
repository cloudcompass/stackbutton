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
 * `build`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist will be executed if you run `sails www` or
 * `grunt build` in a development environment.  It generates a
 * folder containing your compiled assets, e.g. for troubleshooting
 * issues with other Grunt plugins, bundling assets for an Electron
 * or PhoneGap app, or deploying your app's flat files to a CDN.
 *
 * Note that when running `sails www` in a production environment (with the
 * `NODE_ENV` environment variable set to 'production') the `buildProd` task
 * will be run instead of this one.
 *
 * For more information see:
 *   http://sailsjs.org/documentation/anatomy/my-app/tasks/register/build-js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('build', [
    'compileAssets',
    'linkAssetsBuild',
    'clean:build',
    'copy:build'
  ]);
};
