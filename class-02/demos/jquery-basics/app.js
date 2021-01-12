'use strict';

// Getting stuff with JQuery
// getters
// getters always return jquery objects, if you console.log them they look like S.fn.init(9)
// all jquery variables should be defined with a $. This is only for readability
const $h1Element = $('h1');
console.log($h1Element);
const vanillaH1Element = document.getElementsByTagName('H1')[0];
console.log(vanillaH1Element);

const h1Text = $h1Element.text(); // jquery get the text
const vanillaText = vanillaH1Element.textContent; // vanilla get the text
// .textContent(vanilla) is a property of DOM elements
// .text() (jQuery) is a method that has to go find the text

console.log(h1Text);

console.log($('p').text());

//jQuery Setters
// change things on the page(set their value to something)
$h1Element.text('OMG we changed the h1 with $.text(\'some text\')');

// .text() is BOTH a getter and a setter depending on if we pass it an argument


// .attr
// .attr(attribute), .attr(attribute, newValue)
console.log('Button id', $('button:first-of-type').attr('id'));
$('button:first-of-type').attr('id', 'Jquery Did this to me');


console.log($('body').html());
// vanilla : .innerHTML
// $('body').html('');

const doTheThing = event => console.log(event);

$('button').on('click', doTheThing);

/*
const button = document.getElementById('button1');
button.addEventListener('click', doTheThing);
*/
