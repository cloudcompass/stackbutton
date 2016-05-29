var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

/*
 *
 * Helper service for enforcing security policies
 *
 */

module.exports = {

  // validates user's permission to create a model instance
  // callback signature: function(err, boolean)
  canCreate: function (user, data, cb) {
    if (_.has(data, 'project')) {
      // validate Dashboard, Service creation

      // extract id property if object was submitted instead of identifier
      var projId = _.has(data.project, 'id') ? data.project.id : data.project;

      Project.findOne({id: projId}).exec(function (err, project) {
        if (err) {
          cb(err, null);
        } else if (project && ( project.owner == user || _.includes(project.contributors, user))) {
          // user is owner or contributor
          cb(null, true); // allow
        } else {
          cb(null, false); // deny
        }
      });

    } else if (_.has(data, 'dashboard')) {
      // validate Widget creation

      Dashboard.findOne(data.dashboard).populate('project').exec(function (err, dashboard) {
        if (err) {
          cb(null, err);
        } else if (dashboard && ( 
            // user owns dashboard
            dashboard.owner == user ||
            // user owns project
            dashboard.project.owner == user ||
            // user contributes to project and dashboard is public
            (dashboard.private == false && _.includes(dashboard.project.contributors, user))
          )) {
          cb(null, true); // allow
        } else {
          cb(null, false); // deny
        }
      });

    } else if (_.has(data, 'service')) {

      // for modules
      Service.findOne(data.service).exec(function (err, service) {
        if (err) {
          cb(err, null);
        } else if (service && service.owner == user) { // user owns service
          cb(null, true); // allow
        } else {
          cb(null, false); // deny
        }
      });

    } else {
      // allow creation of all other models
      cb(null, true);
    }
  }

};
/**
 * Created by tiffa on 2016-05-28.
 */
