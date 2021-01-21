'use strict';

// 1. Create db
// 2. add pg, the package
// 3. create the client variable and pass it the DATABASE_URL
// 3.5 create the .env variable for DATABASE_URL
// 4. conenct to the db
// 6. create the table
// 7. create a schema.sql file
// 8. run the schema.sql file with psql -d city_explorer_301d70 -f schema.sql
// 9. add to our route a check for if there is data in the db
// 10. check the table for the location

// ==== packages ====
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent'); // getting data from a url
const pg = require('pg');

// ==== setup the application (server) ====
const app = express();
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// ==== other global variables ====
const PORT = process.env.PORT || 3111;

// ==== Routes ====

app.get('/location', getLocation);
app.get('/restaurants', getRestaurants);

// ==== Route Callbacks ====

function getLocation (req, res) { // single responsibiliy : res.send(location);

  lookupAndPotentiallySearch(req, res)
    .then(location => {
      console.log('end location', location);
      res.send(location); // TODO: this line will not work yet
    });

  // Promise// with sql stuff
  //   .then(location => { // location can be thought of as whatever is returned by lookupAndPotentiallySearch(req, res)
  //     console.log('end location', location);
  //     res.send(location); // TODO: this line will not work yet
  //   });
}


function lookupAndPotentiallySearch(req, res){
  const searchedCity = req.query.city;
  const key = process.env.LOCATION_API_KEY;

  // if it is in the db already, just use that
  const sqlQuery = 'SELECT * FROM location WHERE search_query=$1';
  const sqlArray = [searchedCity];

  return client.query(sqlQuery, sqlArray) // returns a Promise
    .then(result => {
      // console.log('result.rows', result.rows);

      if (result.rows.length !== 0) {
        console.log('it exists');
        return result.rows[0];
      } else {

        // const theDataArrayFromTheLocationJson = require('./data/location.json');
        const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${searchedCity}&format=json`;
        return superagent.get(url)
          .then(result => {
            // console.log(result.body); // always check the body with superagent

            const theDataObjFromJson = result.body[0]; // since my data is identical, i just need to use the superagent data in place of the location.json file data

            const newLocation = new Location(
              searchedCity,
              theDataObjFromJson.display_name,
              theDataObjFromJson.lat,
              theDataObjFromJson.lon
            );

            // TODO: save the location to the database so that the next time someone searches, they can use it

            const sqlQuery = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
            const sqlArray = [newLocation.search_query, newLocation.formatted_query, newLocation.latitude, newLocation.longitude];

            client.query(sqlQuery, sqlArray);
            return newLocation;

          })
          .catch(error => {
            res.status(500).send('locationiq failed');
            console.log(error.message);
          });

      }
    });
}

function getRestaurants(req, res) {
  // adjust your url for superagent to have a count and offset (these variables will be unique to yelp)
  // make sure it works by putting in hard coded values
  // check your req.query, it will have a page key with a value of 1 or 2 or 3
  // adjust your code to pick results based on that 'page' key using math

  console.log(req.query);

  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const apiKey = process.env.ZOMATO_API_KEY;
  const page = req.query.page;
  const offset = (page - 1) * 3;

  const url = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lng=${longitude}&count=3&start=${offset}`;

  superagent.get(url)
    .set('user-key', apiKey) // is not necessary unless a doc says so (hint hint not necessary for weather)
    .then(dataThatComesBack => {
      // console.log(dataThatComesBack.body);
      const arr = [];
      dataThatComesBack.body.restaurants.forEach(jsonObj => {
        const restaurant = new Restaurant(jsonObj);
        arr.push(restaurant);
      });

      const arr2 = dataThatComesBack.body.restaurants.map(restMapCB);

      function restMapCB(restaurant) {
        return new Restaurant(restaurant);
      }

      const arr3 = dataThatComesBack.body.restaurants.reduce(restReduceCB, []);

      function restReduceCB(accArr, restaurant) {
        accArr.push(new Restaurant(restaurant));
        return accArr;
      }

      res.send(arr);

    })
    .catch(error => {
      res.status(500).send('zomato failed');
      console.log(error.message);
    });

}

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
client.connect();
app.listen(PORT, () => console.log(`we are up on PORT ${PORT}`));

