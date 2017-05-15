/**
 * backend api router
 */

'use strict';

// Load the module dependencies
const task = require('../controllers/task.server.controller');

// Define the routes module' method
module.exports = function (app) {
  // Set up the 'task' base routes 
  app.route('/api/task')
    .get(task.list)
    .post(task.create);

  // Set up the 'task' parameterized routes
  app.route('/api/task/:id')
    .get(task.read)
    .put(task.update)
    .delete(task.delete);

  // Set up the 'id' parameter middleware   
  app.param('id', task.taskByID);
};

