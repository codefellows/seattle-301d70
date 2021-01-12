'use strict';

// const $dogClone = $('li').clone()[0]; // get all the li, take the first
// console.log($dogClone);
// $('ul').append($dogClone);

// const $dogClone2 = $('li:first-child').clone(); // only get the first li
// $('ul').append($dogClone2);

function Dog (name, url, hobby){
  this.name = name;
  this.image_url = url;
  this.hobbies = hobby;
}

Dog.prototype.render = function(){
  const $dogClone2 = $('li:first-child').clone(); // only get the first li
  // Goal: target the h2 of the cloned li
  // getter method .find();
  // `.find()` === `$()` except it only looks inside the object we call it on
  const $h2 = $dogClone2.find('h2');
  $h2.text(this.name);

  const $img = $dogClone2.find('img');
  $img.attr('src', this.image_url);
  $img.attr('alt', this.hobbies);

  $dogClone2.find('p').text(this.hobbies);

  $('ul').append($dogClone2);
};

// const odie = new Dog('Odie', '/ginger.JPG', 'Annoying Garfield');
// const lassie = new Dog('Lassie', '/ginger.JPG', 'Saving Jimmy from the well');

// odie.render();
// lassie.render();
// vanilla put on page: .append or .appendChild


// Retrieving from an outside source Copy Me::
// $.ajax('/data.json').then(stuffThatComesBack => {
//   console.log(stuffThatComesBack);
// });

$.ajax('/data.json').then(stuffThatComesBack => {
  console.log(stuffThatComesBack);

  // Code that needs the stuff from the other file belongs here

  // take the stuff that came back and put it through my constructor and then render it all

  const dogs = [];
  stuffThatComesBack.forEach( (dog ) => {
    dogs.push(new Dog(dog.name, dog.image_url, dog.hobbies));
  });
  console.log(dogs);

  dogs.forEach(dog => {
    dog.render();
    dog.render();
    dog.render();
    dog.render();
    dog.render();
    dog.render();
    dog.render();
  });
});


// Clicking and 'filtering'
$('button').on('click', () => { // In today's lab you need to filter only the images with the specific keyword
  //goal is to only show The Clifford li

  // get rid of the other ones
  // iterate and check if the name is clifford
  // if the name is clifford : render

  // OR

  // target all the list items and hide them
  // target the one with an h2 with text of 'clifford' and show it
  $('li').hide();
  $('li:contains(Clifford)').show();

});

