'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true})); // reads the inside of the url for POST

app.use(express.static('/public'));


// add a listener for when someone visits /cookies with a POST,
// in html  <form method="POST"> method="POST" turns the request into a POST

// req.query does not exist in a post by default. becase we are storing the info encoded in the request, like a letter stored inside an envelope
app.post('/cookies', buyCookies);

function buyCookies(req, res){
  console.log('req.query in the post', req.query);
  console.log('req.body in the post', req.body);
  res.send('you bought cookies');
}

// add a listener for when someone visits /cookies with a GET,
// add a listener to a click on some element
app.get('/cookies', displayCookiePage);

function displayCookiePage(req, res){
  console.log(req.query);
  res.sendFile('cookies.html', {root: './public'});
}

app.get('/order', orderCookies);

function orderCookies(req, res) {
  console.log(req.query);
  res.send(`${req.query.flavor} will be 99$`);
}

app.get('/ice-cream', getIceCream);

function getIceCream(req,res){
  console.log(req.query);
  res.send(`${req.query.name} : here is your ${req.query.quantity} ${req.query.flavor} ice cream`);
}


app.listen(3000, () => console.log('up on 3000'));
