var express = require('express');

var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
