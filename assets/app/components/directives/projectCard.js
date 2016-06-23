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
