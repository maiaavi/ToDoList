// app.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('./redis');
const Todo = require('./db');
const app = express();

app.use(express.json());

async function getTodo(id) {
    const cachedTodo = await redis.get(`todo:${id}`);
    if (cachedTodo) {
        return JSON.parse(cachedTodo);
    }
    const todo = await Todo.findById(id);
    if (todo) {
        await redis.set(`todo:${id}`, JSON.stringify(todo));
    }
    return todo;
}

app.get('/todo/:id', async (req, res) => {
    const todo = await getTodo(req.params.id);
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    res.json(todo);
});

mongoose.connect('mongodb://localhost:27017/seuBanco', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});
