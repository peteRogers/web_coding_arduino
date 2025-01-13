let faceMesh;
let video;
let faces = [];


function preload() {
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(220);
  image(video, 0, 0);
  if(faces.length > 0){
    //this gets the 
    let fx = faces[0].box.xMin+(faces[0].box.width/2)
    circle(fx, height/2, 20, 20);
  }
}

function gotFaces(results) {
  faces = results;
}