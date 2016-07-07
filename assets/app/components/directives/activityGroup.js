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
sbapp.directive('activityGroup', function () {
  return {
    restrict: 'E',
    scope: {
      title: '@',
      theme: '@',
      activities: '='
    },
    template: '' +
    '<section>' +
    '  <md-subheader ng-class="theme">{{title}}</md-subheader>' +
    '  <md-list>' +
    '    <md-list-item layout="row" layout-align="start start" ng-repeat="activity in activities | orderBy: \'createdAt\':true">' +
    '    <i class="md-title mdi mdi-github-box" style="font-size: 2em"></i> ' +
    '    <div>' +
    '      {{activity.actor_name}} <span ng-bind-html="activity.event_action"></span> {{activity.target_name}}' +
    '      <span class="md-caption">{{activity.createdAt | date : "M/dd/yyyy, h:mma"}}</span>' +
    '    </div>' +
    '    </md-list-item>' +
    '  </md-list>' +
    '</section>'
  };
});
