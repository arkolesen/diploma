function initCam1() {
    let snapshotButton1 = document.getElementById('snapshotButton1');
    let snapshotButton2 = document.getElementById('snapshotButton2');
    let snapshotButton3 = document.getElementById('snapshotButton3');
    let snapshotButton4 = document.getElementById('snapshotButton4');

    let isFirstPhodoMade = false;
    let isSecondPhodoMade = false;
    let isThirdPhodoMade = false;
    let isFourthPhodoMade = false;

    let firstName = document.querySelector('#camera-1-form input[name = "firstName"]');
    let lastName = document.querySelector('#camera-1-form input[name = "lastName"]');

    [snapshotButton1, snapshotButton2, snapshotButton3, snapshotButton4]
        .forEach(button => button.addEventListener('click', (e) => {
            let snapShotNumber = e.target.value;

            camSnapshot(snapShotNumber);
            e.preventDefault();
        }, false));

    document.querySelector('#camera-1-form').addEventListener('submit', submitForm);

    document.querySelector('#camera-1-form input[name = "firstName"]')
        .addEventListener('input', (e) => {
            if (lastName.value && e.target.value) {
                document.querySelector('#camera-1-form button').removeAttribute('disabled');
            }
        }, false);

    document.querySelector('#camera-1-form input[name = "lastName"]')
        .addEventListener('input', (e) => {
            if (firstName.value && e.target.value) {
                [snapshotButton1, snapshotButton2, snapshotButton3, snapshotButton4]
                    .forEach(button => button.removeAttribute('disabled'))
            }
        }, false);

    function clearphoto() {

    }

    function camSnapshot(snapShotNumber) {
        switch (snapShotNumber) {
            case '1':
                isFirstPhodoMade = true;
                break;
            case '2':
                isSecondPhodoMade = true;
                break;
            case '3':
                isThirdPhodoMade = true;
                break;
            case '4':
                isFourthPhodoMade = true;
                break;
            default:

        }

        if (isFirstPhodoMade && isSecondPhodoMade && isThirdPhodoMade && isFourthPhodoMade) {
            document.querySelector('#camera-1-form button').removeAttribute('disabled');
        }

        let photoId = `cam1Photo${snapShotNumber}`;

        let photoDiv = document.createElement('div');

        photoDiv.className = 'photoDiv';

        photoDiv.innerHTML =
            `
                <img id=${photoId}>
            `;

        document.getElementById('camera1').appendChild(photoDiv);
//TODO: uncomment this lines

        // let now = moment();
        //
        // let year = now.format('YYYY');
        // let month = now.format('MM');
        // let day = now.format('DD');
        // let hours = now.utc().format('HH');
        // let minutes = now.format('mm');
        // let seconds = now.format('ss');

        // document.getElementById(photoId).src =
        //`http://localhost:8000/cameras/Camera1/${year}${month}${day}${hours}${minutes}${seconds}-snapshot.jpg`;

        document.getElementById(photoId).src =
            `http://localhost:8000/cameras/Camera1/20170410181051-snapshot.jpg`;

        let data = {
            camera: 1,
            firstName: firstName.value,
            lastName: lastName.value,
            snapshotTime: '20170410181051', //${year}${month}${day}${hours}${minutes}${seconds}
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/make-photo',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
        })
            .done(res => {
                console.log(res);
            });
    }

    function submitForm(e) {
        e.preventDefault();

        let data = {
            camera: 1,
            firstName: firstName.value,
            lastName: lastName.value,
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/add-person',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
        })
            .done(res => console.log(res));

    }

}

window.addEventListener('load', initCam1, false);
