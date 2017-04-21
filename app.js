'use stict';

// CREATE AN ARRAY OF ALL THE POSSIBLE IMAGES
var allImages = [];

try {

  allImages = JSON.parse(localStorage.allImages);

} catch(error) {

  // 0
  new FocusImage('R2D2 bag', 'img/bag.jpg');
  // 1
  new FocusImage('banana slicer', 'img/banana.jpg');
  // 2
  new FocusImage('bathroom tablet holder', 'img/bathroom.jpg');
  // 3
  new FocusImage('toeless boots', 'img/boots.jpg', '3');
  // 4
  new FocusImage('all-in-one breakfast machine', 'img/breakfast.jpg');
  // 5
  new FocusImage('meatball bubblegum', 'img/bubblegum.jpg');
  // 6
  new FocusImage('inverted chair', 'img/chair.jpg');
  // 7
  new FocusImage('chthlhu action figure', 'img/cthulhu.jpg');
  // 8
  new FocusImage('dog duck beak', 'img/dog-duck.jpg');
  // 9
  new FocusImage('dragon meat', 'img/dragon.jpg');
  // 10
  new FocusImage('utensil pen caps', 'img/pen.jpg');
  // 11
  new FocusImage('pet footie sweepers', 'img/pet-sweep.jpg');
  // 12
  new FocusImage('pizza scissors', 'img/scissors.jpg');
  // 13
  new FocusImage('shark sleeping bag', 'img/shark.jpg');
  // 14
  new FocusImage('baby onesie sweeper', 'img/sweep.png');
  // 15
  new FocusImage('tauntaun sleeping bag', 'img/tauntaun.jpg');
  // 16
  new FocusImage('unicorn meat', 'img/unicorn.jpg');
  // 17
  new FocusImage('tentacle usb', 'img/usb.gif');
  // 18
  new FocusImage('self-watering can', 'img/water-can.jpg');
  // 19
  new FocusImage('closed-top wine glass', 'img/wine-glass.jpg');

}

var remainingImages = allImages.slice(); // copy to leave original alone

var previousImages = [];
var maxRound = 25;
var currentRound = 1;
var numToChoose = 3;
var appBox = document.getElementById('app');

/**
creates an object for an image with the name, path, and id. adds to given array.
**/
function FocusImage(imageTitle, imagePath) {
  this.imageTitle = imageTitle;
  this.imagePath = imagePath;
  this.imageIndex = allImages.length;
  this.timesClick = 0;
  this.timesShow = 0;
  allImages.push(this);
}

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
chooses a random index from an array
**/
function randomIndex(imageArray) {
  return Math.floor(Math.random() * imageArray.length);
}

/**
picks 3 images and returns them, no duplicates. ignores images from the previous round.
**/
function getRandomImages(remainingImages, previousImages) {
  var chosenIndex;
  var chosenImages = [];
  for (var i = 0; i < numToChoose; i++) {
    chosenIndex = randomIndex(remainingImages);
    chosenImages.push(remainingImages[chosenIndex]);
    remainingImages.splice(chosenIndex, 1); // removes chosen item
  }
  for (var j = 0; j < previousImages.length; j++) {
    remainingImages.push(previousImages[j]); // add back in the previous images
  }
  return chosenImages;
}

/**
creates the div to put the images in and the image elements themselves
**/
function attachImageBoxes() {
  var imageBox = document.createElement('div');
  imageBox.id = 'app-images';
  var imageElement;
  for (var i = 0; i < numToChoose; i++) {
    imageElement = document.createElement('img');
    imageElement.addEventListener('click', handleImageClick);
    imageBox.appendChild(imageElement);
  }
  var numRoundsElement = document.createElement('p');
  numRoundsElement.id = 'round-number';
  numRoundsElement.textContent = maxRound;
  imageBox.appendChild(numRoundsElement);
  return imageBox;
}

/**
sticks the chosen images in a div to print. adds event listeners to each.
**/
function renderImages(chosenImages) {
  var imageElements = document.querySelectorAll('#app-images img');
  var image;
  var printImage;
  for (var i = 0; i < chosenImages.length; i++) {
    printImage = chosenImages[i];
    image = imageElements[i];
    image.src = printImage.imagePath; //display the image
    image.id = printImage.imageIndex;
    image.alt = printImage.imageTitle;
    printImage.timesShow++; //increment times shown
  }
}

/**
handles a click on one of the set of images. gives another set if more rounds required, removes the listener if done.
**/
function handleImageClick(e) {
  var imageIndex = e.target.id;
  var imageObj = allImages[imageIndex];
  imageObj.timesClick++;
  if (currentRound < maxRound) {
    previousImages = getRandomImages(remainingImages, previousImages);
    renderImages(previousImages);
  } else {
    removeAllListeners();
    renderAllStatistics();
    renderMiscFinalElements();
    document.getElementById('round-number').style.transform = 'translateX(-30px)';
  }
  try {
    localStorage.allImages = JSON.stringify(allImages);
  } catch(error) {
    console.log('Something went wrong:', error);
  }
  document.getElementById('round-number').textContent = maxRound - currentRound;
  currentRound++;
}

/**
removes the click event listeners from all the images
**/
function removeAllListeners() {
  var imageElements = document.querySelectorAll('#app-images img');
  for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].removeEventListener('click', handleImageClick);
  }
}

/**
edits the page to display a thanks message, grey out the images, and add a button to the bottom of the page
**/
function renderMiscFinalElements() {
  var greeting = document.querySelector('#app h2');
  greeting.textContent = 'Thank you for participating!';

  var imageElements = document.querySelectorAll('#app-images img');
  for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].style.opacity = '0.7';
    imageElements[i].style.transition = '500ms';
  }

  var link = document.createElement('a');
  link.href = 'report.html';
  var button = document.createElement('button');
  button.textContent = 'View as Table';
  link.appendChild(button);
  appBox.appendChild(link);
}

/**
renders the times clicked for every image in a chart printed in a canvas element and printed to the page
**/
function renderAllStatistics() {
  Chart.defaults.global.defaultFontColor = '#fff';
  Chart.defaults.global.defaultFontFamily = 'Gill Sans';

  var heading = document.createElement('h2');
  heading.textContent = 'Top 5 Products';
  heading.className = 'chart-heading';
  appBox.appendChild(heading);


  var sortedImages = sortImages(allImages);
  for (var pie = 0; pie < 5; pie++) {
    renderPercentagePie(sortedImages[pie]);
  }

  heading = document.createElement('h2');
  heading.textContent = 'All Products';
  heading.className = 'chart-heading';
  appBox.appendChild(heading);

  var barCanvas = document.createElement('canvas');
  barCanvas.width = '500';
  barCanvas.height = '300';
  barCanvas.id = 'all-data-chart';

  appBox.appendChild(barCanvas);
  var ctx = barCanvas.getContext('2d');

  var imageLabels = [];
  var imageDataClick = [];
  var imageDataShow = [];
  var imageDataClickColors = [];
  var imageDataShowColors = [];
  var hue;
  for (var i = 0; i < sortedImages.length; i++) {
    imageLabels.push(sortedImages[i].imageTitle);
    imageDataClick.push(sortedImages[i].timesClick);
    imageDataShow.push(sortedImages[i].timesShow);
    hue = 360 / sortedImages.length * i;
    imageDataClickColors.push('hsl('+ hue +', 100%, 50%)');
    imageDataShowColors.push('hsl('+ hue +', 30%, 50%)');
  }
  var data = {
    labels: imageLabels,
    datasets: [
      {
        label: 'Times Clicked',
        backgroundColor: imageDataClickColors,
        data: imageDataClick,
      },
      {
        label: 'Times Shown',
        backgroundColor: imageDataShowColors,
        data: imageDataShow,
      }
    ],
  };
  new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
  });
}

/**
generates a pie chart for the given image to show percentage of clicks
**/
function renderPercentagePie(image) {
  var pieBox = document.createElement('div');
  pieBox.className = 'percentage-pie';

  var pieCanvas = document.createElement('canvas');
  pieCanvas.width = '300';
  pieCanvas.height = '300';

  pieBox.appendChild(pieCanvas);
  appBox.appendChild(pieBox);
  var ctx = pieCanvas.getContext('2d');

  var clickPercent = (getClickPercentage(image) * 100).toFixed(2);

  var pieData = {
    labels: ['Clicked %', 'Not Clicked %'],
    datasets: [
      {
        backgroundColor: ['#fff', 'transparent'],
        borderWidth: 0.5,
        borderColor: '#444',
        data: [clickPercent, 100 - clickPercent],
      },
    ],
  };
  new Chart(ctx, {
    type: 'doughnut',
    data: pieData,
    options: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        position: 'bottom',
        text: image.imageTitle,
        fontSize: 20,
        fontStyle: 'normal',
      },
    }
  });
}

/**
sorts the image array in decending order of percentage of times clicked (insertion sort)
**/
function sortImages(imageList) {
  var sortedImages = imageList.slice();
  var currentImage;
  var j;
  for (var i = 1; i < sortedImages.length; i++) {
    j = i;
    while (j > 0 && getClickPercentage(sortedImages[j - 1]) < getClickPercentage(sortedImages[j])) {
      currentImage = sortedImages.splice(j, 1);
      sortedImages.splice(j - 1, 0, currentImage[0]);
      j--;
    }
  }
  return sortedImages;
}

/**
MAIN APPLICATION
**/
appBox.appendChild(attachImageBoxes());

previousImages = getRandomImages(remainingImages, previousImages);
renderImages(previousImages);
