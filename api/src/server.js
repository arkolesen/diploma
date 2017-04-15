'use strict';

let express = require('express');
let five = require('johnny-five');
let fs = require('fs');
let cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();
let board = new five.Board();

let personService = require('./services/person');

app.use(cors({ credentials: true, origin: true }));

app.use('/cameras', express.static(path.join(__dirname, '/motion/')));
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/recognize', personService.recognize);

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
