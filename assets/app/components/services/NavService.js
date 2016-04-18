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
      sref: '.repositories',
      children: [ 'GitHub', 'BitBucket']
    },
    {
      name: 'Ticketing',
      icon: 'poll',
      sref: '.ticking',
      children: ['Taiga', 'Jira']
    },
    {
      name: 'Hosting',
      icon: 'cloud_queue',
      sref: '.hosting',
      children: ['Server#01', 'Server#02', 'Server#03']
    },
    {
      name: 'Monitoring',
      icon: 'multiline_chart',
      sref: '.hosting',
      children: ['Data Traffic', 'RAM Usage', 'Network']
    }
  ];

  return {
    loadAllItems: function () {
      return $q.when(menuItems);
    }
  };
}
