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
    '    <md-list-item layout="row" layout-align="start start" ng-repeat="activity in activities | orderBy: \'createdAt\':true">' +
    '    <i class="md-title mdi mdi-github-box" style="font-size: 2em"></i> ' +
    '    <div>' +
    '      {{activity.actor_name}} <span ng-bind-html="activity.event_action"></span> {{activity.target_name}}' +
    '      <span class="md-caption">{{activity.createdAt | date : "M/dd/yyyy, h:mma"}}</span>' +
    '    </div>' +
    '    </md-list-item>' +
    '  </md-list>' +
    '</section>'
  };
});
