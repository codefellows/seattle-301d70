'use strict';

const express = require('express');
const pg =require('pg');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));

const PORT = process.env.PORT || 3111;

/*
  REST representational state transfer
  that we always modify data in a database based on the routes that talk to the server in exactly the same way
  get should read
  post should create
  put should update
  delete should delete
  you should be able to do this to the data

  In a RESTful server our route names relate to the data they interact with
*/

app.get('/todos', getTodos);// get all todos
app.get('/todo/:index', getTodo); // get one todo
app.post('/todo', createTodo); // create a single todo
// app.put('/todo'); // update a single todo
// app.put('/todos'); // update a single todo
// app.delete('/todo'); // delete a single todo
// app.delete('/todos'); // delete a single todo

const todos = [
  { task: 'pet Ginger', dueDate: 'now' },
  {task: 'eat lunch', dueDate: 'soon'},
  {task: 'make server', dueDate: '1 hour'},
  {task: 'decorate christmas tree', dueDate: '11 months'},

];

function getTodos(req, res){
  res.render('pages/todos-list.ejs', {todos: todos});
}

function getTodo(req, res){
  // I could send the index through post or get
  // post: encoded url data => req.body
  // get: query string parameter => req.query ::: /todo?index=1

  // When I visit the url /todo?index=1 -> I need the ?index=1 or it fails
  // if I make the index a part of the url it will tell me when I am wrong

  // if my route is adjusted to /todo/:index
  // and i visit it at          /todo/1
  // i can access my third location for data from the client
  // req.params.index contains path variables/parameters
  const index = req.params.index;
  res.render('pages/single-todo.ejs', {todo: todos[index]});
}

function createTodo(req, res){
  // req.body looks like { task: 'stuff', dueDate: '2021-01-30' }
  // req.body is the info from the form
  todos.push(req.body);
  // res.render('pages/todos-list.ejs', { todos: todos });
  // rendering ourselves 1. is repetitive 2. this functions purpose is not to show a webpage
  res.redirect('/todos');

}


// app.get('/cookies');// get all cookies
// app.get('/cookie'); // get one cookie
// app.post('/cookie'); // create a single cookie
// app.put('/cookie'); // update a single cookie
// app.delete('/cookie'); // delete a single cookie

// app.get('/coffees');// get all coffees
// app.get('/coffee'); // get one coffee
// app.post('/coffee'); // create a single coffee
// app.put('/coffee'); // update a single coffee
// app.delete('/coffee'); // delete a single coffee


app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));
