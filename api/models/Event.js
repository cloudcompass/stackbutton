/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    platform: {
      type: "string"
    },
    event_type: {
      type: "string",
      required: true
    },
    event_action: {
      type: "string"
    },
    actor_name: {
      type: "string"
    },
    created_at: {
      type: "string"
    },
    source_url: {
      type: "string"
    },
    target_name: {
      type: "string"
    },
    target_url: {
      type: "string"
    },
    project: {
      model: "project"
    }

  }
};

