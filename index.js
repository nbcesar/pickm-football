var express = require('express');

var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/charge', function(request, response) {
  console.log('at / get');
  response.status(201).json({name:'get'});
});

app.post('/charge', function(request, response) {
  //var stripeToken = req.body.stripeToken;
  console.log('at /charge posting');
  console.log(request.body);
  response.status(201).json({name: 'charge'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
