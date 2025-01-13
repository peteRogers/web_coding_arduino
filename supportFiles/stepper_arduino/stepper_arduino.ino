#include <Unistep2.h>

Unistep2 stepper(8, 9, 10, 11, 4096, 800);


void setup(){
  Serial.begin(9600);
  
}

void loop(){
  // We need to call run() frequently during loop()
  stepper.run();
  if(Serial.available()){
    int in = Serial.readStringUntil('\n').toFloat();
   

     stepper.move( in-stepper.currentPosition());
     
  }
}
