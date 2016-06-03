sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    scope: {project: '=', select: '&'},
    template: '' +
    '<section class="md-whiteframe-z1 panel-widget">' +
    '  <md-toolbar class="md-accent" layout="row" layout-align="space-between center">' +
    '    <md-button class="toolbar-button" ui-sref="home.dashboard({dashboardId:project.dashboards[0].id})">' +
    '      <span class="dash-widget-topbar-text capitalize">{{project.name}}</span>' +
    '    </md-button>' +
    '    <md-button class="toolbar-button" aria-label="Edit project" ui-sref="home.editproject" ng-click="select(project)">' +
    '      <i class="dash-widget-topbar-text material-icons">mode_edit</i>' +
    '    </md-button>' +
    '  </md-toolbar>' +
    '  <p layout-padding>' +
    '    {{project.description}}' +
    '  </p>' +
    '</section>'
  };
});
