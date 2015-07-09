var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  port: 8000
});

// Views manager required to handle errors
server.views({
  engines: {
    html: require("handlebars")
  },
  relativeTo: __dirname,
  path: "templates",
  //helpersPath: "helpers"
});

// Register clapper with the server.
// This example adds facebook as one of the login providers.
server.register({
    register: require('clapper'),
    options: { // plugin options are mandatory
      defaultRights: {
        anonymous: {
          canHazCheezburger: false
        },
        authenticated: {
          canHazCheezburger: true
        }
      },
      cookie: { // hapi-auth-cookie strategy options here
        password: 'asdfasdf',
        isSecure: false
      },
      logins: [{
        displayName: 'Facebook',
        routeName: 'facebook', // clapper will create a route at '/auth/facebook'
        bellProvider: { // related bell strategy options here
          provider: 'facebook',
          password: 'hapiauth',
          clientId: 'asdfasdf', // fill in your FB ClientId here
          clientSecret: 'asdfasdf', // fill in your FB Client Secret here
          isSecure: false,
          forceHttps: false
        }
      }, {
        displayName: 'Twitter',
        routeName: 'twitter', // clapper will create a route at '/auth/facebook'
        bellProvider: { // related bell strategy options here
          provider: 'twitter',
          password: "doesnotmatter",
          clientId: "asdfasdf",
          clientSecret: "asdfasdf",
          isSecure: false,
          forceHttps: false
        }
      }, {
        displayName: 'Google',
        routeName: 'google', // clapper will create a route at '/auth/facebook'
        bellProvider: { // related bell strategy options here
          provider: 'google',
          password: 'hapiauth',
          clientId: 'asdfasdf-asdfasdf.apps.googleusercontent.com', // fill in your Google ClientId here
          clientSecret: 'asdfasdf', // fill in your Google Client Secret here
          isSecure: false,
          forceHttps: false
        }
      }]
    }
  },
  function(err) {

    // Declare a route that requires the user to have the 'canHazCheezburger' right.
    // If the user does not have the right, they will be redirected to the error view.
    // If the user does have the right, the route handler function will be executed.
    server.route({
      path: '/',
      method: 'GET',
      config: {
        plugins: {
          clapper: {
            canHazCheezburger: true
          }
        }
      },
      handler: function(request, reply) {
        return reply('I can haz cheezburger!');
      }
    });

    // Start the server.
    // To test, please access:
    // 1. http://localhost:8000/              - confirm error page.
    // 2. http://localhost:8000/auth/facebook - login.
    // 3. http://localhost:8000/              - confirm cheezburger.
    server.start();
  });
