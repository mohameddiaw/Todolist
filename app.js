const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});
app.post('/todos', async (req, res) => {
  const task = req.body.task;
  const todo = new Todo({ task });
  await todo.save();
  res.send(todo);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
