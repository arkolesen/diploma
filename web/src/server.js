'use strict';

const express = require('express');
const stylus = require('stylus');

const app = express();
let path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(stylus.middleware({
    src: `${__dirname}/public/css`,
    compile: (str, filePath) => stylus(str).set('filename', filePath),
}));

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    res.render('pages/index', {
        root: '',
        staticRoot: '',
    });
    next();
});

app.get('/add-face', (req, res, next) => {
    res.render('pages/add-face', {
        root: '',
        staticRoot: '',
    });
    next();
});

const port = 8001;

app.listen(port, () => {
    console.log(`Server is up and listening on ${port} port`);
});
