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
var https = require('https');
var github = require('octonode');
var url = require('url');
var querystring = require('querystring');

function parse_link_header(header) {
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
  }

  // Split parts by comma
  var parts = header.split(',');
  var links = {};
  // Parse each part into a named link
  for (var i = 0; i < parts.length; i++) {
    var section = parts[i].split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  }
  return links;
}

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

      var webhookURL = (process.env.SB_WEBHOOK_BASE_URL || sails.config.url.hooks) + "/payload/" + module.project;

      sails.log.info('adding webhook', module.config.full_name, webhookURL, evts);

      ghrepo.hook({
        name: "web",
        active: true,
        events: evts,
        config: {
          url: webhookURL,
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
    var issues = [];
    var client = github.client();

    var pager = function (err, data, headers) {
      // TODO: If the github access token is revoked, this crashes due to a undefined header (I believe)
      // Info is captured through err as "invalid credentials", handle this appropriately
      if (err) {
        sails.log.debug(err);
      }

      if (data) {
        issues = issues.concat(data);
      }

      if (headers.link) {
        var linkHeaders = parse_link_header(headers.link);
        if (linkHeaders && linkHeaders.next) {
          // Parse the next page from the link header and retrieve the next repo page
          // Format is like: https://api.github.com/user/repos?page=50&per_page=100
          var nextPageNumber = querystring.parse(url.parse(linkHeaders.next).query).page;
          getRepoPage(client, nextPageNumber, pager)
        }
      }

      // Return the repos using the provided callback
      cb(err, issues, headers);
    };

    function getRepoPage(client, page, pager) {
      sails.log.debug("Retrieving repo page ", page);
      var ghme = client.me();
      ghme.repos({
        page: page,
        per_page: 100
      }, pager);
    }

    Service.findOne({id: serviceID})
      .exec(function (err, service) {
        if (service) {
          client = github.client(service.token);
          getRepoPage(client, 1, pager);
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
          sails.log.debug('finding first module:', widget.modules);
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
