'use strict';

let Promise = require('bluebird');

let cv = require('opencv');
let path = require('path');
let translitConfig = require('../../utils/translit');
let translit = require('translit')(translitConfig);

let dclassify = require('dclassify');

let readImage = Promise.promisify(cv.readImage);

let Classifier = dclassify.Classifier;
let DataSet = dclassify.DataSet;
let Document = dclassify.Document;

let data = new DataSet();

    // create a classifier

module.exports = {
    addPerson,
    recognize,
};

function addPerson(req, res) {
    let translitedPersonName = translit(`${req.body.firstName}-${req.body.lastName}`);
    let photoIndexes = [1, 2, 3, 4];

    let promises = photoIndexes.map(index =>
        readImage(path.join(__dirname,
            `../../persons/${translitedPersonName}/${translitedPersonName}-${index}.jpg`))
            .then(imageMatrix => getFacesAreas(imageMatrix, index)
                .then(faces => getFaceUniqueNumber(faces[0], imageMatrix))
                .catch(err => err)
            )
            .catch(err => err)
    );

    return Promise.all(promises)
        .then((matrixes) => {
            if (!matrixes) {
                return null;
            }

            let photoMatrixes = matrixes.map((matrix, index) =>
                new Document(`${matrix}${index}`, matrix));

            return data.add(translitedPersonName, photoMatrixes);
        })
        .then(result => res.status(200).send(`success: ${result}`))
        .catch(err => err);
}

function getFacesAreas(imageMatrix, index) {
    return new Promise((resolve, reject) => {
        imageMatrix.detectObject(cv.FACE_CASCADE, {}, (err, matches) => {
            if (err) {
                return reject(err);
            }
            console.log('MATCHES', matches);
            console.log('INDEX', index);

            return resolve(matches);
        });
    });
}

function getFaceUniqueNumber(faceArea, matrix) {
    if (!faceArea) {
        console.log(faceArea);

        return Promise.reject('Error');
    }

    let imageMatrix = matrix;

    let xMin = faceArea.x;
    let xMax = faceArea.x + faceArea.width;

    let yMin = faceArea.y;
    let yMax = faceArea.y + faceArea.height;

    let array = [];

    for (let i = xMin; i < xMax; i += 20) {
        for (let j = yMin; j < yMax; j += 20) {
            if (isNaN(imageMatrix.get(i, j))) {
                /* eslint no-continue: "warn" */
                continue;
            }

            array.push(imageMatrix.get(i, j));
        }
    }

    return Promise.resolve(array);
}

function recognize(req, res) {
    let targetFile = path.join(__dirname,
        `../../motion/Camera${req.body.camera}/${req.body.snapshotTime}-snapshot.jpg`);
    let classifier = new Classifier();

    return Promise.resolve()
        .then(() => classifier.train(data))
        .then(() => readImage(targetFile))
        .then(imageMatrix => getFacesAreas(imageMatrix)
            .then(faces => getFaceUniqueNumber(faces[0], imageMatrix))
        )
        .then((array) => {
            let testDoc = new Document('testFace', array);

            let result = classifier.classify(testDoc);

            console.log(result);

            return result;
        })
        .then(result => res.status(200).send(`success: ${result}`))
        .catch(err => err);
}
