let jakartaWeather = new WeatherGIF("-6.1818", "106.8223");
let londonWeather = new WeatherGIF("51.5085", "-0.1257");
let washingtonWeather = new WeatherGIF("33.4484", "-112.074");

function setup() {
  createCanvas(windowWidth, windowHeight);
  jakartaWeather.loadWeatherData();
  londonWeather.loadWeatherData();
  washingtonWeather.loadWeatherData();
}

function draw() {
  background(220);
  if(jakartaWeather.img){
    image(jakartaWeather.img, 0, 0, width/3, width/3);
    text("Jakarta", 10, 20);
  }
  if(londonWeather.img){
    image(londonWeather.img, width/3 , 0, width/3, width/3);
    text("London", 10+(width/3), 20);
  }
  if(washingtonWeather.img){
    image(washingtonWeather.img, (width/3)*2, 0,width/3, width/3);
     text("Phoenix", 10+(width/3)*2, 20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}