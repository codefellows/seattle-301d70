'use strict';

const express =require('express');

const app = express();

app.set('view engine', 'ejs');
// view engine means whatever library will handle all rendering for this app

const shoppingList = [
  {product: 'ice cream', quantity: 99 },
  {product: 'animal crackers', quantity: 199},
  {product: 'pizza', quantity: 4},
  {product: 'bananas', quantity: 32},
  {product: 'coffee', quantity: 1},
  {product: 'toilet paper', quantity: 300 }
];

const names = ['clement', 'seamus' , 'stephen', 'darci'];


// we need to store theList in an object
// {
//   theListKeyName: [
//     { product: 'ice cream', quantity: 99 },
//     { product: 'animal crackers', quantity: 199 },
//     { product: 'pizza', quantity: 4 },
//     { product: 'bananas', quantity: 32 },
//     { product: 'coffee', quantity: 1 },
//     { product: 'toilet paper', quantity: 300 }
//   ]
// }


app.get('/list-with-ejs', showList);

function showList(req, res){
  // I am required to pass an object, is shoppingList a good object?
  // ejs needs to use syntax like <%=KEYNAME %> and arrays just have indexes
  const obj = { theListKeyName: shoppingList, names: names };
  res.render('list.ejs', obj);
}

app.get('/ejs-fun', testingEjs);

function testingEjs(req, res){
  // 1. create a source file to hold your template
  //    1a. this file needs to live in a folder called `views`
  //    1b. the file needs the .ejs fileType
  // 2. we render like mustache by calling a render method
  // instead of res.send we call res.render
  // 3. pass some data as an Object in res.render (JUST LIKE MUSTACHE)
  //    Mustache.render(sourceHTML, {data object})
  //    res.render(sourceHTML, {data Object})

  res.render('plan-to-shop.ejs', {
    iceCream : 'vanilla',
    cookie: 'mint thin',
    candyCane: 'true'
  });
  // no need for views folder name in the path because it is implied. It always looks there
}

app.get('/shopping-list', displayList);

function displayList(req, res){
  const arr = shoppingList.map(item => {
    return `<h2>${item.product}</h2>`;
  });
  res.send(arr.join(''));
}


app.listen(3000, console.log('SERVER on 3000'));
