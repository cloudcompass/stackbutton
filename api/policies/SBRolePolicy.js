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
 * RolePolicy
 * @depends PermissionPolicy
 * @depends OwnerPolicy
 * @depends ModelPolicy
 *
 * Verify that User is satisfactorily related to the Object's owner.
 * By this point, we know we have some permissions related to the action and object
 * If they are 'owner' permissions, verify that the objects that are being accessed are owned by the current user
 */
//Import not supported in current version of javascript
//import _ from 'lodash'


/* STACKBUTTON: This is a patch intended to address issue #227
 which causes a crash when a permission with relation: owner is set
 */

module.exports = function(req, res, next) {
  var permissions = req.permissions;
  var relations = _.groupBy(permissions, 'relation');
  var action = PermissionService.getMethod(req.method);

  // continue if there exist role Permissions which grant the asserted privilege
  if (!_.isEmpty(relations.role)) {
    return next();
  }
  if (req.options.unknownModel) {
    return next();
  }

  /*
   * This block allows us to filter reads by the owner attribute, rather than failing an entire request
   * if some of the results are not owned by the user.
   * We don't want to take this same course of action for an update or delete action, we would prefer to fail the entire request.
   * There is no notion of 'create' for an owner permission, so it is not relevant here.
   */
  if (!_.contains(['update', 'delete'], action) && req.options.modelDefinition.attributes.owner) {
    // Some parsing must happen on the query down the line,
    // as req.query has no impact on the results from PermissionService.findTargetObjects.
    // I had to look at the actionUtil parseCriteria method to see where to augment the criteria

    //***PATCHED HERE***//
    req.params.where = req.params.all().where || {};
    req.params.where.owner = req.user.id;
    //////////////////////
    req.query.owner = req.user.id;
    _.isObject(req.body) && (req.body.owner = req.user.id);
  }

  PermissionService.findTargetObjects(req)
    .then(function(objects) {
        // PermissionService.isAllowedToPerformAction checks if the user has 'user' based permissions (vs role or owner based permissions)
      return PermissionService.isAllowedToPerformAction(objects, req.user, action, ModelService.getTargetModelName(req), req.body)
        .then(function(hasUserPermissions) {
          if (hasUserPermissions) {
            return next();
          }
          if (PermissionService.hasForeignObjects(objects, req.user)) {
            return res.send(403, {
              error: 'Cannot perform action [' + action + '] on foreign object'
            });
          }
          next();
        });

    })
    .catch(next);
};
