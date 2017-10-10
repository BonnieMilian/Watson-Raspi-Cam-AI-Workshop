var five = require("johnny-five");
var Raspi = require("raspi-io");
var RaspiCam = require("raspicam");

var camera = new RaspiCam({
  mode: "photo",
  output: "picture.jpg",
  timeout: 500
});

var board = new five.Board({
  io: new Raspi()
});

var button;

board.on("ready", () => {
  button = new five.Button({
    pin: "GPIO18",
    isPullup: true
  });

  button.on("down", (value) => {
    var time = new Date().getTime();

    camera.set( "output", "picture_" + time +".jpg" );

    camera.start();

    console.log("Pressed");
  });

  button.on("up", () => {
    console.log("Released");
  });
});


camera.on("read", (error, timestamp, filename) => {
  if(error)
    return;
  console.log("Picture Saved, " + filename);
});

camera.on("exit", (timestamp) => {
  console.log("Finished");
});
