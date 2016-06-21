sbapp.controller('ProfileController', [
  ProfileController
]);

function ProfileController() {
  var vm = this;

  vm.user = {
    title: 'Admin',
    email: 'contact@flatlogic.com',
    firstName: '',
    lastName: '',
    biography: 'need to add name + bio fields to user store & link',
  };
}
