'use strict';

// Load the module dependencies
const config = require('./config'),
  mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
  // http://mongoosejs.com/docs/promises.html: Use native promises
  mongoose.Promise = global.Promise;

  // Use Mongoose to connect to MongoDB
  const db = mongoose.connect(config.db);

  // Load the application models 
  require('../server/models/task.server.model');

  // Return the Mongoose connection instance
  return db; 
};