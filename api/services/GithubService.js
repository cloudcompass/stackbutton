var https = require('https');
var github = require('octonode');


module.exports = {

  // used to populate friendly name before creation of a Service model instance
  getAccount: function (service, cb) {
    var client = github.client(service.token);
    var ghme = client.me();
    ghme.info(function (error, data) {
      if (error != null) {
        cb(null, error);
      } else {
        cb(data.login);
      }
    });
  },

  // automates github webhook creation on creation of Module model instance
  createWebhook: function (module, cb) {
    if (!_.has(module, 'config.full_name')) return cb("Repository name not provided");

    var serviceId = _.has(module.service, 'id') ? module.service.id : module.service;

    Service.findOne({id: serviceId}).exec(function (err, service) {
      if (err) return cb(err);
      if (service == undefined) return cb('Invalid parent service');

      var client = github.client(service.token);
      var ghrepo = client.repo(module.config.full_name);
      var evts = [];
      switch (module.type) {
        case 'repo':
          evts = ["push", "create", "delete", "member"];
          break;
        case 'issues':
          evts = ['issues'];
          break;
      }

      sails.log.info('adding webhook', module.project, service.token, module.config.full_name, evts);
      // sails.log.info(ghrepo.collaborators(cb));
      ghrepo.hook({
        name: "web",
        active: true,
        events: evts,
        config: {
          url: sails.config.url.hooks + "/payload/" + module.project,
          content_type: "json"
        }
      }, cb);
    });

  },

  // constructs Event model instance for PayloadController
  createEvent: function (req, cb) {
    // sails.log.info('creating event', req.body);
    var event = {};
    event.platform = 'github';
    event.event_type = req.headers['x-github-event'];
    event.actor_name = req.body.sender.login;
    event.target_name = req.body.repository.name;
    event.target_url = req.body.repository.url;
    event.project = req.param('projectId');

    switch (event.event_type) {
      case 'push':
        event.source_url = req.body.compare;
        event.event_action = 'pushed ' + '<a href="' + event.source_url + '" target="_blank">' + req.body.commits.length + ' ' + 'commits' + '</a> to';
        break;
      case 'issues':
        event.source_url = req.body.issue.html_url;
        event.event_action = req.body.action + ' an <a href="' + event.source_url + '" target="_blank">issue</a> on';
        break;
      case 'ping':
        event.event_action = 'pinged from';
        break;
    }
    return event;
  },

  // exposed to client in ServiceController
  getRepos: function (serviceID, cb) {
    Service.findOne({id: serviceID})
      .exec(function (err, res) {
        if (res) {
          var client = github.client(res.token);
          var ghme = client.me();
          ghme.repos(cb);
        } else {
          sails.log.error('could not retrieve repos', err);
        }
      });
  },

  // exposed to client in VCSController
  getCommits: function (widgetId, cb) {
    Widget.findOne({id: widgetId}).populate('module')
      .exec(function (err, widget) {
        if (widget) {
          // sails.log.debug('finding first module:', widget.modules[0].id);
          Module.findOne({id: widget.module.id}).populate('service')
            .exec(function (err, module) {
              if (module) {
                var client = github.client(module.service.token);
                var ghrepo = client.repo(module.config.full_name);
                ghrepo.commits(cb);
              } else {
                sails.log.error('could not retrieve module', err);
              }
            });
        } else {
          sails.log.error('could not retrieve widget', err);
        }
      });
  },
  // exposed to client in VCSController
  getIssues: function (widgetId, cb) {
    sails.log.debug('finding widget:', widgetId);
    Widget.findOne({id: widgetId}).populate('module')
      .exec(function (err, widget) {
        if (widget) {
          // sails.log.debug('finding first module:', widget.modules);
          Module.findOne({id: widget.module.id}).populate('service')
            .exec(function (err, module) {
              if (module) {
                var client = github.client(module.service.token);
                var ghrepo = client.repo(module.config.full_name);
                ghrepo.issues(cb);
              } else {
                sails.log.error('could not retrieve module', err);
              }
            });
        } else {
          sails.log.error('could not retrieve widget', err);
        }
      });
  }

};
/**
 * Created by tiffa on 2016-05-06.
 */
