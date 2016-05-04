sbapp.service('navService', ['$q', navService]);

function navService($q) {

  var menuItems = {};
  menuItems.static = [
    {
      name: 'Projects',
      icon: 'work',
      sref: 'home.projects'

    },
    {
      name: 'Account',
      icon: 'people',
      sref: 'home.profile'
    }
  ];

  menuItems.server = [
    {
      name: 'Repositories',
      icon: 'device_hub',
      sref: 'home.repos',
      children: [
        {name: 'GitHub', sref: '.repo.github'},
        {name: 'BitBucket', sref: '.repo.bitbucket'}
      ]
    },
    {
      name: 'Ticketing',
      icon: 'poll',
      sref: '.',
      children: [
        {name: 'Taiga', sref: '.repo.taiga'},
        {name: 'Jira', sref: '.repo.jira'}
      ]
    },
    {
      name: 'Hosting',
      icon: 'cloud_queue',
      sref: '.',
      children: [
        {name: 'AWS', sref: '.repo.aws'},
        {name: 'Docker', sref: '.repo.docker'}
      ]
    },
    {
      name: 'Monitoring',
      icon: 'multiline_chart',
      sref: '.',
      children: [
        {name: 'Storage', sref: '.monitoring.storage'},
        {name: 'Memory', sref: '.monitoring.memory'},
        {name: 'Network', sref: '.monitoring.network'}
      ]
    }
  ];

  return {
    loadAllItems: function () {
      return $q.when(menuItems);
    }
  };
}
