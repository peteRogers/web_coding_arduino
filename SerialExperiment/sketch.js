let inVal;

function setup() {
  createCanvas(400, 400);
  background(220);
  connectArduino();
}

function draw() {
  background(255);
  inVal = readArduinoVal();
  circle(width/2, height/2, inVal);
}