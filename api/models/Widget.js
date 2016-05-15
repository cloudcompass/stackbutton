/**
 * Widget.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    template: {
      type: "string",
      required: true,
      minLength: 2
    },
    dashboard: {
      model: 'dashboard'
    },
    modules: {
      collection: 'module',
      via: 'widgets'
    }
  }
};

