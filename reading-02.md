# jQuery, Events and the DOM

## what is jQuery?
jQuery is a javascript file that is included in webpages. it lets you find elements using CSS style selectorsand then do something with the elements using jQuery methods. for example:

__To find and elements using css selectors__

* a function called jQuery () lets you lets you find one or more elements in the page.
* It creates an object called jQuery which holds reference to those elements.
* The standard syntax/shorthand for jQuery is $(). In fact the syntax is more like this:

$('li.hot') where there is one parameter which is the css style selector inside the parenthesis. The selector finds all the <li> in the page with a class of hot and performs a function on them.

Here's a full example of what hat looks like:

$('li.hot').addClass('complete')

* The first section is the jQuery object: $('li.hot')
* The second section is the method: .addClass('Complete')

## We use jQuery because it makes coding so much easier

To check if a page is ready to be worked with we use jQuery's .ready () method to very is the page is ready for the code. The syntax for this is as follows:

$(document).ready(function(){
  // the script goes here
});

## Event() method.

* The .on() method is used to handle all events. It is used to inicate which event uou want to respond to. It adds an event listener to each element in the selection.

## Event Object
Every event handling function recieves and event object. Just like the JS event object, jQuery event objects has properties and methodsthat tells you more about the event that took place.

# Ways to include jQuery in the webpage

1. You can load jQuery from the Content Delivery Network (CDN). It protectswWeb applications by adding a CDN between users and your infrastructure. The content is spreadout across several servers instead of offloading them onto one large server.