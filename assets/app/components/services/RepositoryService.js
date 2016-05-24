sbapp.service('RepositoryService', ['$q', '$resource', RepositoryService]);

function RepositoryService($q, $resource) {
  var service = {};

  service.getCommits = $resource('/VCS/getCommits');
  service.getIssues = $resource('/Issues/getIssues');

  return service;


}
