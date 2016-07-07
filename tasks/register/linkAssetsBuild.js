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
 * `linkAssetsBuild`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist is not designed to be used directly-- rather
 * it is a helper called by the `build` tasklist.
 *
 * For more information see:
 *   http://sailsjs.org/documentation/anatomy/my-app/tasks/register/link-assets-build-js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('linkAssetsBuild', [
    'sails-linker:devJsRelative',
    'sails-linker:devStylesRelative',
    'sails-linker:devTpl',
    'sails-linker:devJsRelativeJade',
    'sails-linker:devStylesRelativeJade',
    'sails-linker:devTplJade'
  ]);
};
