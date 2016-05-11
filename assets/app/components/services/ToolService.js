/**
 * Created by tiffa on 2016-05-10.
 */
sbapp.service('ToolService', ['$q', ToolService]);

function ToolService($q) {
  /* CALLABLE MEMBERS */
  var ToolService = {};

  ToolService.loadTools = loadTools;
  ToolService.modules = [
    {name: 'repo', display: 'Repository'},
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
        modules: ['repo', 'issues', 'wiki']
      },
      {
        name: 'bitbucket',
        image: 'https://worldvectorlogo.com/logos/bitbucket.svg',
        modules: ['repo']
      }
    ];

    return $q.when(tools);
  }

}
