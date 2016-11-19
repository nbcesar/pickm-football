var express = require('express');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
  console.log(request.body);
  var stripeToken = request.body.stripeToken;
  //console.log('stripeToken', stripeToken);
  var token = request.body.id;
  var price = request.body.amount;
  //console.log(token, price);

  var charge = stripe.charges.create({
    source: token,
    currency: 'usd',
    amount: 2500,
    description: 'Example charge'
  },
  function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log(err);
      response.send('error');
    } else {
      console.log('success');
      response.json({chare: 'success'});
    }
  });
  //response.status(201).json({name: 'charge'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
