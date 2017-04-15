'use strict';

let Promise = require('bluebird');

let cv = require('opencv');
let path = require('path');

let readImage = Promise.promisify(cv.readImage);

module.exports = {
    recognize,
};

function recognize(req, res) {
    let targetFile = path.join(__dirname,
        `../../motion/Camera${req.body.camera}/${req.body.snapshotTime}-snapshot.jpg`);

    return Promise.resolve()
        .then(() => readImage(targetFile))
        .then(imageMatrix => getFacesAreas(imageMatrix))
        .then(result => res.status(200).send(result))
        .catch(err => err);
}

function getFacesAreas(imageMatrix) {
    return new Promise((resolve, reject) => {
        imageMatrix.detectObject(cv.FACE_CASCADE, {}, (err, matches) => {
            if (err) {
                return reject(err);
            }

            return resolve(matches);
        });
    });
}
