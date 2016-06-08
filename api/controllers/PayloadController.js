/**
 * PayloadController
 *
 * @description :: Server-side logic for managing payloads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `PayloadController.addEvent()`
   */
  addEvent: function (req, res) {
    if (typeof req.headers['x-github-event'] != 'undefined') {
      sails.log.info('found github header');
      event = GithubService.createEvent(req, null);
    }
    Event.create(event).exec(function createCB(err, created) {
      sails.log.info('Created event', created);
      Event.publishCreate(created);
      return res.json(created);
    });
  }
};
