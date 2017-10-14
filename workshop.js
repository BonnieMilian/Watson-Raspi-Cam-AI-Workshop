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

var button, led;

board.on("ready", () => {
  button = new five.Button({
    pin: "GPIO18",
    isPullup: true
  });

  led = new five.Led({
    pin: "GPIO17"
  });

  button.on("down", (value) => {
    var time = new Date().getTime();

    camera.set( "output", "picture_" + time +".jpg" );

    led.on();

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
  led.off();
  console.log("Picture Saved, " + filename);
});

camera.on("exit", (timestamp) => {
  console.log("Finished");
});
