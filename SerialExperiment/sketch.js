
let  x = 0;
function setup() {
  createCanvas(400, 400);
  connectArduino();
  makeRainbow();
}

function draw() {
  colorMode(RGB);
  let color = get(mouseX, mouseY);
  sendDataToArduino(""+color[0]+">"+color[1]+">"+color[2]+"");
}

function makeRainbow(){
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB for easier hue control
  // Loop over the canvas width to create a horizontal gradient
  for (let x = 0; x < width; x++) {
    let hueValue = map(x, 0, width, 0, 360); // Map x position to hue range (0 to 360)
    stroke(hueValue, 100, 100); // Set color with full saturation and brightness
    line(x, 0, x, height); // Draw a vertical line with the current color
  }
}
