const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

// Get all todos
router.get("/", async (request, response) => {
    try {
        const todos = await Todo.find();
        response.json(todos);
    } catch (err) {
        response.status(500).json({ message: "Error fetching todos" });
    }
});

// Get a single todo by ID
router.get("/:id", async (request, response) => {
    try {
        const todo = await Todo.findById(request.params.id);
        if (!todo) return response.status(404).json({ message: "Todo not found" });
        response.json(todo);
    } catch (err) {
        response.status(500).json({ message: "Error fetching todo" });
    }
});

// Add a new todo
router.post("/", async (request, response) => {
    try {
        const { name, status } = request.body;
        const todo = new Todo({ name, status });
        await todo.save();
        response.json({ status: 1, msg: "Todo added successfully", todo });
    } catch (err) {
        response.status(500).json({ message: "Error adding todo" });
    }
});

// Delete a todo
router.delete("/:id", async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id);
        if (!todo) return response.status(404).json({ message: "Todo not found" });
        response.json({ status: 1, msg: `Todo item with id ${request.params.id} is deleted` });
    } catch (err) {
        response.status(500).json({ message: "Error deleting todo" });
    }
});

// Add this route handler to your Express setup
router.put("/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const { name, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { name, status }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ status: 0, msg: "Todo not found" });
        }
        res.json({ status: 1, msg: "Todo updated successfully", todo: updatedTodo });
    } catch (err) {
        res.status(500).json({ status: 0, msg: "Error updating todo" });
    }
});


module.exports = router;
