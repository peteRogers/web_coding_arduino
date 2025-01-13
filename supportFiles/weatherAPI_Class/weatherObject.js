class WeatherGIF {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation,apparent_temperature,uv_index,uv_index_clear_sky&forecast_days=1`;
    
    // URLs of GIFs for different weather conditions
    this.coldGif = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTRrcXY0N3dnb2lpZXhnMXd2MW80Mm1kejRpaGp4eXd0b3hjdWw0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CkzYj5MTQtqE2Lqlrs/giphy.gif";
    this.warmGif = "https://media.giphy.com/media/MdwKgnnTwnjX03xzsN/giphy.gif?cid=ecf05e47njz8ovwz6sch1muuc0usnhsu3fzzgpaf1aex41pf&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    this.rainGif = "https://media.giphy.com/media/DD4FroTT30PeSamZbG/giphy.gif?cid=790b76111rv8nf0878rz7kq7xpwjp7rcu5v1n8s1w9plasvd&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    this.noDataGif = "https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif?cid=790b7611ccdcppzkge5uvwcakzlgflofymmgxc2iktijx3u5&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    
    this.weatherData = null;
    this.dataReceived = false;
    this.img = null; // Property to hold the loaded image object
  }

  // Load the weather data from the API
  async loadWeatherData() {
    try {
      const response = await fetch(this.apiURL);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      this.weatherData = await response.json();
      this.dataReceived = true;
      console.log("Weather data loaded:", this.weatherData);
      
      // Load the appropriate GIF image based on weather conditions
      this.loadGIFImage();
    } catch (error) {
      console.error(error);
      this.dataReceived = false;
      this.loadImage(this.noDataGif); // Load no data GIF in case of an error
    }
  }

  // Determine the appropriate GIF URL based on weather conditions
  getWeatherGIFURL() {
    if (!this.dataReceived || !this.weatherData) {
      return this.noDataGif;
    }

    const temp = this.weatherData.hourly.apparent_temperature[0];
    
    let rain = this.weatherData.hourly.precipitation.some(num => num > 0);

    if (rain > 0) {
      return this.rainGif;
    } else if (temp < 10) {
      return this.coldGif;
    } else if (temp >= 10) {
      return this.warmGif;
    }
    return this.noDataGif;
  }

  // Load the selected GIF image and assign it to this.img
  loadGIFImage() {
    const gifURL = this.getWeatherGIFURL();
    loadImage(gifURL, (img) => {
      this.img = img; // Set the loaded image to this.img
    });
  }

  // Display the GIF image on the canvas
  display() {
    if (this.img) {
      image(this.img, 0, 0, width, height); // Display the loaded image if available
    }
  }
}