/**
 * Module.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    type: {
      type: "string",
      required: true,
      minLength: 2
    },
    config: {
      type: "json"
    },
    widgets: {
      collection: 'widget',
      via: 'modules'
    },
    service: {
      model: 'service',
      required: true
    },
    project: {
      model: "project",
      required: true
    }
  },

  beforeCreate: function (module, next) {
    sails.log.info('Project.beforeCreate.createWebhook', module);
    var serviceId = _.has(module.service, 'id') ? module.service.id : module.service;
    Service.findOne({id: serviceId})
      .exec(function (err, service) {
        if (service.platform == 'github') {
          GithubService.createWebhook(module, next);
        }
      });
  }

};

