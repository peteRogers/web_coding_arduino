let faceMesh;
let video;
let faces = [];

function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  connectArduino();
}

function draw() {
  background(220);
  image(video, 0, 0);
  if(faces.length > 0){
    let fx = faces[0].box.xMin+(faces[0].box.width/2)
    circle(fx, height/2, 20, 20);
    let facePos = map(fx, 0, width, 0, 2048);
    sendDataToArduino(facePos);
  }
}

function gotFaces(results) {
  faces = results;
}