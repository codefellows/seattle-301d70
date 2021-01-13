'use strict';

// eslint-disable-next-line no-undef
// console.log(neighborhoodDataSet);

// Mustache js takes a string and puts values in it, just like a template literal

// if you want to insert html into html using mustache you need double mustaches

// every single templated piece is built using the keys from an object

/* This will be one of our objects
{
    name: 'Fremont',
    city: 'Seattle',
    population: '23,566',
    founded: '1820',
    body: '<p>This is example text to show you how <strong>HTML</strong> can be escaped using <em>Mustache</em>.</p>'
  },
*/

// const stringOfHtml = `
// <li>
//       <h2>{{name}}, {{city}}</h2>
//       <p>Pop: {{population}}</p>
//       <p>Founded : {{founded}}</p>
//       {{{body}}}
//     </li>
//     `;

// neighborhoodDataSet.forEach(neighborhood => {
//   const renderedHtml = Mustache.render(stringOfHtml, neighborhood);
//   console.log(renderedHtml);
//   $('ul').append(renderedHtml);
// });

neighborhoodDataSet.forEach(neighborhood => {
  const htmlString = $('#neighborhood-template').html(); // === innerHtml
  const object = neighborhood;
  const renderedHtml = Mustache.render(htmlString, object);
  console.log(renderedHtml);
  $('ul').append(renderedHtml);
});
