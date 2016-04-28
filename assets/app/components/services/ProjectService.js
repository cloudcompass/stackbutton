sbapp.factory('ProjectService', [
  '$cookies',
  '$http',
  '$state',
  '$q',
  ProjectService]
);

function ProjectService($cookies, $http, $state, $q) {
  var projService = {};
  projService.addProject = addProject;

  addProject('Test', 'this is a test', 'now', 'then', '12345');

  function addProject(name, description, startDate, endDate, ownerid) {
    var data = {
      name: name,
      description: description,
      ownerId: ownerid,
      contributers: [],
      teams: [],
      plugins: [],
      startDate: startDate,
      endDate: endDate
    };
    return $http.post('/project', data, null).then(addSuccess, addError);
  }

  function addSuccess(response) {
    console.log("Success ", response.status, response);
    return response || $q.when(response);
  }

  function addError(response) {
    console.log("Error ", response.status, response);
    return $q.reject(response);
  }

  return projService;
}

