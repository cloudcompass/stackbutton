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
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  /**
   * Set permissions for team functionality
   */
  var findRole = Role.findOne({name: 'registered'});
  var findUserModel = Model.findOne({identity: 'user'});
  var findProjectModel = Model.findOne({identity: 'project'});

  var ok = Promise.all([findRole, findUserModel, findProjectModel]);

  ok.then(function (resp) {
      var userQuery = {
        role: resp[0].id,
        model: resp[1].id,
        action: 'read'
      };

      Permission.destroy(userQuery).exec(function (err) {
        if (err) return sails.log.error(err);
        sails.log.info('deleted user read permission');
        userQuery.relation = 'role';
        Permission.create(userQuery).exec(function (err, permission) {
          if (err) return sails.log.error(err);
          sails.log.info('created user read permission');
        });
      });

      var projQuery = {
        role: resp[0].id,
        model: resp[2].id,
        action: 'delete',
        relation: 'role'
      };

      Permission.findOrCreate(projQuery).exec(function (err, permission) {
        if (err) return sails.log.error(err);
        sails.log.info('checked project/contributor delete permission');
      });
    }
  );
  //////////////////////////////// end teams

// It's very important to trigger this callback method when you are finished
// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
}
;
