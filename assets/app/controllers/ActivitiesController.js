sbapp.controller('ActivitiesController', [
  'activitiesService',
  ActivitiesController
]);

function ActivitiesController(activitiesService) {
  var vm = this;

  vm.activities = [];

  activitiesService
    .loadAllItems()
    .then(function (activities) {
      vm.activities = [].concat(activities);
    });
}
