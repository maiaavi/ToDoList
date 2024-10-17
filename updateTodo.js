const redis = require('./redis');
const Todo = require('./db');

async function updateTodo(id, newText) {
    await Todo.findByIdAndUpdate(id, { text: newText });

    await redis.del(`todo:${id}`);
}
