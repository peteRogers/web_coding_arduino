let connectBtn;
let port;
let arduinoVals = [];

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

function readArduino(){
  let inString = port.readUntil("\n");
  //port.clear(); not necessary on uno
  if(inString != ""){
    let vals = parseStringToIntArray(inString);
    arduinoVals = vals;
  }
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
