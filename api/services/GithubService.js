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
    sails.log.info('adding webhook', module.service.project, module.id, module.service.token);
    var client = github.client(module.service.token);
    var ghrepo = client.repo(module.config.full_name);
    ghrepo.hook({
      name: "web",
      active: true,
      events: ["push", "create", "delete", "member"],
      config: {
        url: sails.config.url.hooks + "/payload/" + module.service.project + "/" + module.id,
        content_type: "json"
      }
    }, cb);
  },

  // constructs Event model instance for PayloadController
  createEvent: function (req, cb) {
    sails.log.info('creating event', req.body);

    var event = {};
    event.platform = 'github';
    event.event_type = req.headers['x-github-event'];
    switch (event.event_type) {
      case 'push':
        event.event_action = 'pushed';
        event.source_url = req.body.compare;
        break;
      case 'issues':
        event.event_action = req.body.action;
        event.source_url = req.body.issue.html_url;
        break;
      case 'ping':
        event.event_action = 'pinged';
        break;
    }
    event.actor_name = req.body.sender.login;
    event.target_name = req.body.repository.name;
    event.target_url = req.body.repository.url;
    event.project = req.param('projectId');
    event.module = req.param('moduleId');
    //event.created_at = (new Date()).toJSON();
    return event;
  },

  // exposed to client in ServiceController
  getRepos: function (serviceID, cb) {
    sails.log.debug('finding service:', serviceID);
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
    sails.log.debug('finding widget:', widgetId);
    Widget.findOne({id: widgetId}).populate('modules')
      .exec(function (err, widget) {
        if (widget) {
          sails.log.debug('finding first module:', widget.modules[0].id);
          Module.findOne({id: widget.modules[0].id}).populate('service')
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
    Widget.findOne({id: widgetId}).populate('modules')
      .exec(function (err, widget) {
        if (widget) {
          sails.log.debug('finding first module:', widget.modules);
          Module.findOne({id: widget.modules[0].id}).populate('service')
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
