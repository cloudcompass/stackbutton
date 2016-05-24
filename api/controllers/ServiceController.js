/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getRepos: function (req, res) {
    sails.log.debug("getRepos request body", req.param('service'));
    var service = req.param('service');
    GithubService.getRepos(service, function (err, data, headers) {
      return res.json(data);
    });
  }
  
};
