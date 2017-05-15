// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const config = require('./config'),
  express = require('express'),
  // morgan = require('morgan'),
  // compress = require('compression'),
  // methodOverride = require('method-override'),
  // session = require('express-session');
  bodyParser = require('body-parser');

// Express middleware for single page apps with client side routing.
const history = require('connect-history-api-fallback');

// Define the Express configuration method
module.exports = function (db) {
  // Create a new Express application instance
  var app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    // app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    // app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  // app.use(methodOverride());

  // // Configure the 'session' middleware
  // app.use(session({
  //   saveUninitialized: true,
  //   resave: true,
  //   secret: config.sessionSecret,
  //   store: mongoStore
  // }));

  // Set the application view engine and 'views' folder
  app.set('views', './server/views');
  app.set('view engine', 'ejs');

  // Load the routing files
  require('../server/routers/app.server.router')(app);
  require('../server/routers/task.server.router')(app);

  // Configure static file serving
  app.use(express.static('./dist'));

  // Return the Server instance
  return app;
};