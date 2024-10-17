const express = require('express');
const Todo = require('../models/todoModel');
const router = express.Router();

router.post('/todo', async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });
    await todo.save();
    res.status(201).json(todo);
});

router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.get('/todo/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    res.json(todo);
});

router.put('/todo/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    res.json(todo);
});

router.delete('/todo/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    res.status(204).send();
});

module.exports = router;
