var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello From Api!');
});

let port = 7000;

app.listen(port, function () {
  console.log('Server is up and listening on ' + port + ' port');
});
