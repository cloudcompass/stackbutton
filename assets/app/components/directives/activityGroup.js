sbapp.directive('activityGroup', function () {
  return {
    restrict: 'E',
    scope: {
      title: '@',
      theme: '@',
      activities: '='
    },
    template: '' +
    '<section>' +
    '  <md-subheader ng-class="theme">{{title}}</md-subheader>' +
    '  <md-list>' +
    '    <md-list-item class="md-3-line" ng-repeat="activity in activities | orderBy: \'createdAt\':true">' +
    '    <i class="mdi mdi-bell"></i> ' +
    '    <div class="md-list-item-text">' +
    '      {{activity.actor_name}} {{activity.event_action}} to {{activity.target_name}}' +
    '      <p class="md-caption">{{activity.createdAt | date : "M/dd/yyyy, h:mma"}}</p>' +
    '    </div>' +
    '    </md-list-item>' +
    '  </md-list>' +
    '</section>',
    link: function (scope, element, attrs) {
    }
  };
});
