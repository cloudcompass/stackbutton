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
    '    <md-list-item class="md-3-line" ng-repeat="activity in activities">' +
    '    <img class="md-avatar" ng-src="/images/einstein.jpg">' +
    '    <div class="md-list-item-text">' +
    '      {{activity.text}}' +
    '      <p class="md-caption">{{activity.date}}</p>' +
    '    </div>' +
    '    </md-list-item>' +
    '  </md-list>' +
    '</section>',
    link: function (scope, element, attrs) {
    }
  };
});
