var prev = 0;
var x = 200;
function setup() {
  createCanvas(400, 400);
  connectArduino();
  background(255, 0, 0);
}

function draw() {
  background(255, 0, 0);
  readArduino();
  print(arduinoVals);
  textSize(10);
  text(arduinoVals[0], width / 2, height / 2);
  showPortStatus();

  if (arduinoVals[0] == 1) {
    x = x - 10;
    arduinoVals[0] = 0;
  }
  if (arduinoVals[0] == 2) {
    arduinoVals[0] = 0;
  }

  rect(x, height / 2, 30, 30);
}




