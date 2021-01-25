'use strict';

const express = require('express');
const superagent = require('superagent');

const app =express();

app.use(express.urlencoded({extended: true}));// read form data
app.use(express.static('./public')); // load the public folder (css);
app.set('view engine', 'ejs');

app.get('/', showHome);
app.get('/book-search', showSearchPage);
app.post('/book-search', makeBookSearch);

function makeBookSearch(req, res){
  const title = req.body.title;
  const url = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${title}`;
  superagent.get(url).then(stuff => {
    console.log(stuff.body.items);
    const titles = stuff.body.items.map(item => item.volumeInfo.title);
    res.render('results.ejs', {titles: titles} );
  });
}

function showSearchPage(req, res) {
  res.render('search.ejs');
}

function showHome(req, res){
  res.render('index.ejs');
}



app.listen(3000, () => console.log('SERVER on 3000'));
