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
        `../../motion/Camera${req.body.camera}/${req.body.snapshotTime}-snapshot-cam-${req.body.camera}.jpg`);

    return Promise.resolve()
        .then(() => readImage(targetFile))
        .then(imageMatrix => getFacesAreas(imageMatrix))
        .then((result) => {
            console.log('result', result);
            console.log('req.body.camera', req.body.camera);

            return result;
        })
        .then(result => res.status(200).send(result))
        .catch(err => err);
}

function getFacesAreas(imageMatrix) {
    return new Promise((resolve, reject) =>
        imageMatrix.detectObject(cv.FACE_CASCADE, {}, (err, matches) => {
            if (err) {
                return reject(err);
            }

            return resolve(matches);
        }));
}
