sbapp.service('RepositoryService', ['$q', '$resource', RepositoryService]);

function RepositoryService($q, $resource) {
  var service = {};

  service.loadAllItems = loadAllItems;
  service.getCommits = $resource('/VCS/getCommits');

  return service;

  function loadAllItems() {
    return $q.when(service.commits);
  }


}
