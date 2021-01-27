'use strict';

const express = require('express');
const pg =require('pg');
const methodOverride = require('method-override'); // NEW
require('dotenv').config();

const app = express();
app.use(methodOverride('_method'));
// method override will look in our request path for a query string of _method
// it will change the http method's type to whatever is stored as that query string '_method''s value

//?_method=delete :: method override will make a form with this in the path into a delete request
//?_method=put :: method override will make a form with this in the path into a put request

/*
method override behind the scenes
if(request.query._method){
  request.type = request.query._method;
}
*/

/*
Full change for method overrid
app.use(methodOverride('_method'))
to any form that needs to be delete or put
add ?_method=delete or ?_method=put to the action
*/

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));

const PORT = process.env.PORT || 3111;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);


app.get('/todos', getTodos);// get all todos
app.get('/todo/:index', getTodo); // get one todo
app.post('/todo', createTodo); // create a single todo

// HTML forms can only make get or post requests. DELETE and PUT are absolutely request types, they are not built into html

// The internet abuses get routes - GET routes are 'crawled' all day long by search engine optimization tools ('Google', 'Bing')
// they get crawled by python devs - intro to python courses all over the web teach web crawling
app.delete('/todo/:id', deleteTodo);
app.put('/todo/:id', updateTodo);

function updateTodo(req, res){
  //TODO: update a task
  // might want to change the due date
  // might want to change the task name
  const sqlStatement = 'UPDATE todo  SET task=$1, dueDate=$2 WHERE id = $3';
  const array = ['scooby dooing', 'when the monsters come', 99];
  res.send('updating');
}




function deleteTodo(req, res){
  // console.log('query', req.query);
  console.log('params', req.params);
  // console.log('body', req.body);

  const sqlQuery = 'DELETE FROM todo WHERE id=$1;';
  const array = [req.params.id];
  client.query(sqlQuery, array)
    .then(() => {
      res.redirect('/todos'); // go visit the todos route (they will see one less todo)
    });
}



function getTodos(req, res){
  const sqlQuery = 'SELECT * FROM todo;';
  client.query(sqlQuery)
    .then(result => {
      const todos = result.rows;
      res.render('pages/todos-list.ejs', {todos: todos});

    });
}

function getTodo(req, res){
  const index = req.params.index;
  const sqlQuery = 'SELECT * FROM todo WHERE id=$1';
  const array = [index];

  client.query(sqlQuery, array)
    .then(result =>{
      res.render('pages/single-todo.ejs', { todo: result.rows[0] });
    });

}

function createTodo(req, res){
  const sqlQuery = 'INSERT INTO todo (task, dueDate) VALUES ($1, $2);';
  const array = [req.body.task, req.body.dueDate];
  client.query(sqlQuery, array)
    .then(() => {
      res.redirect('/todos');
      // TODO: send to detail view
    });

}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));

  })
  .catch(console.error);
