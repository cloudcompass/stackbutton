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
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords(req, res) {

  // Look up the model
  var Model = actionUtil.parseModel(req);


  // If an `id` param was specified, use the findOne blueprint action
  // to grab the particular instance with its primary key === the value
  // of the `id` param.   (mainly here for compatibility for 0.9, where
  // there was no separate `findOne` action)
  if (actionUtil.parsePk(req)) {
    return require('./findOne')(req, res);
  }

  // Lookup for records that match the specified criteria
  var query = Model.find()
    .where(actionUtil.parseCriteria(req))
    .limit(actionUtil.parseLimit(req))
    .skip(actionUtil.parseSkip(req))
    .sort(actionUtil.parseSort(req));
  query = actionUtil.populateRequest(query, req);
  query.exec(function found(err, matchingRecords) {
    if (err) return res.serverError(err);
    // SB Policy: filter query results
    var allowedRecords;
    AuthService.filterResults(req.user.id, req.model.identity, matchingRecords, function (records) {
      allowedRecords = records;

      sails.log.info(req.model.identity, 'filtered', allowedRecords.length, matchingRecords.length);
      publish(allowedRecords);
      res.ok(allowedRecords);
    });
  });


  function publish(records) {
    // Only `.watch()` for new instances of the model if
    // `autoWatch` is enabled.
    if (req._sails.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, records);
      if (req.options.autoWatch) {
        Model.watch(req);
      }
      // Also subscribe to instances of all associated models
      _.each(records, function (record) {
        actionUtil.subscribeDeep(req, record);
      });
    }
  }
};

