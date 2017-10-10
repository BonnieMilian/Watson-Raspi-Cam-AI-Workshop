var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: '',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  images_file: fs.createReadStream('./bonnie.jpg')
};

visual_recognition.detectFaces(params, (err, response) => {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2));
});