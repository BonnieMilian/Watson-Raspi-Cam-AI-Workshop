var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: 'API-KEY',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  images_file: fs.createReadStream('./puppy.jpeg')
};

visual_recognition.classify(params, (err, res) => {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});