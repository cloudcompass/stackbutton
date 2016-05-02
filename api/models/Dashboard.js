/**
 * Dashboard.js
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
    project: {
      model: 'project',
      required: true
    },
    widgets: {
      collection: 'widget',
      via: 'dashboard'
    },
    private: {
      type: "boolean"
    }
  }
};

