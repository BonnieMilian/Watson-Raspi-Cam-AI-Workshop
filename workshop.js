var five = require("johnny-five");
var Raspi = require("raspi-io");
var RaspiCam = require("raspicam");
var watson = require('watson-developer-cloud');
var fs = require('fs');

var camera = new RaspiCam({
  mode: "photo",
  output: "picture.jpg",
  timeout: 500
});

var board = new five.Board({
  io: new Raspi()
});

var visual_recognition = watson.visual_recognition({
    api_key: 'API-KEY',
    version: 'v3',
    version_date: '2016-05-20'
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

  var params = {
    images_file: fs.createReadStream('./'+filename)
  };

  visual_recognition.classify(params, (err, res) => {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });
});

camera.on("exit", (timestamp) => {
  console.log("Finished");
});
