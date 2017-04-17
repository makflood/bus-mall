'use stict';

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

function randomIndex(imageArray) {
  return Math.floor(Math.random() * imageArray.length);
}

function randomImage(imageArray) {
  var chosenIndex;
  var chosenImages = [];
  for (var i = 0; i < 3; i++) {
    chosenIndex = randomIndex(imageArray);
    console.log(chosenIndex);
    chosenImages.push(imageArray[chosenIndex]);
  }
  console.log(chosenImages);
}

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

randomImage(allImages);
