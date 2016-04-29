sbapp.directive('panelWidget', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {title: '@', template: '@', options: '@'},
    template: '' +
    '<section layout-margin class="md-whiteframe-z1 panel-widget" style="min-width: 350px; min-height: 150px">' +
    '      <h3 class="panel-widget-tittle">{{title}}</h3>' +
    '  <div ng-include="template"/>' +
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
