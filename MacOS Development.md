# MacOS Development
1. Install Docker and Kitematic to run a MongoDB container.
2. Use git to clone the desired stackbutton development branch.
3. Install homebrew to get other packages.
	- `brew install ruby` (Used for sass and gem installer.)
	- `brew install nodejs` (Used as the js app rendering engine)
	- `npm install sails -g` (the sails application engine)
	- `npm install grunt -g` (Install grunt globally. Grunt collects dependencies.)
	- `npm install @angular/cli -g`
	- `gem install sass` to install Syntactically awesome style sheets globally. Used for managing and creating interactive stylesheets.

4. Optionally add a config/local.js to the application folder that adds hooks to the sails project. Do not include this in git; for your eyes only.

  ```javascript
  module.exports.url = {
    hooks: 'http://your-url-here.com'
  };
  ```
  
5. Open terminal and navigate into the directory that contains the cloned repo.

6. In the stackbutton directory use the command `npm install` to install the sails application using the listed dependencies. 

7. Use docker and kitematic to deploy a mongodb container https://hub.docker.com/r/library/mongo/

8. To connect mongo:

  1. Ensure you have the mongo sails adapter by running `npm install` in the stackbutton directory.
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

  Replace 'blah' in the block above with a value appropriate for your database. All of the port data for  the mongodb container should be available in kitematic.

9. cd into the ng2 directory and `npm install`. Use `ng serve` to serve the angular content. Leave 'ng serve' running as you work. <http://localhost:4200>

--------------------------

Optionally launch the application as production by using these commands in the stackbutton directory:

  ```shell
  npm install
  sails lift
  ```

  The above command should run the app at <http://localhost:1337>
  
  
