'use strict';

var recommendPercent = 20;

var allImages = [];

try {
  allImages = JSON.parse(localStorage.allImages);
} catch(error) {
  console.log(error);
}

var table = document.getElementById('report-table');

if (allImages.length === 0) {
  var warning = document.createElement('h2');
  warning.textContent = 'There is no data to display...';
  table.appendChild(warning);
} else {
  for (var i = 0; i < allImages.length; i++) {
    table.appendChild(renderImageDataRow(allImages[i]));
  }
}

var appBox = document.getElementById('app');

var link = document.createElement('a');
link.href = 'index.html';
var button = document.createElement('button');
button.textContent = 'Return to Survey';
link.appendChild(button);
appBox.appendChild(link);

/**
gets the percentage of times an image was clicked as a decimal. -1 if image was never shown
**/
function getClickPercentage(image) {
  if (image.timesShow) {
    return image.timesClick/image.timesShow;
  } else {
    return -1;
  }
}

/**
returns a row element with the data for a specific image
**/
function renderImageDataRow(image) {
  var dataRow = document.createElement('tr');

  var nameCell = document.createElement('td');
  nameCell.textContent = image.imageTitle;
  dataRow.appendChild(nameCell);

  var dataCell = document.createElement('td');
  dataCell.textContent = image.timesShow;
  dataRow.appendChild(dataCell);

  dataCell = document.createElement('td');
  dataCell.textContent = image.timesClick;
  dataRow.appendChild(dataCell);

  dataCell = document.createElement('td');
  var percentage = (getClickPercentage(image) * 100).toFixed(2);
  if (percentage < 0) {
    dataCell.textContent = '---';
  } else {
    dataCell.textContent = percentage + '%';
  }
  dataRow.appendChild(dataCell);

  dataCell = document.createElement('td');
  if (percentage < 0) {
    dataCell.textContent = '---';
  } else if (percentage < recommendPercent) {
    dataCell.textContent = 'NO';
    dataCell.style.color = '#c90202';
    nameCell.style.color = '#c90202';
  } else {
    dataCell.textContent = 'YES';
    dataCell.style.color = '#2EE600';
    nameCell.style.color = '#2EE600';
  }
  dataRow.appendChild(dataCell);

  return dataRow;
}
