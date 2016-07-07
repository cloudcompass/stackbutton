/**

Copyright 2016, Cloud Compass Computing, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
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
