/**
 * Service.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // name: {
    //   type: "string",
    //   required: true,
    //   minLength: 2
    // },
    platform: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    modules: {
      collection: 'module',
      via: 'service'
    },
    project: {
      model: "project"
    }
  },

  beforeCreate: [
    function checkToken(service, next) {
      sails.log.info('Service.beforeCreate.checkToken', service);
      switch (service.platform) {
        case 'github':
          GithubService.validateToken(service.token, next);
          break;
      }
    }
  ]


};

