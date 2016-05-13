sbapp.service('RepositoryService', ['$q', '$resource', RepositoryService]);

function RepositoryService($q, $resource) {
  var service = {};

  service.loadAllItems = loadAllItems;
  service.getCommits = $resource('/service/getCommits');

  service.commits = [
    {
      description: 'Linked Controller to View',
      author: 'Paul Cridge',
      date: '2016-04-24',
      files: '1'
    }
  ];

  return service;

  function loadAllItems() {
    return $q.when(service.commits);
  }


}
