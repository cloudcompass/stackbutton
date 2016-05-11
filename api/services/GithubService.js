var https = require('https');

//TODO to be converted to a github wrapper
module.exports = {

  getAccountName: function (serviceID, cb) {
    sails.log.debug('finding service:', serviceID);
    Service.findOne({id: serviceID})
      .exec(function (err, res) {
        var options = {
          hostname: 'api.github.com',
          path: '/user',
          method: 'GET',
          headers: {
            'Authorization': 'token ' + res.token,
            'User-Agent': 'StackButton'
          }
        };
        var data;
        var request = https.request(options, function (response) {
          var buffer = "", data;
          response.on("data", function (chunk) {
            buffer += chunk;
          });
          response.on("end", function (err) {
            // finished transferring data
            data = JSON.parse(buffer);
            if (response.statusCode == 200) {
              cb(data.login);
            } else {
              cb(new Error(data.message));
            }
          });
        });
        request.on('error', function (err) {
          sails.log.error('validateToken():', err);
          cb(err)
        });
        request.end();
      });
  },

  validateToken: function (token, cb) {
    var options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'StackButton'
      }
    };
    var data;
    var request = https.request(options, function (response) {
      var buffer = "", data;
      response.on("data", function (chunk) {
        buffer += chunk;
      });
      response.on("end", function (err) {
        // finished transferring data
        data = JSON.parse(buffer);
        if (response.statusCode == 200) {
          cb();
        } else {
          cb(new Error(data.message));
        }
      });
    });
    request.on('error', function (err) {
      sails.log.error('validateToken():', err);
      cb(err)
    });
    request.end();
  }
};
/**
 * Created by tiffa on 2016-05-06.
 */
