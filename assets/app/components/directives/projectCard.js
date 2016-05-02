sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    //replace: true,
    //transclude: true,
    scope: {project: '=', prompt: '&'},
    template: '' +
    '<section layout-margin class="md-whiteframe-z1 panel-widget fixed-height-widget fixed-width">' +
    '  <div class="md-title" layout="row" layout-align="space-between start">' +
    '    <md-button ng-show="!showBack" ui-sref="home.dashboard" layout="row" layout-align="start">' +
    '      <span class="md-accent panel-widget-tittle">{{project.name}}</span>' +
    '    </md-button>' +
    '    <span class="panel-widget-tittle" layout-padding ng-show="showBack"></span>' +
    '    <md-button ng-click="showBack=!showBack" class="md-icon-button" aria-label="Show options">' +
    '      <i class="material-icons" ng-show="!showBack">flip_to_back</i>' +
    '      <i class="material-icons" ng-show="showBack">flip_to_front</i>' +
    '    </md-button>' +
    '  </div>' +
    '  <md-divider ng-show="!showBack"/>' +
    '  <div ng-show="!showBack">' +
    '    {{project.description}}' +
    '  </div>' +
    '  <div ng-show="showBack" layout="column" layout-align="start center">' +
    '    <md-button class="md-raised" ui-sref="home.plugin">Edit Project</md-button>' +
    '    <md-button class="md-raised md-warn" ng-click="prompt(project)">Delete Project</md-button>' +
    '  </div>' +
    '  <md-divider ng-show="!showBack"/>' +
    '</section>'
  };
});
