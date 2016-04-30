sbapp.controller('ToolController', [
  ToolController
]);

function ToolController() {
  var vm = this;
  vm.incCount = incCount;
  vm.decCount = decCount;

  //Used for page back/next and div displays on addATool.html
  vm.count = 0;

  function incCount(){
    this.count += 1;
  }

  function decCount(){
    this.count -= 1;
  }

}
