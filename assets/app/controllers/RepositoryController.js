sbapp.controller('RepositoryController', [
  'repositoryService',
  RepositoryController
]);

function RepositoryController(repositoryService) {
  var vm = this;
  vm.commits = [];
  repositoryService
    .loadAllItems()
    .then(function (commits) {
      vm.commits = [].concat(commits);
    });
}
