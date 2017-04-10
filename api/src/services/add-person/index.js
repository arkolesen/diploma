'use strict';

module.exports = {
    addPerson,
};

function addPerson(req, res) {
    console.log(req.body);

    return res.send('Added');
}
