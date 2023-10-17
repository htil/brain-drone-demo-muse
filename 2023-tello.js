//import dgram from 'node:dgram';
//import { Buffer } from 'node:buffer';
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

class Tello {
    constructor() {
        this.io_port = 8889
        this.state_port = 8890
        this.host = "192.168.10.1";
        this.server = dgram.createSocket('udp4');
        this.state_info = dgram.createSocket('udp4');
        this.state_info.bind(this.state_port)
        this.server.bind(9000)
        this.server.on("message", this._on_message)
        this.state_info.on("message", this._on_state)
    }

    _on_state(msg, info) {
      console.log(msg, info)
    }

    _on_message(msg, info){
        console.log(msg)
        console.log(info)
        console.log(
            "Received %d bytes from %s:%d\n",
            msg.length,
            info.address,
            info.port
        );
    }       

    send_message(message_text) {
        let message = Buffer.from(message_text); 
        this.server.send(message, 0, message.length, this.io_port, this.host, function (err, bytes) {
            if (err) throw err;
        }); 
    }

    takeoff() {
        console.log("takeoff")
        this.send_message("command")
        this.send_message("takeoff")
    }

    land() {
        console.log("land")
        this.send_message("command")
        setTimeout(() => this.send_message("land"), 1000)
    }
}

const tello = new Tello()
module.exports.takeoff = () => tello.takeoff();
module.exports.land = () => tello.land();
module.exports.up = (value) => tello.send_message("up " + value);
module.exports.down = (value) => tello.send_message("down " + value);

/*
setTimeout(() => {
  tello.send_message("command")
  console.log("Requesting batter info.")
  tello.send_message("battery?")
}, 9000);
*/




// Take off and land immediately
//setTimeout(tello.takeoff.bind(tello), 3000)
//setTimeout(tello.land.bind(tello), 6000)



/*

function sendMessage(message_text) {
  let message = new Buffer(message_text);
  let port = 8889;
  let host = "192.168.10.1";

  server.send(message, 0, message.length, port, host, function (err, bytes) {
    if (err) throw err;
  });
}

module.exports.init = () => {
  server.on("message", (msg, info) => {
    console.log("Data received from server : " + msg.toString());
    console.log(info);
    console.log(
      "Received %d bytes from %s:%d\n",
      msg.length,
      info.address,
      info.port
    );
  });

  sendMessage("command");
};
*/

//module.exports.exit = () => server.close();

/*
module.exports.speed = (value) => sendMessage("speed " + value);
module.exports.up = (value) => sendMessage("up " + value);
module.exports.down = (value) => sendMessage("down " + value);
module.exports.battery = () => sendMessage("battery?");
module.exports.forward = (distance) => sendMessage("forward " + distance);
*/