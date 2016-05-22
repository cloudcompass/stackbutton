sbapp.service('activitiesService', ['$q', '$sails', activitiesService]);

function activitiesService($q) {
  var activities = [
    {
      userPhoto: '/assets/images/user.svg',
      subject: 'Electromagnetic radiation',
      userName: 'Wilhelm Conrad Röntgen',
      date: new Date().toLocaleString(),
      text: 'Wilhelm made a commit to sheaphillips/stackbutton'
    },
    {
      userPhoto: '/assets/images/user.svg',
      subject: 'Quantum theory',
      userName: 'Max Planck',
      date: new Date().toLocaleString(),
      text: 'Max closed issue #325 in sheaphillips/stackbutton'
    },
    {
      userPhoto: '/assets/images/user.svg',
      subject: 'Photoelectric effect',
      userName: 'Albert Einstein',
      date: new Date().toLocaleString(),
      text: 'Albert added an issue to sheaphillips/stackbutton'
    },
    {
      userPhoto: '/assets/images/user.svg',
      subject: 'Atomic structure',
      userName: 'Niels Bohr',
      date: new Date().toLocaleString(),
      text: 'Neils made a commit to sheaphillips/stackbutton'
    }
  ];

  return {
    loadAllItems: function () {
      return $q.when(activities);
    }
  };
}
