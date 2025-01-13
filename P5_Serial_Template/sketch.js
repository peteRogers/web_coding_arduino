
function setup() {
  createCanvas(400, 400);
  connectArduino();
  background(255, 0, 0);
}

function draw() {
  background(255, 0,0);
  readArduino();
  print(arduinoVals);
  textSize(10);
  text(arduinoVals[0], width/2, height/2);
  showPortStatus();
}




