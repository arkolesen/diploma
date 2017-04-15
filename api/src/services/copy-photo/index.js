'use strict';

let shell = require('shelljs');
let translitConfig = require('../../utils/translit');
let translit = require('translit')(translitConfig);

module.exports = {
    makePersonPhoto,
};

function makePersonPhoto(req, res) {
    let translitedPersonName = translit(`${req.body.firstName}-${req.body.lastName}`);
    let destinationFolder = `./src/persons/${translitedPersonName}`;
    let targetFile = `./src/motion/Camera${req.body.camera}/${req.body.snapshotTime}-snapshot.jpg`;

    if (!shell.test('-e', `${destinationFolder}`)) {
        console.log('NOT EXISTS');
        shell.mkdir(destinationFolder);
    }

    shell.chmod('-R', 777, './src/persons/*');

    console.log('targetFile', targetFile);
    shell.cp(targetFile, `${destinationFolder}`);
    shell.mv(`${destinationFolder}/${req.body.snapshotTime}-snapshot.jpg`,
        `${destinationFolder}/${translitedPersonName}-${req.body.snapShotNumber}.jpg`);

    return res.send('ggg');
}
