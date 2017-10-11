var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: 'API-KEY',
  version: 'v3',
  version_date: '2016-05-20'
});

//Replace with your own classifier ID
visual_recognition.getClassifier({
  classifier_id: 'myself_ID' }, (err, response) => {
   if (err)
    console.log(err);
   else
    console.log(JSON.stringify(response, null, 2));
  }
);