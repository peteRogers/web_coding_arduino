let connectBtn;
let port;
let arduinoVals = [];
let totalSendMotor;
let presend = 0;



function connectArduino(){
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }else{
    connectBtn = createButton('Connect to Arduino');
    connectBtn.position(80, 200);
    connectBtn.mousePressed(connectBtnClick);
  }
}

function parseStringToIntArray(str) {
  // Remove any non-numeric characters except ">" and split by ">"
  return str
    .trim()                // Remove any leading or trailing whitespace/newline
    .split(">")            // Split the string at each ">"
    .filter(num => num)    // Remove any empty strings from the array
    .map(num => parseInt(num, 10)); // Convert each string to an integer
}

function sendColor(coll){
  let sender = ""+round(red(coll))+">"+round(green(coll))+">"+round(blue(coll))+"";
  print(sender);
  sendDataToArduino(sender);
}

function readArduino(){
  let inString = port.readUntil("\n");
  //port.clear(); not necessary on uno
  if(inString != ""){
    let vals = parseStringToIntArray(inString);
    arduinoVals = vals;
  }
}

function readTick(){
  let inString = port.readUntil("\n").trim();
  if(inString == "f"){
    sendDataToArduino(totalSendMotor);
    totalSendMotor = 0;
  }
}

function sendPos(pos){
  // let inString = port.readUntil("\n").trim();
  // if(inString == "f"){
   
   
  // }
  sendDataToArduino(pos);
}

function calculateMotor(newPos){
  let diff = newPos-presend;
  print(diff);
  presend = newPos;
  totalSendMotor += diff;
 
}



function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function sendDataToArduino(message){
  port.write(String(message));
  port.write("\n");

}


