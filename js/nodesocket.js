/** Class used to manage connection with node server.
 * @class
 */

/*
var DataHolder = { beta: 0, alpha: 0, state: "Default" };
var AppState = { stop: true, sendRandomVals: true };
var MuseChannels = { TP9: 0, Fp1: 1, Fp2: 2, TP10: 3 };
*/

var NodeSocket = function () {
  this.socket = io();
  this.moveDistance = 20;
  console.log(this.socket);
  //alpha = 0;
  //beta = 0;

  /*
  this.forward = () => {
    console.log("forward");
    this.socket.emit("cmd", "forward");
  };*/

  this.takeOff = () => {
    console.log("takeoff");
    this.socket.emit("takeoff", "takeoff");
    window.isTakeoff = true;
  };

  this.land = () => {
    console.log("land");
    this.socket.emit("land", "land");
    window.isTakeoff = false;
  };

  this.up = () => {
    console.log("up");
    this.socket.emit("up", this.moveDistance);
  };

  this.down = () => {
    console.log("down");
    this.socket.emit("down", this.moveDistance);
  };

  // Should trigger visualization movement
  /*
  this.socket.on("minReached", function (height) {
    console.log("up", height);
  });

  this.socket.on("maxReached", function (height) {
    console.log("down", height);
  });
  */

  /*
  this.sendPower = (power) => {
    //console.log("Sending power");
    this.socket.emit("power", power);
  };
  */

  /*
  this.socket.on("alpha", function (packet) {
    DataHolder.alpha = packet.msg[MuseChannels.Fp2];
  });

  this.socket.on("beta", function (packet) {
    DataHolder.beta = packet.msg[MuseChannels.Fp2];
  });
  */

  /*
  setInterval(function () {
    if (!AppState.stop) {
      if (AppState.sendRandomVals) {
        plot.plot(Math.random(), Math.random(), state);
      } else {
        plot.plot(DataHolder.alpha, DataHolder.beta, state);
      }
    }
  }, frequency);
  */
};
