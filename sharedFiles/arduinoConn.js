let connectBtn;
let port;

function connectArduino(){
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
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

function readArduinoVals(){
  let inString = port.readUntil("\n");
  port.clear();
  let vals = parseStringToIntArray(inString);
  return vals;
}

function readArduinoVal(){
  let inString = port.readUntil("\n");
  port.clear();
  let val = parseStringToIntArray(inString);
  return val[0];
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



// function sendBtnClick() {
//   port.write("Hello from p5.js\n");
// }