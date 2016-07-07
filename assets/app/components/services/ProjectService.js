/**

Copyright 2016, Cloud Compass, Inc.

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
sbapp.factory('ProjectService', [
  '$resource',
  ProjectService]
);

function ProjectService($resource) {

  var projService = {};

  projService.user = $resource('/user/:userid', {userid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.project = $resource('/project/:projid', {projid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
  projService.team = $resource('/project/:projid/contributors/:userid', {projid: '@project', userid: '@user'});

  projService.dashboard = $resource('/dashboard/:dashboardid', {dashboardid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.service = $resource('/service/:serviceid', {serviceid: '@id'}, {
    update: {
      method: 'PUT'
    },
    getAccount: {
      method: 'POST',
      url: '/service/getAccount'
    }
  });

  projService.widget = $resource('/widget/:widgetid', {widgetid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.module = $resource('/module/:moduleid', {moduleid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  /*
   Usage:

   {} = ProjectService.get({projid: <5555>});
   [] = ProjectService.query({ownerId: <99>}); -- can use different/additional attributes
   ProjectService.delete({projid: <5555>);

   */

  return projService;
}

