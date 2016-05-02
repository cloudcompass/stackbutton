sbapp.service('repositoryService', ['$q', repositoryService]);

function repositoryService($q) {
  var commits = [
    {
      description: 'Linked Controller to View',
      author: 'Paul Cridge',
      date: '2016-04-24',
      files: '1'
    }
  ];
  return {
    loadAllItems: function () {
      return $q.when(commits);
    }
  };
}
