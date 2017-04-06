'use strict';

let express = require('express');
let five = require('johnny-five');

let fs = require('fs');

let app = express();
let board = new five.Board();

app.get('/*', (req, res) => {
    res.send('Hello From Api!');
});

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
    console.log(__dirname);
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
