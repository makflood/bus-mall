'use stict';

// CREATE AN ARRAY OF ALL THE POSSIBLE IMAGES
var allImages = [
// 0
  new FocusImage('R2D2 bag', 'img/bag.jpg', 'bag-img'),
// 1
  new FocusImage('banana slicer', 'img/banana.jpg', 'banana-img'),
// 2
  new FocusImage('bathroom tablet holder', 'img/bathroom.jpg', 'bathroom-img'),
// 3
  new FocusImage('toeless boots', 'img/boots.jpg', 'boots-img'),
// 4
  new FocusImage('all-in-one breakfast machine', 'img/breakfast.jpg', 'breakfast-img'),
// 5
  new FocusImage('meatball bubblegum', 'img/bubblegum.jpg', 'bubblegum-img'),
// 6
  new FocusImage('inverted chair', 'img/chair.jpg', 'chair-img'),
// 7
  new FocusImage('chthlhu action figure', 'img/cthulhu.jpg', 'cthulhu-img'),
// 8
  new FocusImage('dog duck beak', 'img/dog-duck.jpg', 'dog-duck-img'),
// 9
  new FocusImage('dragon meat', 'img/dragon.jpg', 'dragon-img'),
// 10
  new FocusImage('utensil pen caps', 'img/pen.jpg', 'pen-img'),
// 11
  new FocusImage('pet footie sweepers', 'img/pet-sweep.jpg', 'pet-sweep-img'),
// 12
  new FocusImage('pizza scissors', 'img/scissors.jpg', 'scissors-img'),
// 13
  new FocusImage('shark sleeping bag', 'img/shark.jpg', 'shark-img'),
// 14
  new FocusImage('baby onesie sweeper', 'img/sweep.png', 'sweep-img'),
// 15
  new FocusImage('tauntaun sleeping bag', 'img/tauntaun.jpg', 'tauntaun-img'),
// 16
  new FocusImage('unicorn meat', 'img/unicorn.jpg', 'unicorn-img'),
// 17
  new FocusImage('tentacle usb', 'img/usb.gif', 'usb-img'),
// 18
  new FocusImage('self-watering can', 'img/water-can.jpg', 'water-can-img'),
// 19
  new FocusImage('closed-top wine glass', 'img/wine-glass.jpg', 'wine-glass-img'),
];

/**
creates an object for an image with the name, path, and id. adds to given array.
**/
function FocusImage(imageTitle, imagePath, imageId) {
  this.imageTitle = imageTitle;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.timesClick = 0;
  this.timesShow = 0;
}
/**
gets the percentage of times an image was clicked as a decimal. -1 if image was never shown
**/
FocusImage.prototype.getClickPercentage = function() {
  if (this.timesShow) {
    return this.timesClick/this.timesShow;
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
function randomImages(remainingImages, previousImages) {
  var chosenIndex;
  var chosenImages = [];
  var numToChoose = 3;
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
sticks the chosen images in a div to print. adds event listeners to each.
**/
function renderImages(chosenImages) {
  var imageBox = document.createElement('div');
  imageBox.id = 'app-images';
  var image;
  var printImage;
  for (var i = 0; i < chosenImages.length; i++) {
    printImage = chosenImages[i];
    image = document.createElement('img');
    image.src = printImage.imagePath; //display the image
    image.id = printImage.imageId;
    image.alt = printImage.imageTitle;
    printImage.timesShow++; //increment times shown
    image.addEventListener('click', handleImageClick);
    imageBox.appendChild(image);
  }
  return imageBox;
}

/**
handles a click on one of the set of images. gives another set if more rounds required, removes the listener if done.
**/
function handleImageClick(e) {
  var imageId = e.target.id;
  var imageObj;
  for (var i = 0; i < allImages.length; i++) {
    if (imageId === allImages[i].imageId) {
      imageObj = allImages[i];
      i = allImages.length;
    }
  }
  imageObj.timesClick++;
  if (currentRound < maxRound) {
    previousImages = randomImages(remainingImages, previousImages);
    appBox.removeChild(document.getElementById('app-images'));
    appBox.appendChild(renderImages(previousImages));
  } else {
    removeAllListeners();
    renderAllStatistics();
  }
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
renders the times clicked for every image in a chart printed in a canvas element and printed to the page
**/
function renderAllStatistics() {
  Chart.defaults.global.defaultFontColor = '#fff';
  Chart.defaults.global.defaultFontFamily = 'Gill Sans';

  appBox.appendChild(document.createElement('br'));

  var sortedImages = imagesSort(allImages);
  for (var i = 0; i < 5; i++) {
    renderPercentagePie(sortedImages[i]);
  }

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

  var pieData = {
    labels: ['Times Clicked', 'Times Not Clicked'],
    datasets: [
      {
        // label: 'Stuff',
        backgroundColor: ['#fff', 'transparent'],
        borderWidth: 0,
        data: [image.timesClick, image.timesShow - image.timesClick],
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
sorts the image array in decending order of percentage of times clicked
**/
function imagesSort(imageList) {
  var sortedImages = imageList.slice();
  var currentImage;
  var j;
  for (var i = 1; i < sortedImages.length; i++) {
    j = i;
    while (j > 0 && sortedImages[j - 1].getClickPercentage() < sortedImages[j].getClickPercentage()) {
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

var remainingImages = allImages.slice(); // copy to leave original alone

var previousImages = [];
var maxRound = 25;
var currentRound = 1;
var appBox = document.getElementById('app');

previousImages = randomImages(remainingImages, previousImages);
appBox.appendChild(renderImages(previousImages));
