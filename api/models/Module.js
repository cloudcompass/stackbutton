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
      model: 'service'
    }
  },

  afterCreate: function (module, next) {
    sails.log.info('Project.afterCreate.createWebhook', module);
    Module.findOne({id: module.id}).populate('service')
      .exec(function (err, res) {
        if (res.service.platform == 'github') {
          GithubService.createWebhook(res, next);
        }
      });
  }

};

