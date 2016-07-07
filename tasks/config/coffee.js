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
 * `coffee`
 *
 * ---------------------------------------------------------------
 *
 * Compile CoffeeScript files located in `assets/js` into Javascript
 * and generate new `.js` files in `.tmp/public/js`.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-coffee
 *
 */
module.exports = function(grunt) {

  grunt.config.set('coffee', {
    dev: {
      options: {
        bare: true,
        sourceMap: true,
        sourceRoot: './'
      },
      files: [{
        expand: true,
        cwd: 'assets/js/',
        src: ['**/*.coffee'],
        dest: '.tmp/public/js/',
        ext: '.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
};
