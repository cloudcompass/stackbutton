/**

Copyright 2016, Cloud Compass, Inc.

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
 * PayloadController
 *
 * @description :: Server-side logic for managing payloads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `PayloadController.addEvent()`
   */
  addEvent: function (req, res) {
    if (typeof req.headers['x-github-event'] != 'undefined') {
      sails.log.info('found github header');
      event = GithubService.createEvent(req, null);
    }
    Event.create(event).exec(function createCB(err, created) {
      sails.log.info('Created event', created);
      Event.publishCreate(created);
      return res.json(created);
    });
  }
};
