import 'babel-polyfill';
import cats from './cats';
import $ from 'jquery';
import React, { Component } from 'react';

console.log(React);

$('<h1>Cats</h1>').appendTo('#target');
const ul = $('<ul>').appendTo('#target');
for ( const cat of cats ) {
  $('<li>').text(cat).appendTo(ul);
}
