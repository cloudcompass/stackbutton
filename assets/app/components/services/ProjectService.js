sbapp.factory('ProjectService', [
  '$resource',
  ProjectService]
);

function ProjectService($resource) {

  var projService = {};

  projService.user = $resource('/user/:userid', {userid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.project = $resource('/project/:projid', {projid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
  projService.team = $resource('/project/:projid/contributors/:userid', {projid: '@project', userid: '@user'});

  projService.dashboard = $resource('/dashboard/:dashboardid', {dashboardid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.service = $resource('/service/:serviceid', {serviceid: '@id'}, {
    update: {
      method: 'PUT'
    },
    getAccount: {
      method: 'POST',
      url: '/service/getAccount'
    }
  });

  projService.widget = $resource('/widget/:widgetid', {widgetid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  projService.module = $resource('/module/:moduleid', {moduleid: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

  /*
   Usage:

   {} = ProjectService.get({projid: <5555>});
   [] = ProjectService.query({ownerId: <99>}); -- can use different/additional attributes
   ProjectService.delete({projid: <5555>);

   */

  return projService;
}

