var osc = require("osc");

var WebSocket = require("ws");

var express = require("express");

var portWsToListen = 3002;

var getIPAddresses = function(){

  var os = require("os"),
  
  interfaces = os.networkInterfaces(),
  
  ipAddresses = [];

  for(var deviceName in interfaces){

    var addresses = interfaces[deviceName];

    for(var i = 0; i < addresses.length; i++){
    
        var addressInfo = addresses[i];

        if(addressInfo.family === "IPv4" && !addressInfo.internal){ ipAddresses.push(addressInfo.address); }

    }

  }

  return ipAddresses;
}

var udp = new osc.UDPPort({localAddress: "127.0.0.1", localPort: 12345 });


udp.on("ready", function () {

  var ipAddresses = getIPAddresses();
  
  ipAddresses.forEach(function(address){ console.log(" Host:", address + ", Port:", udp.options.localPort); });

  console.log("Receiver is ready. WS port: "+portWsToListen);

});

udp.on("message", function (message, timetag, info) { console.log(message); });


udp.on("error", function(err){ console.log(err); });

udp.open();

var appResources = __dirname + "/webReceiver";

var jsonResource = __dirname+"/json";

var privateResource = __dirname+"/private";

var app = express();

var server = app.listen(portWsToListen);

wss = new WebSocket.Server({ server: server });

app.use("/", express.static(appResources));

app.use("/", express.static(jsonResource));

app.use("/", express.static(privateResource));

app.use(express.static('json'));

wss.on("connection", function(socket){

  console.log("We have a web socket connection established");

  var socketPort = new osc.WebSocketPort({ socket:socket });

  var relay = new osc.Relay(udp, socketPort, {raw: true });

});
