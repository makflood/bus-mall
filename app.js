'use stict';

/**
creates an object for a image with the name, path, and id. adds to given array.
**/
function FocusImage(imageTitle, imagePath, imageId, imageArray) {
  this.imageTitle = imageTitle;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.timesClick = 0;
  this.timesShow = 0;
  imageArray.push(this);
}

FocusImage.prototype.render = function() {

};

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

function renderImages(chosenImages) {
  var div = document.createElement('div');
  var image;
  for (var i = 0; i < chosenImages.length; i++) {
    image = document.createElement('img');
    image.src = chosenImages[i].imagePath;
    div.appendChild(image);
  }
  return div;
}

/**
checks that no images have been lost in the randomization process
**/
function testImageArrays(originalImgs, remainingImgs, previousImgs) {
  var allImgs = remainingImgs.concat(previousImgs);
  for (var i = 0; i < allImgs.length; i++) {
    allImgs[i] = allImgs[i].imageId;
  }
  allImgs.sort();
  for (i = 0; i < allImgs.length; i++) {
    if (allImgs[i] != originalImgs[i]) {
      console.log('ERROR!');
    }
  }
}

/**
MAIN APPLICATION
**/
function main() {
  // CREATE AN ARRAY OF ALL THE POSSIBLE IMAGES
  var allImages = [];
  // 0
  new FocusImage('R2D2 bag', 'img/bag.jpg', 'bag-img', allImages);
  // 1
  new FocusImage('banana slicer', 'img/banana.jpg', 'banana-img', allImages);
  // 2
  new FocusImage('bathroom tablet holder', 'img/bathroom.jpg', 'bathroom-img', allImages);
  // 3
  new FocusImage('toeless boots', 'img/boots.jpg', 'boots-img', allImages);
  // 4
  new FocusImage('all-in-one breakfast machine', 'img/breakfast.jpg', 'breakfast-img', allImages);
  // 5
  new FocusImage('meatball bubblegum', 'img/bubblegum.jpg', 'bubblegum-img', allImages);
  // 6
  new FocusImage('inverted chair', 'img/chair.jpg', 'chair-img', allImages);
  // 7
  new FocusImage('chthlhu action figure', 'img/cthulhu.jpg', 'cthulhu-img', allImages);
  // 8
  new FocusImage('dog duck beak', 'img/dog-duck.jpg', 'dog-duck-img', allImages);
  // 9
  new FocusImage('dragon meat', 'img/dragon.jpg', 'dragon-img', allImages);
  // 10
  new FocusImage('utensil pen caps', 'img/pen.jpg', 'pen-img', allImages);
  // 11
  new FocusImage('pet footie sweepers', 'img/pet-sweep.jpg', 'pet-sweep-img', allImages);
  // 12
  new FocusImage('pizza scissors', 'img/scissors.jpg', 'scissors-img', allImages);
  // 13
  new FocusImage('shark sleeping bag', 'img/shark.jpg', 'shark-img', allImages);
  // 14
  new FocusImage('baby onesie sweeper', 'img/sweep.png', 'sweep-img', allImages);
  // 15
  new FocusImage('tauntaun sleeping bag', 'img/tauntaun.jpg', 'tauntaun-img', allImages);
  // 16
  new FocusImage('unicorn meat', 'img/unicorn.jpg', 'unicorn-img', allImages);
  // 17
  new FocusImage('tentacle usb', 'img/usb.gif', 'usb-img', allImages);
  // 18
  new FocusImage('self-watering can', 'img/water-can.jpg', 'water-can-img', allImages);
  // 1
  new FocusImage('closed-top wine glass', 'img/wine-glass.jpg', 'wine-glass-img', allImages);

  var originalImages = allImages.slice(); // copy for testing
  for (var i = 0; i < originalImages.length; i++) {
    originalImages[i] = originalImages[i].imageId;
  }
  originalImages.sort();

  var previousImages = [];
  var numRounds = 25;
  var imageBox = document.getElementById('app');
  for (var round = 0; round < numRounds; round++) {
    console.log('round', round);
    previousImages = randomImages(allImages, previousImages);
    imageBox.appendChild(renderImages(previousImages));
    testImageArrays(originalImages,allImages,previousImages);
  }

}

main();
