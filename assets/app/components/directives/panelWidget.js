sbapp.directive('panelWidget', function () {
  return {
    restrict: 'E',
    scope: {widget: '='},
    template: '' +
    '<md-card layout-margin class="md-whiteframe-z1 panel-widget" style="min-width: 300px; min-height: 150px">' +
    '    <div class="panel-widget-tittle md-title" layout="row" layout-align="start center">' +
    '      {{widget.template}}' +
    '    </div>' +
    '    <md-divider></md-divider>' +
    '    <div ng-include="vm.templateUrl"/>' +
    '</md-card>',
    controller: function ($scope) {
      var vm = this;
      // TODO extend this to allow for other directories
      vm.templateUrl = 'app/views/widget/repo/' + $scope.widget.template + '.html';
    },
    controllerAs: 'vm'
  }
});
