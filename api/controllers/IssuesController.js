/**
 * IssuesController
 *
 * @description :: Server-side logic for managing Issues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `IssuesController.getIssues()`
   */
  getIssues: function (req, res) {
    sails.log.debug("getIssues request body", req.param('widget'));
    var widget = req.param('widget');
    GithubService.getIssues(widget, function (err, data, headers) {
      return res.json(data);
    });
  }

};

