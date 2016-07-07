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
      model: "project",
      required: true
    }

  }
};

