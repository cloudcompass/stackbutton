/**
 * VCSController
 *
 * @description :: Server-side logic for managing VCS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `VCSController.getCommits()`
   */
  getCommits: function (req, res) {
    // sails.log.debug("getCommits request body", req.param('widget'));
    var widget = req.param('widget');
    GithubService.getCommits(widget, function (err, data, headers) {
      return res.json(data);
    });
  }
};

