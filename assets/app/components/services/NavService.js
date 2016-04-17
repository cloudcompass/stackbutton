sbapp.service('navService', ['$q', navService]);

function navService($q) {
  var menuItems = [
    {
      name: 'Projects',
      icon: 'work',
      sref: '.dashboard'
    },
    {
      name: 'Team',
      icon: 'people',
      sref: '.profile'
    },
    {
      name: 'Repositories',
      icon: 'device_hub',
      sref: '.repositories'
    },
    {
      name: 'Ticketing',
      icon: 'poll',
      sref: '.ticking'
    },
    {
      name: 'Hosting',
      icon: 'cloud_queue',
      sref: '.hosting'
    },
    {
      name: 'Monitoring',
      icon: 'multiline_chart',
      sref: '.hosting'
    }
  ];

  return {
    loadAllItems: function () {
      return $q.when(menuItems);
    }
  };
}
