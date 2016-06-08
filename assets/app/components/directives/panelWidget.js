sbapp.directive('panelWidget', function () {
  return {
    restrict: 'E',
    scope: {widget: '='},
    template: '' +
    '<md-card class="md-whiteframe-z1 panel-widget" layout="column">' +
    '    <div class="color-inherit dash-widget-topbar" layout-padding>' +
    '      <span class="dash-widget-topbar-text capitalize">{{widget.template}}</span>' +
    '    </div>' +
    '    <div flex="grow" layout ng-include="vm.templateUrl"/>' +
    '</md-card>',
    controller: function ($scope) {
      var vm = this;
      // TODO extend this to allow for other directories
      vm.templateUrl = 'app/views/widget/repo/' + $scope.widget.template + '.html';
      //console.log('file:', vm.templateUrl);
    },
    controllerAs: 'vm'
  }
});
