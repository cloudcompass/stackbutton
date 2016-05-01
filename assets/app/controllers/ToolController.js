sbapp.controller('ToolController', [
  ToolController
]);

function ToolController() {
  var vm = this;
  vm.back = back;
  vm.next = next;
  vm.gitSelect = gitSelect;
  vm.bitSelect = bitSelect;

  //Used for page back/next and div displays on addATool.html
  vm.count = 0;

  //Using a numeric system to hide and show pages of this setup
  // 0 = Main page
  // 1 = Github setup
  // 2 = other. - Bitbucket setup is not implemented

  function back(){
    this.count = 0;
  }

  function next(){
    this.count -= 1;
  }

  function gitSelect(){
    console.log("github selected");
    this.count = 1;
  }

  function bitSelect(){
    console.log("Bitbucket selected");
    this.count = 2;
  }
}
