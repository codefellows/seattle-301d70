/*
Things to review
 Refactoring

 Goal
 - home route that renders saved books from sql
 - detail view of each book
 - update for each book

*/

'use strict';

const express = require('express');
const pg = require('pg');
require('dotenv').config();
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3111;
const DATABASE_URL = process.env.DATABASE_URL;

app.set('view engine', 'ejs'); // express must be implying this if it sees .ejs files
app.use(methodOverride('_method'));

const client = new pg.Client(DATABASE_URL);

app.get('/', renderBooks);
app.get('/book/:isbn', renderDetails); // /book/6
app.put('/book/:isbn', updateBook);

function renderBooks(req, res){
  /*
  paste related trello card user story here
  get books from the database
  send them to the front end with res.render (uses ejs)
  render home.ejs
  */
  client.query('SELECT * FROM book;')
    .then(result => {
      // console.log(result.rows);
      res.render('home.ejs', {books: result.rows});
    });
}

function renderDetails(req, res){
  /*
  Get a single book from the database, where it lives as a row by referencing its isbn
  send the single books details (description, title, all of it, isbn)
  send the finished html to the front end with res.render('destination file', object)
  the object is made of key value pairs: you can reference the keys of that object directly as variables from the ejs file, their values are the values of the object

  {ab: 9}  => in ejs i can use `ab` as a variable like <%= ab %>
  details.ejs
  */
  const isbn = req.params.isbn;
  const sqlQuery = 'SELECT * FROM book WHERE isbn=$1';
  const sqlArray = [isbn];

  client.query(sqlQuery, sqlArray)
    .then(result => {
      console.log(result);
      const singleBook = result.rows[0];
      res.render('details.ejs', {book: singleBook});
    });
}

function updateBook(req, res){
  /*
    collect new data about a book from the client (front end)
    send that data to sql to update a specific book, which we will reference by isbn
    display the details page of the updated book by sending them to the details route
    res.redirect them to the details page
    no ejs file since we send them to the detail route (/book/:id)
  */
  res.send('updating a book');
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER on PORT ${PORT}`));

  })
  .catch(console.error);

