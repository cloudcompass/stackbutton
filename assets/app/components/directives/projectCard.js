sbapp.directive('projectCard', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {title: '@', options: '@'},
    template: '' +
    '<section layout-margin class="md-whiteframe-z1 panel-widget fixed-height-widget fixed-width">' +
    '  <md-toolbar md-theme="custom" class="md-hue-1 panel-widget-toolbar">' +
    '    <div class="md-toolbar-tools">' +
    '      <h4 class="panel-widget-tittle">{{title}}</h4>' +
    '      <md-button ng-click="hideOptions=!hideOptions" class="md-icon-button" aria-label="Show options">' +
    '        <i class="material-icons">tab_unselected</i>' +
    '      </md-button>' +
    '    </div>' +
    '  </md-toolbar>' +
    '  <div ng-show="!hideOptions">' +
    '   stuff here' +
    '  </div>' +
    '  <div ng-show="hideOptions">' +
    '   <md-button class="md-raised" ui-sref="home.plugin" ng-click="$mdOpenMenu($event)">Edit Project</md-button>' +
    '   <md-button class="md-raised md-warn" ng-click="vm.showDialog()">Delete Project</md-button>' +
    '  </div>' +
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
