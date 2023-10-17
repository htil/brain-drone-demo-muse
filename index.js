const express = require("express");
const app = express();
var server = require("http").createServer(app);
const keypress = require("keypress");
const tello = require("./2023-tello.js");
const readline = require("readline");

var socket = null;
var port = 8888;

// Server
server.on("error", function (e) {
  console.log(e);
});

var Server = function (browserPort) {
  this.io = require("socket.io")(server);
  this.io.on("connection", this.handleConnection);
  app.use(express.static(__dirname));
  server.listen(browserPort, function () {
    console.log("Server listening at port %d", browserPort);
  });
};

let height = 120; //cm
let heightMaxThreshold = 400;
let heightMinThreshold = 10;

Server.prototype.handleConnection = function (sock) {
  socket = sock;

  socket.on("error", () => {});
  socket.on("up", (distance) => {
    if (height < heightMaxThreshold) {
      console.log("up", distance, height);
      tello.up(distance);
      height = height + distance;
    } else {
      socket.emit("maxReached", height);
      console.log("Height Max Reached");
    }
  });
  socket.on("down", (distance) => {
    if (height > heightMinThreshold) {
      console.log("down", distance, height);
      tello.down(distance);
      height = height - distance;
    } else {
      socket.emit("minReached", height);
      console.log("Height Min Reached");
    }
  });

  socket.on("land", () => {
    console.log("land");
    tello.land();
  });
  socket.on("takeoff", () => {
    console.log("takeoff");
    height = 120;
    tello.takeoff();
  });

  /*
  socket.on("power", (msg) => {
    power = msg;
    console.log(msg);
  });*/
};

Server.prototype.init = () => {
  console.log("Server initialized!");
};

/*
Server.prototype.sendClientMsg = (id, msg) => {
  if (socket) {
    socket.emit(id, { msg: msg });
  }
};
*/

let tookoff = false;

/*
function moveDrone(){
	let distance = 30;
	let threshold = 0.2;
	let drone_speed = Math.floor(70 * engagement + 30);
	if(engagement > threshold) {

		if(tookoff == false) {
			tookoff = true;
			console.log('Taking off');
			tello.takeoff();
			setTimeout(moveDrone, 5000);
			return;
		}

		console.log('Moving drone ' + distance + ' cm at ' + drone_speed + ' cm/s given engagement ' + Math.round(engagement * 100) / 100)
		tello.speed(drone_speed);
		tello.forward(distance);

		setTimeout(moveDrone, distance/drone_speed * 1000 + 200);
	} else {
		console.log('Engagement (' + Math.round(engagement * 100) / 100 + ') not past threshold of ' + threshold);

		setTimeout(moveDrone, 200);
	}
}*/

server = new Server(port);
server.init();
//tello.init();
//tello.battery();
//setTimeout(() => tello.takeoff(), 3000);
//setTimeout(() => tello.land(), 3000);

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Press enter to start ", (answer) => {
  //moveDrone();
  tello.takeoff();
  //setTimeout(() => tello.land(), 3000);
  rl.close();
});
*/
