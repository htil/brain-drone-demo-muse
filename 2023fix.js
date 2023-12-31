const Tello = require("tello-drone");
const drone = new Tello();

drone.on("connection", () => {
  console.log("Connected to drone");
});

drone.on("state", (state) => {
  //console.log("Recieved State > ", state);
});

drone.on("send", (err, length) => {
  if (err) console.log(err);

  console.log(`Sent command is ${length} long`);
});

drone.on("message", (message) => {
  console.log("Recieved Message > ", message);
});

drone.on("connection", async () => {
  try {
    console.log("TAKE OFF");
    await drone.send("takeoff");
    //await drone.send("flip", { value: "f" });
    await drone.send("land");
  } catch (error) {
    console.log(error);
    drone.send("land");
    //A short delay so that the land command can be sent before exiting
    setTimeout(process.exit);
  }
});
