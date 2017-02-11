var bodyParser = require('body-parser')
var express = require('express');
var fakerFactory = require('./fakerFactory');

var app = express();
var jsonParser = bodyParser.json();

app.get('/users', function(req, res) {
  res.json({
    users: [
      fakerFactory.getFakeUser(),
      fakerFactory.getFakeUser(),
      fakerFactory.getFakeUser(),
      fakerFactory.getFakeUser(),
      fakerFactory.getFakeUser(),
      fakerFactory.getFakeUser()
    ]
  });
});

app.post('/users', jsonParser, function(req, res) {
  console.log(req.body);

  res.json({ id: fakerFactory.getRandomNum() });
})

app.listen(3000, function () {
  console.log('Node app listening on port 3000')
});
