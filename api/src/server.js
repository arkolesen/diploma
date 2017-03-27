'use strict';

const express = require('express');

const app = express();

app.get('/*', (req, res) => {
    res.send('Hello From Api!');
});

const port = 8000;

app.listen(port, () => {
    console.log(`Server is up and listening on ${port} port`);
});
