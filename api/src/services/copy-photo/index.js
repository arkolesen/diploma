'use strict';

let shell = require('shelljs');
let translitConfig = require('../../utils/translit');
let translit = require('translit')(translitConfig);

module.exports = {
    makePersonPhoto,
};

function makePersonPhoto(req, res) {
    console.log(req.body);
    let translitedPersonName = translit(`${req.body.firstName}-${req.body.lastName}`);
    let destinationFolder = `./src/persons/${translitedPersonName}`;
    let targetFile = `./src/motion/Camera${req.body.camera}/${req.body.snapshotTime}-snapshot.jpg`;

    shell.mkdir(destinationFolder);
    shell.chmod(777, './src/persons/*');

    shell.cp(targetFile, `${destinationFolder}`);

    return res.send('ggg');
}
