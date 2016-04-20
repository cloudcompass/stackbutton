# stackbutton
A friendly - but powerful - provisioning tool for DevOps tool chains and application infrastructure.

# Getting Started

  1. Install [nodejs](http://nodejs.org) version 4.4.3LTS.
  2. Install [sails](http://sailsjs.org/get-started).  Do *not* run the ```sails new...``` command.
  3. Install [ruby](https://www.ruby-lang.org/en/).
  4. Clone this repo via ```git clone https://github.com/sheaphillips/stackbutton.git```
  5. From the command line, in the location you cloned the repo into:

  ```shell
  npm install grunt bower -g
  npm install
  gem install sass
  sails lift
  ```

  The above command should run the app and you will be able to view it at <http://localhost:1337> in your favourite browser.

  To enable mongo:

  1. Ensure you have the mongo sails adapter by running ```npm install```
  2. Create a file config/local.js. *Do not add this to git*
  3. Add the following block to your new local.js file:

  ```javascript
  module.exports.connections = {

    stackbuttonMongo: {
      host: 'blah', // defaults to `localhost` if omitted
      port: blah, // defaults to 27017 if omitted
      user: 'blah', // or omit if not relevant
      password: 'blah', // or omit if not relevant
      database: 'blah' // or omit if not relevant
    }
  };

  module.exports.models = {

    /***************************************************************************
     *                                                                          *
     * Your app's default connection. i.e. the name of one of your app's        *
     * connections (see `config/connections.js`)                                *
     *                                                                          *
     ***************************************************************************/
    connection: 'stackbuttonMongo'
  };
  ```

  4. Replace 'blah' in the block above with a value appropriate for your database.



