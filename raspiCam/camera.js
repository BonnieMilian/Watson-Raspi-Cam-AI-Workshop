var RaspiCam = require("raspicam");

var camera = new RaspiCam({
  mode: "photo",
  output: "picture.jpg",
  timeout: 500
});

camera.on("read", (error, timestamp, filename) => {
  if(error)
    return;
  console.log("Picture Saved, " + filename);
});

camera.on("exit", (timestamp) => {
  console.log("Finished");
});

camera.start();