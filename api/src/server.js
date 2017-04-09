'use strict';

let express = require('express');
let five = require('johnny-five');
let fs = require('fs');
let cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();
let board = new five.Board();

let copyPhotoService = require('./services/copy-photo');
let addPersonService = require('./services/add-person');

app.use(cors({ credentials: true, origin: true }));

app.use('/cameras', express.static(path.join(__dirname, '/motion/')));
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/last', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.contentType('jpeg');
    res.sendFile(path.join(__dirname, '/motion/Camera1/lastsnap.jpg'));
});

app.get('/main', (req, res) => {
    res.send('Hello From Api!');
});

app.post('/make-photo', copyPhotoService.makePhoto);
app.post('/add-person', addPersonService.addPerson);

const port = 8000;

app.listen(port, () => {
    console.log(`Server is up and listening on ${port} port`);
    /*eslint-disable*/
});

board.on('ready', () => {
    let servo = new five.Servo({
        pin: 10,
        startAt: 90,
    });

    if (fs.existsSync(__dirname + '/motion/Camera1/lastsnap.jpg')) {
        console.log('yes');
        let lap = 0;
        servo.sweep().on('sweep:full', function () {
            this.sweep({
                range: [40, 140],
                step: 10,
            });
        })
    };
});
