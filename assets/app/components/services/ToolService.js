/**

Copyright 2016, Cloud Compass, Inc.

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
/**
 * Created by tiffa on 2016-05-10.
 */
sbapp.service('ToolService', ['$resource', '$q', ToolService]);

function ToolService($resource, $q) {
  /* CALLABLE MEMBERS */
  var ToolService = {};

  ToolService.loadTools = loadTools;
  ToolService.loadServiceRepos = $resource('/service/getRepos');
  ToolService.modules = [
    {name: 'repo', display: 'Source Control', image: 'images/modules/repo.png'},
    {name: 'issues', display: 'Issue Tracking', image: 'images/modules/issues.png'},
    {name: 'wiki', display: 'Wiki', image: 'images/modules/wiki.png'},
    {name: 'chat', display: 'Messaging', image: 'images/modules/chat.png'}
  ];

  return ToolService;


  /* FUNCTIONS */

  function loadTools() {
    // TODO load from server
    var tools = [
      {
        name: 'github',
        image: 'images/github.png',
        modules: ['repo', 'issues', 'wiki'],
        disabled: false
      },
      {
        name: 'bitbucket',
        image: 'images/bitbucket.png',
        modules: ['repo'],
        disabled: true
      }
    ];

    return $q.when(tools);
  }

}
