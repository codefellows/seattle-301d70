'use strict';

let serverUrl;

$('form:first-of-type').on('submit', (event) => {
  event.preventDefault();
  const url = event.target.url.value;
  serverUrl = url;
  const newHtml = Mustache.render($('#server-url').html(), {serverUrl : serverUrl});
  $(newHtml).insertAfter('form:first-of-type');
});

$('form:nth-of-type(2)').on('submit', event => {
  event.preventDefault();
  const text = event.target.city.value;

  //step 1: ask the server for gps data using the city name
  $.ajax(`${serverUrl}/location?city=${text}`)
  //step 2: gps data is returned from the server
    .then(stuffThatComesBack => {
      // put it on the page
      console.log(stuffThatComesBack);
      const newHtml = Mustache.render($('#gps-stuff').html(), stuffThatComesBack);
      $(newHtml).insertAfter('form:nth-of-type(2)');


      // Go get restaurants - once we have gps data
      //step 3: ask the server for restaurant data using the gps info
      $.ajax(
        `${serverUrl}/restaurants?search_query=${stuffThatComesBack.search_query}&formatted_query=${stuffThatComesBack.formatted_query}&latitude=${stuffThatComesBack.latitude}&longitude=${stuffThatComesBack.longitude}`
      )
        .then(restaurantStuff => {
          // step 4, the restaurant data has been sent from the server to the front end
          // put restaurants on the page;
          restaurantStuff.forEach(restaurant => {
            //render it;
            console.log(restaurant);
            const newHtml = Mustache.render($('#restaurant-template').html(), restaurant);
            $('ul').append(newHtml);
          });
        });
    });
});
