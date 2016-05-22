sbapp.service('activitiesService', ['$q', '$sails', activitiesService]);

function activitiesService($q, $sails) {
  var service = {};

  /* CALLABLE MEMBERS */
  service.loadAllItems = loadAllItems;
  service.eventListener = eventListener;

  return service;


  /* FUNCTIONS */

  function loadAllItems() {
    return $sails.get('/event');
  }

  function eventListener() {
    return $q.when($sails.on("event"));
  }
}
