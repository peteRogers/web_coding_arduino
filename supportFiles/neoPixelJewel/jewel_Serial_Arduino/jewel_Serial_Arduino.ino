#include <Adafruit_NeoPixel.h>


int red = 0;
int green = 0;
int blue = 0;
int white = 0;

//data on pin 8
Adafruit_NeoPixel jewel = Adafruit_NeoPixel(7, 8, NEO_GRBW + NEO_KHZ800);

void setup() {
  Serial.begin(9600);
  jewel.begin();
}

void loop() {
  if(Serial.available()){
      String input = Serial.readStringUntil('\n');
      red = getValue(input, '>', 0).toInt();
      green = getValue(input, '>', 1).toInt();
      blue = getValue(input, '>', 2).toInt();
      for(int i = 1; i < 7; i++){
        jewel.setPixelColor(i, red, green, blue, white);
        jewel.show();
      }
  }
}



String getValue(String data, char separator, int index){
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;
    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
