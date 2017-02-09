var bodyParser = require('body-parser')
var express = require('express');
var responseData = require('./responseData');

var app = express();
var jsonParser = bodyParser.json();

app.get('/trivia', function(req, res) {
  res.json(responseData.numberTrivia);
});

app.post('/trivia', jsonParser, function(req, res) {
  var randomNum = Math.floor((Math.random()) * 1000);

  console.log(req.body);

  res.json({ id: randomNum });
})

app.listen(3000, function () {
  console.log('Node app listening on port 3000')
});
