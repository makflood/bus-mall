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
  console.log('starting remainingImages len', remainingImages.length);
  var chosenIndex;
  var chosenImages = [];
  for (var i = 0; i < 3; i++) {
    chosenIndex = randomIndex(remainingImages);
    chosenImages.push(remainingImages[chosenIndex]);
    remainingImages.splice(chosenIndex, 1); // removes chosen item
  }
  for (var j = 0; j < previousImages.length; j++) {
    remainingImages.push(previousImages[j]); // add back in the previous images
  }
  // remainingImages = remainingImages.concat(previousImages);
  console.log('after readding, remainingImages len',remainingImages.length);
  console.log('after readding, remainingImages',remainingImages);
  console.log('chosen imgs',chosenImages);
  return chosenImages;
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

  var previousImages = randomImages(allImages, []);
  console.log('round 1');
  previousImages = randomImages(allImages, previousImages);
  console.log('round 2');
  previousImages = randomImages(allImages, previousImages);
  console.log('round 3');
}

main();
