# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

``` javascript
'use strict';

const express = require('express');
const pg = require('pg');

const app = express();

const DATABASE_URL=process.env.DATABASE_URL; //this could live in the file or in my terminal as an env variable

const client = new pg.Client(DATABASE_URL);

const PORT = 3000;

app.post('/' , (request, response) => {
  const SQL = 'INSERT INTO users (username, password) VALUES ($1, $2)';

  const values = [request.body.username, request.body.password];
  
  client.query(SQL, values)
    .then(result => {
      response.send(result.rowCount);
    })
    .catch(err => console.error(err));
});

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
      })
      .catch(err => console.error(err));
  });
```

## schema.sql

``` sql
DROP TABLE IF EXISTS user;

CREATE TABLE user(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  age INTEGER
);
```
