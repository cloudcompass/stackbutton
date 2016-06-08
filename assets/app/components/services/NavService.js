sbapp.service('navService', ['$q', navService]);

function navService($q) {

  var menuItems = {};

  
  menuItems = [
    {
      name: 'Dashboards',
      icon: 'work',
      sref: '.',
      children: []
    },
    {
      name: 'Modules',
      icon: 'work',
      sref: 'home.projects',
      children: []
    },
    {
      name: 'Services',
      icon: 'work',
      sref: 'home.servicesconfig',
      children: []
    },
    {
      name: 'Team',
      icon: 'work',
      sref: 'home.team',
      children: []
    }

  ];

  return {
    loadAllItems: function () {
      return $q.when(menuItems);
    }
  };
}
