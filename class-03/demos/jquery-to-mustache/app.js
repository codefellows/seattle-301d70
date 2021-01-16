'use strict';

const dogs = [];

function Dog (name, url, hobby){
  this.name = name;
  this.image_url = url;
  this.hobbies = hobby;
}

// Dog.prototype.render = function(){
//   const $dogClone2 = $('li:first-child').clone();

//   const $h2 = $dogClone2.find('h2');
//   $h2.text(this.name);

//   const $img = $dogClone2.find('img');
//   $img.attr('src', this.image_url);
//   $img.attr('alt', this.hobbies);

//   $dogClone2.find('p').text(this.hobbies);

//   $('ul').append($dogClone2);
// };

Dog.prototype.render = function(){
  const htmlTemplateString = $('#dog-template').html();
  const object = this;

  const renderedHtml = Mustache.render(htmlTemplateString, object);
  $('ul').append(renderedHtml);
};


$.ajax('/data.json').then(stuffThatComesBack => {
  console.log(stuffThatComesBack);

  stuffThatComesBack.forEach( (dog ) => {
    dogs.push(new Dog(dog.name, dog.image_url, dog.hobbies));
  });
  console.log(dogs);

  dogs.forEach(dog => {
    dog.render();
  });


  // Pretend a button click happened
  dogs.sort((left, right) => {
    if (left.hobbies.length > right.hobbies.length) {
      return 1;
    } else if (left.hobbies.length < right.hobbies.length) {
      return -1;
    } else {
      return 0;
    }
  });
  $('li').remove();
  dogs.forEach(dog => dog.render());
});


// Clicking and 'filtering'
$('button').on('click', () => {
  $('li').hide();
  $('li:contains(Clifford)').show();

});


