var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello From Web!');
});

let port = 7001;

app.listen(port, function () {
  console.log('Server is up and listening on ' + port + ' port');
});
