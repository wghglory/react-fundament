// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const config = require('./config'),
  express = require('express'),
  bodyParser = require('body-parser');

// Express middleware for single page apps with client side routing.
const history = require('connect-history-api-fallback');

// Define the Express configuration method
module.exports = function (db) {
  // Create a new Express application instance
  var app = express();

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.text());
  app.use(bodyParser.json());

  // Load the routing files
  require('../server/routers/task.server.router')(app);

  // SPA, use html5 history Api, must before configure static file
  app.use(history({}));

  // Configure static file serving
  app.use(express.static('./dist'));

  // Return the Server instance
  return app;
};