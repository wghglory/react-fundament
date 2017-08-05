/**
 * backend CRUD api
 */

'use strict';

// Load the module dependencies
let mongoose = require('mongoose'),
    Task = mongoose.model('Task');

// Create a new error handling controller method
let getErrorMessage = (err) => {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

// Create a new controller method that creates new tasks
exports.create = (req, res) => {

    // Create a new task object
    let task = new Task(req.body);

    // Try saving the task
    task.save((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the task
            res.json(task);
        }
    });
};

// Create a new controller method that retrieves a list of tasks
exports.list = (req, res) => {
    Task.find({}, (err, tasks) => {
        res.json(tasks);
        // res.send(tasks);
    });
};

// Create a new controller method that returns an existing task
exports.read = (req, res) => {
    res.json(req.task);
};

// Create a new controller method that updates an existing task
exports.update = (req, res) => {
    // Get the task from the 'request' object
    let task = req.task;

    // Update the task fields
    task.label = req.body.label;

    // Try saving the updated task
    task.save((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the task
            res.json(task);
        }
    });
};

// Create a new controller method that delete an existing task
exports.delete = (req, res) => {
    // Get the task from the 'request' object
    let task = req.task;

    // Use the model 'remove' method to delete the task
    task.remove((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.send({ removed: Boolean(!err) });
            // res.json(task);
        }
    });
};

exports.deleteById = (req, res) => {
    const _id = req.params.id;

    Task.remove({ _id }, (err) => {
        res.send({ removed: Boolean(!err) });
    });
};

// Create a new controller middleware that retrieves a single existing task
exports.taskByID = (req, res, next, id) => {
    // Use the model 'findById' method to find a single task
    // Task.findById(id).then(function (task) {
    Task.findOne({ _id: id }).then((task) => {
        // If an task is found use the 'request' object to pass it to the next middleware
        req.task = task;

        // Call the next middleware
        next();
    }).catch((err, task) => {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load task ' + id));
    });
};