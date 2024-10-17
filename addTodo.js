const redis = require('./redis');
const Todo = require('./db');

async function addTodo(text) {
    const todo = new Todo({ text, completed: false });
    await todo.save();

    await redis.set(`todo:${todo._id}`, JSON.stringify(todo));
}
