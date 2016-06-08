/**
 * Service.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    platform: {
      type: 'string',
      required: true
    },
    token: {
      // TODO lock down permissions on this attr to never serve to outside requests
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

    // TODO encrypt the token
    function encrypt(service, next) {
      // encrypt service.token
      // service.token = new encrypted value
      next();
    },

    // set name property to a friendly name
    function getName(service, next) {
      switch (service.platform) {
        case 'github':
          GithubService.getAccount(service, function (name, error) {
            if (error != null) {
              sails.log.warn('could not retrieve name');
              next(new Error(error.message));
            } else {
              sails.log.info('found github account', name);
              service.name = name;
              next();
            }
          });
          break;
        default:
          service.name = 'unknown platform';
          break;

        ///
      }
    }
  ]

};

