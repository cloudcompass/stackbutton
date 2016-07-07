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
 * `buildProd`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist will be executed instead of `build` if you
 * run `sails www` in a production environment, e.g.:
 * `NODE_ENV=production sails www`
 *
 * This generates a folder containing your compiled (and usually minified)
 * assets.  The most common use case for this is bundling up files to
 * deploy to a CDN.
 *
 * For more information see:
 *   http://sailsjs.org/documentation/anatomy/my-app/tasks/register/build-prod-js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('buildProd', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'linkAssetsBuildProd',
    'clean:build',
    'copy:build'
  ]);
};

