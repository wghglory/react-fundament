const mongoose = require('mongoose'),
	TaskSchema = new mongoose.Schema({
		label: String,
		complete: Boolean
	}, { timestamps: true });

mongoose.model('Task', TaskSchema);