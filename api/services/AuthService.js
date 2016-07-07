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

      // extract id property if object was submitted instead of identifier
      var dashboardId = _.has(data.dashboard, 'id') ? data.dashboard.id : data.dashboard;

      Dashboard.findOne({id: dashboardId}).populate('project').exec(function (err, dashboard) {
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
      // validate module creation

      // extract id property if object was submitted instead of identifier
      var serviceId = _.has(data.service, 'id') ? data.service.id : data.service;

      Service.findOne({id: serviceId}).exec(function (err, service) {
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
  },

  // filters a result set for instances a user is permitted to access
  filterResults: function (userId, modelIdentity, records, cb) {
    var allowedRecords = [];
    switch (modelIdentity) {
      case 'project': // by owner+contributors
      case 'module': // by project.owner+contributors
      case 'event': // by project.owner/contributors
        AuthService.getAuthorizedProjects(userId, function (err, projects) {
          allowedRecords = _.filter(records, function (o) {
            if (modelIdentity == 'project') return _.includes(projects, o.id);
            return _.includes(projects, o.project) || (o.project && _.includes(projects, o.project.id));
          });
          cb(allowedRecords);
        });
        break;
      case 'service': // by owner
        allowedRecords = _.filter(records, function (o) {
          return o.owner == userId || (o.owner.id && o.owner.id == userId)
        });
        cb(allowedRecords);
        break;
      // case 'module': // by service.project.owner+contributors
      //   AuthService.getAuthorizedServices(userId, function (err, services) {
      //     allowedRecords = _.filter(records, function (o) {
      //       return _.includes(services, o.service) || _.includes(services, o.service.id);
      //     });
      //     cb(allowedRecords);
      //   });
      //   break;
      case 'dashboard': // by owner, public+project.owner/contributors
      case 'widget': // by dashboard.owner, public+dashboard.project.owner/contributors
        AuthService.getAuthorizedDashboards(userId, function (err, dashboards) {
          allowedRecords = _.filter(records, function (o) {
            if (modelIdentity == 'dashboard') return _.includes(dashboards, o.id);
            return _.includes(dashboards, o.dashboard) || _.includes(dashboards, o.dashboard.id);
          });
          cb(allowedRecords);
        });
        break;
      default:
        // return original set for other models
        cb(records);
        break;
    }
  },

  // retrieves an array of project ID's a user owns or contributes to
  getAuthorizedProjects: function (user, cb) {
    var allowedProjects = [];
    // Retrieve owned projects
    Project.find({owner: user}).populate('contributors')
      .exec(function (err, projects) {
        allowedProjects = allowedProjects.concat(projects);
        // Retrieve contributing projects
        Project.find().populate('contributors', {id: user})
          .exec(function (err, projects) {
            if (err) {
              cb(err, null);
            } else {
              var results = _.filter(projects, function (o) {
                // choose only projects with non-empty contributors
                return o.contributors.length > 0;
              });
              // combine results
              allowedProjects = allowedProjects.concat(results);
              // return array of project ids to callback function
              cb(null, _.map(allowedProjects, 'id'));
            }
          });
      });
  },

  // retrieves an array of dashboard ID's a user is permitted to view
  getAuthorizedDashboards: function (user, cb) {
    var allowedDashboards = [];

    AuthService.getAuthorizedProjects(user, function (err, projects) {
      Dashboard.find({project: projects}).exec(function (err, dashboards) {
        if (err) {
          cb(err, null);
        } else {
          allowedDashboards = _.filter(dashboards, function (o) {
            // permit owned dashboards
            // permit public dashboards for project owner/contributors
            return o.owner == user || (!o.private && _.includes(projects, o.project));
          });
          // return array of dashboard ids to callback function
          cb(null, _.map(allowedDashboards, 'id'));
        }
      });
    });
  },

  // retrieves an array of service ID's a user is permitted to view
  getAuthorizedServices: function (user, cb) {
    var allowedServices = [];

    AuthService.getAuthorizedProjects(user, function (err, projects) {
      Service.find({project: projects}).exec(function (err, services) {
        if (err) {
          cb(err, null);
        } else {
          allowedServices = _.filter(services, function (o) {
            // permit services for project owner/contributors
            return _.includes(projects, o.project);
          });
          // return array of dashboard ids to callback function
          cb(null, _.map(allowedServices, 'id'));
        }
      });
    });
  }

};
/**
 * Created by tiffa on 2016-05-28.
 */
