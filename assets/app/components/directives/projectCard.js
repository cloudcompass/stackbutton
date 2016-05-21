sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    scope: {project: '=', select: '&'},
    template: '' +
    '<section class="md-whiteframe-z1 panel-widget fixed-height-widget fixed-width">' +
    '  <md-toolbar class="md-accent" layout="row" layout-align="space-between center">' +
    '    <md-button class="toolbar-button" ng-click="select(project)" ui-sref="home.dashboard" layout="row" layout-align="start">' +
    '      <span class="dash-widget-topbar-text capitalize">{{project.name}}</span>' +
    '    </md-button>' +
    '    <md-button class="toolbar-button" md-theme="dark" aria-label="Edit project" ui-sref="home.editproject" ng-click="select(project)">' +
    '      <i class="dash-widget-topbar-text material-icons">mode_edit</i>' +
    '    </md-button>' +
    '  </md-toolbar>' +
    '  <div layout-padding>' +
    '    {{project.description}}' +
    '  </div>' +
    '</section>'
  };
});
