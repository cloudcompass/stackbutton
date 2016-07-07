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
sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    scope: {project: '=', userid: '='},
    template: '' +
    '<md-card>' +
    '  <md-toolbar class="md-accent" layout="row" layout-align="start center">' +
    '    <md-button ng-disabled="userid==null || project.owner!=userid" class="toolbar-button" ui-sref="home.dashboard({project:project.id,dashboard:project.dashboards[0].id})">' +
    '      <span class="dash-widget-topbar-text capitalize">{{project.name}}</span>' +
    '    </md-button>' +
    '    <span flex></span>' +
    '    <md-button ng-disabled="!userid || project.owner!=userid" class="toolbar-button" aria-label="Edit project" ui-sref="home.editproject({project:project.id})">' +
    '      <i ng-class="{\'dash-widget-topbar-text\': project.owner==userid , \'dash-widget-topbar-text-disabled\': project.owner!=userid}"' +
    '          class="material-icons">mode_edit</i>' +
    '      <md-tooltip ng-if="userid && project.owner!=userid">You are not the owner of this project</md-tooltip>' +
    '    </md-button>' +
    '  </md-toolbar>' +
    '  <p layout-padding>' +
    '    {{project.description}}' +
    '  </p>' +
    '</md-card>'
  };
});
