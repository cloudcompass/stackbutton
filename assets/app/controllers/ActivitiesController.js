sbapp.controller('ActivitiesController', [
  'activitiesService',
  '$sails',
  ActivitiesController
]);

function ActivitiesController(activitiesService, $sails) {
  var vm = this;

  vm.activities = [];
  vm.test = [];

  // retrieve events
  getEvents();


  // listen for new events
  $sails.on("event", function (message) {
    if (message.verb == 'created') {
      console.log(message.data);
      getEvents();
      
    }
  });

  function getEvents() {
    activitiesService
      .loadAllItems().then(
      function (resp) {
        vm.activities = [].concat(resp.data);
        console.log('activities', vm.activities);
      });
  }
}
