'use strict';

// ==== packages ====
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent'); // getting data from a url

// ==== setup the application (server) ====
const app = express();
app.use(cors());

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====

app.get('/star-wars', (req, res) => {
  /*
    things that have visited urls
    <a href></a>
    $.ajax
  */

  // Any time javascript recognizes an event as taking more than instant time, it can use a promise to wait for the event to finish before handling it
  // A promise is just an object that contains the necessary info to continue running code for delayed process
  // promises are a javascript thing, not a superagent or jquery
  // promises fail and succeed We call this resolving and rejecting
  // a promise can be directed to a failure or success callback just like we can have a try catch with two different options
  // so far we have always been going through the `success` path: this path triggers the .then(callback)
  // failure triggers another function `.catch`


  superagent('http://swapaaaaaaai.dev/api/planets/1/') // promises
    .then(stuffThatComesBack => {
      console.log(stuffThatComesBack.body); // body is created by superagent
      res.send(stuffThatComesBack.body);
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('oops we made a mistake');
    });
});

app.get('/location', (req, res) => {
  if(req.query.city === 'newark'){
    res.status(500).send('ew newark');
    return;
  }

  const searchedCity = req.query.city;
  const key = process.env.LOCATION_API_KEY;

  // const theDataArrayFromTheLocationJson = require('./data/location.json');
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${searchedCity}&format=json`;
  superagent.get(url)
    .then(result => {
      // console.log(result.body); // always check the body with superagent

      const theDataObjFromJson = result.body[0]; // since my data is identical, i just need to use the superagent data in place of the location.json file data

      const newLocation = new Location(
        searchedCity,
        theDataObjFromJson.display_name,
        theDataObjFromJson.lat,
        theDataObjFromJson.lon
      );

      res.send(newLocation);
    })
    .catch(error => {
      res.status(500).send('locationiq failed');
      console.log(error.message);
    });




});

app.get('/restaurants', (req, res) => {
  console.log(req.query);

  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const apiKey = process.env.ZOMATO_API_KEY;

  const url = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lng=${longitude}`;

  superagent.get(url)
    .set('user-key', apiKey) // is not necessary unless a doc says so (hint hint not necessary for weather)
    .then(dataThatComesBack => {
      console.log(dataThatComesBack.body);


      const arr = [];
      dataThatComesBack.body.nearby_restaurants.forEach(jsonObj => {
        const restaurant = new Restaurant(jsonObj);
        arr.push(restaurant);
      });

      res.send(arr);

    })
    .catch(error => {
      res.status(500).send('zomato failed');
      console.log(error.message);
    });

});

// ==== Helper Functions ====

function Location(search_query, formatted_query, latitude, longitude){
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
}

// arr[0] === jsonObj
function Restaurant(jsonObj){
  this.restaurant = jsonObj.restaurant.name;
  this.locality = jsonObj.restaurant.location.locality_verbose;
  this.cuisines = jsonObj.restaurant.cuisines;
}



// ==== Start the server ====
app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));

