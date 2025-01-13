var prev = 0;
var x = 0;

let images = [];
let numImages = 10; // Number of images to load
let folderPath = "images/"; // Path to the folder containing the images
let currentImageIndex = 0; // Index of the current image to display
let imageX, imageY; // Position of the image
let targetX; // Target x position for animation
let animationSpeed = 5; // Pixels per frame

function setup() {
  createCanvas(400, 400);
  connectArduino();
  background(255, 0, 0);
  resetImagePositionL();
}


function preload() {
  // Loop through a sequence of filenames and load each image
  for (let i = 1; i <= numImages; i++) {
    let filename = folderPath + "image-" + i + ".jpg"; // Construct the filename
    images.push(loadImage(filename)); // Load the image and add it to the array
  }
}


function draw() {
 // background(255, 0, 0);
  readArduino();
  //print(arduinoVals);
  textSize(10);
  text(arduinoVals[0], width / 2, height / 2);
  showPortStatus();

  if (arduinoVals[0] == 1) {
    x = x - 1;
    if(x < 0){
      x = 9;
    }
    resetImagePositionL()
    arduinoVals[0] = 0;
  }
  if (arduinoVals[0] == 2) {
    x += 1;
    if(x > 9){
      x = 0;
    }
    resetImagePositionR()
    arduinoVals[0] = 0;
  }
  //print(x);
  //image(images[x], 0, 0);
  if (images[x]) {
    imageX = lerp(imageX, targetX, 0.1); // Smooth animation using lerp
    image(
      images[x],
      imageX,
      imageY
    );
  }
}

function resetImagePositionL() {
  // Reset the image position and target
  if (images[x]) {
    imageX = -images[x].width; // Start off-screen to the left
    imageY = height / 2 - images[x].height / 2; // Center vertically
    targetX = width / 2 - images[x].width / 2; // Target is the center
  }
}

function resetImagePositionR() {
  // Reset the image position and target
  if (images[x]) {
    imageX = images[x].width; // Start off-screen to the left
    imageY = height / 2 - images[x].height / 2; // Center vertically
    targetX = width / 2 - images[x].width / 2; // Target is the center
  }
}




