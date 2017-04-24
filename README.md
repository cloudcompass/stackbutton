# stackbutton

![stacky][stacky_logo]

A friendly - but powerful - provisioning and monitoring tool for DevOps tool chains and application infrastructure.

# Getting Started

  1. Install [nodejs](http://nodejs.org)
  2. Install [sails](http://sailsjs.org/get-started)  
  3. Install [ruby](https://www.ruby-lang.org/en/) for using Sass.
  4. Clone the stackbutton repo to your local disk
  5. Optionally add the following to sails's local configuration for config/local.js

  ```javascript
  module.exports.url = {
    hooks: 'http://your-url-here.com'
  };
  ```

  6. From the command line, in the location you cloned the repo into:

 ```shell
  npm install -g @angular/cli
  gem install sass
  cd ng2
  npm install
  ng serve
  ```

  The above command should run the NG Live Development Server on <http://localhost:4200>

  To enable mongo:

  1. Ensure you have the mongo sails adapter by running ```npm install in the stackbutton directory```
  2. Create a file config/local.js. *Do not add this to git*
  3. Add the following block to your new local.js file:

  ```javascript
  module.exports.connections = {

    stackbuttonMongo: {
      host: 'blah', // defaults to `localhost` if omitted
      port: blah, // defaults to 27017 if omitted
      user: 'blah', // or omit if not relevant
      password: 'blah', // or omit if not relevant
      database: 'blah', // or omit if not relevant
      adapter: 'sails-mongo'
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

  /* increase timeout for mongo*/
  module.exports.orm = {
    _hookTimeout: 60000 // I used 60 seconds
  };module.exports.permissions = {
    _hookTimeout: 60000 // I used 60 seconds
  };module.exports.pubsub = {
    _hookTimeout: 60000 // I used 60 seconds
  };
  ```

  4. Replace 'blah' in the block above with a value appropriate for your database.

### Contributing

Please see our [Contributing Guide](CONTRIBUTING.md).

### Trademarks

The names StackButton, Stacky, and the StackButton logo are trademarks of Cloud Compass, Inc. and may only be used as described in section 6 of the [License](LICENSE).

### License

```
Copyright 2016, Cloud Compass Computing, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

```

[stacky_logo]:https://github.com/sheaphillips/stackbutton/blob/master/assets/images/stacky500p.png





