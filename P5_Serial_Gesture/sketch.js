var prev = 0;
var currentImageIndex = 0;

let images = [];
let numImages = 10; // Number of images to load
let folderPath = "images/"; // Path to the folder containing the images
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
    currentImageIndex = currentImageIndex - 1;
    if(currentImageIndex < 0){
      currentImageIndex = 9;
    }
    resetImagePositionL()
    arduinoVals[0] = 0;
  }
  if (arduinoVals[0] == 2) {
    currentImageIndex += 1;
    if(currentImageIndex > 9){
      currentImageIndex = 0;
    }
    resetImagePositionR()
    arduinoVals[0] = 0;
  }
  //print(x);
  //image(images[x], 0, 0);
  if (images[currentImageIndex]) {
    imageX = lerp(imageX, targetX, 0.1); // Smooth animation using lerp
    image(
      images[currentImageIndex],
      imageX,
      imageY
    );
  }
}

function resetImagePositionL() {
  // Reset the image position and target
  if (images[currentImageIndex]) {
    imageX = -images[currentImageIndex].width; // Start off-screen to the left
    imageY = height / 2 - images[currentImageIndex].height / 2; // Center vertically
    targetX = width / 2 - images[currentImageIndex].width / 2; // Target is the center
  }
}

function resetImagePositionR() {
  // Reset the image position and target
  if (images[currentImageIndex]) {
    imageX = images[currentImageIndex].width; // Start off-screen to the left
    imageY = height / 2 - images[currentImageIndex].height / 2; // Center vertically
    targetX = width / 2 - images[currentImageIndex].width / 2; // Target is the center
  }
}




