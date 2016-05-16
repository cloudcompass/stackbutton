sbapp.controller('EditProject', [
  '$scope',
  EditProject
]);

function EditProject($scope) {
  var projectName = $scope.currentProject.name;
  var projectDesc = $scope.currentProject.description;

  console.log(projectName + ":" + projectDesc);
}
