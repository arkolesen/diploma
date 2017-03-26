const express = require('express');
const app = express();

app.get('/*', function (req, res) {
  res.send('Hello From Api!');
});

const port = 8000;

app.listen(port, function () {
  console.log('Server is up and listening on ' + port + ' port');
});
