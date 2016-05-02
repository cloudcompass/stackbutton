sbapp.service('RepositoryService', ['$q', '$resource', RepositoryService]);

function RepositoryService($q, $resource) {
  var service = {}

  var commits = [
    {
      description: 'Linked Controller to View',
      author: 'Paul Cridge',
      date: '2016-04-24',
      files: '1'
    }
  ];
  service.loadAllItems = function () {
    return $q.when(commits);
  };

  service.github = $resource('https://api.github.com/user', {});

  return service;
}
