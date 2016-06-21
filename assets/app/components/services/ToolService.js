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
    {name: 'repo', display: 'Source Control'},
    {name: 'issues', display: 'Issue Tracking'},
    {name: 'wiki', display: 'Wiki'},
    {name: 'chat', display: 'Messaging'}
  ];

  return ToolService;


  /* FUNCTIONS */

  function loadTools() {
    // TODO load from server
    var tools = [
      {
        name: 'github',
        image: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
        modules: ['repo', 'issues', 'wiki'],
        disabled: false
      },
      {
        name: 'bitbucket',
        image: 'https://worldvectorlogo.com/logos/bitbucket.svg',
        modules: ['repo'],
        disabled: true
      }
    ];

    return $q.when(tools);
  }

}
