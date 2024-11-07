

function setup() {
  createCanvas(400, 400);
  background(220);
  connectArduino();
}

function draw() {
  background(255);
  readArduino();
  circle(width/2, height/2, arduinoVals[0]);
}