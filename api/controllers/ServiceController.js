/**
 * ServiceController
 *
 * @description :: Server-side logic for managing services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  nope: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  getAccount: function (req, res) {
    sails.log.debug("getAccount request body:", req.param('service'));
    var service = req.param('service');
    GithubService.getAccount(service, function (err, data, headers) {
      return res.json(data);
    });
  },

  getRepos: function (req, res) {
    sails.log.debug("getRepos request body", req.param('service'));
    var service = req.param('service');
    GithubService.getRepos(service, function (err, data, headers) {
      return res.json(data);
    });
  },


  getCommits: function (req, res) {
    sails.log.debug("getCommits request body", req.param('widget'));
    var widget = req.param('widget');
    GithubService.getCommits(widget, function (err, data, headers) {
      return res.json(data);
    });
  }
};
