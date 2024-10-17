const redis = require('./redis');
const Todo = require('./db');

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
