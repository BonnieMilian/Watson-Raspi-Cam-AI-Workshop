var five = require("johnny-five");
var Raspi = require("raspi-io");

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
    led.on();
    console.log("Pressed");
  });

  button.on("up", () => {
    led.off();
    console.log("Released");
  });
});