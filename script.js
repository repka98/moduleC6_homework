const wsUri = "wss://echo-ws-service.herokuapp.com";

const out_msg = document.getElementById("msg");
const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnGEO = document.querySelector('.j-btn-GEO')

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

function write_Link_To_Screen() {
  var a = document.createElement('a');
  var linkText = document.createTextNode("ГЕО");
  a.appendChild(linkText);
  a.title = "ГЕО";
  a.href = "https://www.openstreetmap.org/";
  output.appendChild(a);
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  
  const message = out_msg.value;
 
  
  websocket.onopen = function(evt) {
    writeToScreen("SENT: " + message);
     websocket.send(message);
  };

  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnGEO.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  
  websocket.onopen = function(evt) {
    write_Link_To_Screen();
  };
});
