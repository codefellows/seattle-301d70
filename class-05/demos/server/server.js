'use strict';

// in front end js - if the library is loaded before the app.js, we can use its variables
// not so in npm because NONE of the node_modules/libraries are loaded by default
// in this file we have to tell them to load

const express = require('express'); // looks in node_modules and picks a library with the same name to load

const app = express(); // builds a server from the express library

// middleware that hosts the website
app.use(express.static('./public')); // host all the files in the public folder.

const PORT = 3000;

// /doggo is called a route
app.get('/doggo', (request, response) => {
  // The same request and response from the WRRC
  // console.log(request, response);
  response.send('Ginger was here');
});




app.listen(PORT, () => console.log(`yay the server started on PORT: ${PORT}`));

// localhost:8080 has live-server
// express is so popular that their guide doc that says try using 3000 has made 3000 the dev server port
