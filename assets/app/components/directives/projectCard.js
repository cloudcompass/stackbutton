sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {title: '@',description: '@', options: '@'},
    template: '' +
    '<section layout-margin class="md-whiteframe-z1 panel-widget fixed-height-widget fixed-width">' +

    '    <div class="md-title" layout="row" layout-align="space-between start">' +
    '      <md-button ng-show="!hideOptions" ui-sref="home.dashboard">' +
    '       <span style="color: #2b81af; font-size: large" class="panel-widget-tittle">{{title}}</span>' +
    '      </md-button>' +
    '      <span class="panel-widget-tittle" layout-padding ng-show="hideOptions">Options:</span>' +
    '      <md-button ng-click="hideOptions=!hideOptions" class="md-icon-button" aria-label="Show options">' +
    '        <i class="material-icons" ng-show="!hideOptions">flip_to_back</i>' +
    '        <i class="material-icons" ng-show="hideOptions">flip_to_front</i>' +
    '      </md-button>' +
    '    </div>' +
    ' <md-divider ng-show="!hideOptions"></md-divider>' +
    '  <div ng-show="!hideOptions">' +
    '   {{description}}' +
    '  </div>' +
    '  <div ng-show="hideOptions" layout="column" layout-align="start center">' +
    '   <md-button class="md-raised" ui-sref="home.plugin" ng-click="$mdOpenMenu($event)">Edit Project</md-button>' +
    '   <md-button class="md-raised md-warn" ng-click="showDeleteDialog()">Delete Project</md-button>' +
    '  </div>' +
    ' <md-divider ng-show="!hideOptions"></md-divider>' +
    '</section>',
    compile: function (element, attrs, linker) {
      return function (scope, element) {
        linker(scope, function (clone) {
          element.append(clone);
        });
      };
    }
  };
});
