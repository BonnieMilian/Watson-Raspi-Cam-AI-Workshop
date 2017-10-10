var five = require("johnny-five");
var Raspi = require("raspi-io");

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
    console.log("Pressed");
  });

  button.on("up", () => {
    console.log("Released");
  });
});