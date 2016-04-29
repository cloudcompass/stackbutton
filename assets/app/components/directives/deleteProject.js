sbapp.directive('deleteProject', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {title: '@', template: '@', options: '@'},
    template:
    '<md-card style="max-width: 350px;">'+
    '<div>'+
    '<p class="md-headline">Would you like to permanently DELETE {{project.name}}?</p>'+
    '</div>'+
    '<div>'+
    '<p class="md-headline">Please type the name of the project to confirm deletion.</p>'+
    '<md-input-container>'+
    '<label>Project Name</label>'+
    '<input type="text" ng-model="confirmBox" required>'+
    '</md-input-container>'+
    '</div>'+
    '<md-button class="md-primary" ng-show="confirmBox">DELETE PROJECT</md-button>'+
    '<md-button class="md-warn" ui-sref="home.projects">Cancel</md-button>'+
    '</md-card>',

    compile: function (element, attrs, linker) {
      return function (scope, element) {
        linker(scope, function (clone) {
          element.append(clone);
        });
      };
    }
  };
});
