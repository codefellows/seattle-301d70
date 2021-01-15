'use strict';

/*
 1. Form that asks for a server's url - this will be functionally useless
 2. Form pops up to search for location
 3. On submit, use the location data to "build" the map (put the completely static image on the page)
 4. On submit, use the location data to "search" for restaurant data (just render the json to the page)
*/
const defaultLocation = {
  'id': 1,
  'search_query': 'seattle',
  'formatted_query': 'Seattle, WA, USA',
  'latitude': '47.606210',
  'longitude': '-122.332071',
  'created_at': null
};

const defaultRestaurants = [
  {
    'restaurant': 'Pink Door',
    'cuisines': 'Italian',
    'locality': 'Pike Place Market'
  },
  {
    'restaurant': 'Serious Pie',
    'cuisines': 'Pizza, Italian',
    'locality': 'Belltown'
  },
  {
    'restaurant': 'Salumi',
    'cuisines': 'Sandwich, Deli, Italian',
    'locality': 'Pioneer Square'
  },
  {
    'restaurant': 'Lola',
    'cuisines': 'Greek, Mediterranean, Pacific Northwest',
    'locality': 'Hotel Andra'
  },
  {
    'restaurant': 'Wild Ginger',
    'cuisines': 'Vietnamese, Chinese, Asian',
    'locality': 'Downtown'
  },
  {
    'restaurant': 'Purple Cafe and Wine Bar',
    'cuisines': 'Pacific Northwest, American',
    'locality': 'Downtown'
  },
  {
    'restaurant': 'Le Pichet',
    'cuisines': 'Cafe, French',
    'locality': 'Pike Place Market'
  },
  {
    'restaurant': 'Cafe Campagne',
    'cuisines': 'French, Cafe',
    'locality': 'Pike Place Market'
  },
  {
    'restaurant': 'Dahlia Lounge',
    'cuisines': 'Seafood, Pacific Northwest',
    'locality': 'Belltown'
  }
];





let serverURL;

$('form:nth-of-type(2)').hide();

$('form:first-of-type').on('submit', event => {
  event.preventDefault();
  // when a form is submitted, it revisits the same page but puts info into the url
  $('form:first-of-type').hide();
  $('form:nth-of-type(2)').show();

  //  <input type="text" name="server"> because the name="server" => event.target.server
  serverURL = event.target.server.value; // take what is in the form and save it globally
});


$('form:nth-of-type(2)').on('submit', event => {
  event.preventDefault();
  const cityName = $('form:nth-of-type(2) input:first-of-type').val();
  // const cityName = event.target.city.value;
  console.log(cityName);

  // In order to get the GPS coordinates that we need for google to give us a map, we ask the server to convert 'albequerque' to GPS coordinates
  // use ajax to talk to the server
  // we concatenate the route `/location` to the server url so that the server knows what we are asking
  // `facebook.com/profile/nicholas/messages/archived/reply`

  $.ajax(`${serverURL}/location?city=${cityName}`)
    .then(gpsDataThatCameBack => {
    // render the map
      gpsDataThatCameBack = defaultLocation;
      const imgString = `<img src="images/map.png?lat=${gpsDataThatCameBack.latitude}&lng=${gpsDataThatCameBack.longitude}"/>`;
      $('main').append(imgString);

      // once we have gps we can search for restaurants

      $.ajax(`${serverURL}/yelp`, {
        data: gpsDataThatCameBack
      // all the keys in gpsDataThatCameBack will be concatenated in the url as ?key=value&key2=value2 etc
      })
        .then(restaurantDataThatComesBack =>{
          restaurantDataThatComesBack = defaultRestaurants;
          const html = $('#restaurant-template').html();
          restaurantDataThatComesBack.forEach(restaurant => {
            const newHtml = Mustache.render(html, restaurant);
            $('main > ul').append(newHtml);
          });

        });

      $.ajax(`${serverURL}/parks`, {
        data: gpsDataThatCameBack
        // all the keys in gpsDataThatCameBack will be concatenated in the url as ?key=value&key2=value2 etc
      })
        .then(restaurantDataThatComesBack => {
          restaurantDataThatComesBack = defaultRestaurants;
          const html = $('#restaurant-template').html();
          restaurantDataThatComesBack.forEach(restaurant => {
            const newHtml = Mustache.render(html, restaurant);
            $('main > ul').append(newHtml);
          });

        });
      $.ajax(`${serverURL}/weather`, {
        data: gpsDataThatCameBack
        // all the keys in gpsDataThatCameBack will be concatenated in the url as ?key=value&key2=value2 etc
      })
        .then(restaurantDataThatComesBack => {
          restaurantDataThatComesBack = defaultRestaurants;
          const html = $('#restaurant-template').html();
          restaurantDataThatComesBack.forEach(restaurant => {
            const newHtml = Mustache.render(html, restaurant);
            $('main > ul').append(newHtml);
          });

        });
      $.ajax(`${serverURL}/movies`, {
        data: gpsDataThatCameBack
        // all the keys in gpsDataThatCameBack will be concatenated in the url as ?key=value&key2=value2 etc
      })
        .then(restaurantDataThatComesBack => {
          restaurantDataThatComesBack = defaultRestaurants;
          const html = $('#restaurant-template').html();
          restaurantDataThatComesBack.forEach(restaurant => {
            const newHtml = Mustache.render(html, restaurant);
            $('main > ul').append(newHtml);
          });

        });

    });
});
