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
