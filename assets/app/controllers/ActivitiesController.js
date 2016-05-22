sbapp.controller('ActivitiesController', [
  'activitiesService',
  '$sails',
  ActivitiesController
]);

function ActivitiesController(activitiesService, $sails) {
  var vm = this;

  vm.activities = [];
  vm.test = [];

  $sails.get('/event', function (resData, jwres) {
    console.log(resData);
  });

  $sails.on("event", function (message) {
    console.log(message);
  });



  activitiesService
    .loadAllItems()
    .then(function (activities) {
      vm.activities = [].concat(activities);
    });
}
