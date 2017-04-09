'use strict';

// let shell = require('shelljs');

module.exports = {
    makePhoto,
};

function makePhoto(req, res) {
    console.log(req.body);

    return res.send('ggg');
}
