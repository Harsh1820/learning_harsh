const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: true, enum: ['complete', 'incomplete'] }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
