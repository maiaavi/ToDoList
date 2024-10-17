const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/seuBanco', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const TodoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
