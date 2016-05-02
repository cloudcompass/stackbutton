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
    contributers: {
      collection: 'user'
    },
    dashboards: {
      collection: "dashboard",
      via: 'project'
    },
    services: {
      collection: "service",
      via: 'project'
    }

  }
};

