import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import CareerList from './components/Bio/careerList';

var careerRecords = [{
  id: '001',
  organization: 'Og 1',
  jobTitle: 'manager',
  achievement: 'enlarge market share',
  from: '2015-03',
  to: '2016-03'
}]

$().ready(function() {
  $.get("/api/node/1?_format=json", function(data) {
    console.log(data);
  })

  render(
    <CareerList records={careerRecords}/>,
    document.getElementById('careerBlock')
  );
})
