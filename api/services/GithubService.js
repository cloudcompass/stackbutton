var https = require('https');

module.exports = {

  getAccountName: function (token) {

    var options = {
      hostname: 'api.github.com/',
      path: '/user',
      method: 'GET',
      headers: {'Authorization': 'token ' + token}
    };

    https.request(options, function (response) {
      var responseData = '';
      //response.setEncoding('utf8');
      response.on('data', function (chunk) {
        responseData += chunk;
      });

      response.once('error', function (err) {
        // Some error handling here, e.g.:
        sails.log.error(err);
      });

      response.on('end', function () {
        try {
          return responseData.login;
        } catch (e) {
          sails.log.warn('Could not parse response from options.hostname: ' + e);
          return e;
        }
      });
    }).end();
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
