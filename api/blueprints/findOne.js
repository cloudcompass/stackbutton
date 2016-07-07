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
 * Module dependencies
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
/**
 * Find One Record
 *
 * get /:modelIdentity/:id
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified id.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to look up *
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findOneRecord(req, res) {

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);

  var query = Model.findOne(pk);
  query = actionUtil.populateRequest(query, req);
  query.exec(function found(err, matchingRecord) {
    if (err) return res.serverError(err);
    if (!matchingRecord) return res.notFound('No record found with the specified `id`.');

    // SB Policy: filter query result
    var allowedRecords;
    AuthService.filterResults(req.user.id, req.model.identity, [matchingRecord], function (records) {
      allowedRecords = records;
      sails.log.info(req.model.identity, 'filtered', allowedRecords.length, 1);
      if (allowedRecords.length == 1) {
        if (req._sails.hooks.pubsub && req.isSocket) {
          Model.subscribe(req, allowedRecords[0]);
          actionUtil.subscribeDeep(req, allowedRecords[0]);
        }
        res.ok(allowedRecords[0]);
      } else {
        res.notFound('Not permitted to access record with the specified `id`.');
      }
    });
  });

};
