var express = require('express');

var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/', function(request, response) {
  //var stripeToken = req.body.stripeToken;
  console.log('at /charge posting');
  console.log(request.body);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
