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
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      minLength: 2
    },
    description: {
      type: "string",
      required: true
    },
    contributors: {
      collection: 'user'
    },
    dashboards: {
      collection: "dashboard",
      via: 'project'
    },
    modules: {
      collection: 'module',
      via: 'project'
    }
  },

  afterCreate: [
    function createDashboard(project, next) {
      sails.log.info('Project.afterCreate.createDashboard', project);
      Project.findOne({id: project.id}).populate('dashboards')
        .exec(function (err, res) {
          res.dashboards.add({
            name: 'Default',
            project: project.id,
            private: false,
            owner: project.owner,
            createdBy: project.owner
          });
          res.save(function (err, res) {
            if (err) {
              sails.log.error(err);
              next(err);
            } else {
              next();
            }
          });
        });
    }
  ],

  afterDestroy: function (destroyedRecords, cb) {
    var promises = Promise.all([
      Dashboard.destroy({project: _.pluck(destroyedRecords, 'id')}),
      Module.destroy({project: _.pluck(destroyedRecords, 'id')}),
      Event.destroy({project: _.pluck(destroyedRecords, 'id')})
    ]);

    promises.then(function (resp) {
      cb();
    })

  }
};
