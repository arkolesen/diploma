function initCam2() {
    startRecognizeFromCamera2();
}

let cam2FacesCount = 0;

function startRecognizeFromCamera2() {
    let now = moment();

    let year = now.format('YYYY');
    let month = now.format('MM');
    let day = now.format('DD');
    let hours = now.utc().format('HH');
    let minutes = now.format('mm');
    let seconds = now.format('ss');

    let data = {
        camera: 2,
        snapshotTime: `${year}${month}${day}${hours}${minutes}${seconds}`,
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/recognize',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
    })
        .done(res => {
            clearCam2();

            let faces = res;

            cam2FacesCount = faces;

            if (faces.length > 0) {
                faces.forEach((face, index) => {
                    if (document.getElementById(`cam2-face-${index}`)) {
                        document.getElementById(`cam2-face-${index}`).remove();
                    }

                    let faceArea = document.createElement('a');

                    faceArea.className = 'face cam2-face';

                    faceArea.setAttribute('id', `cam2-face-${index}`);

                    let photoWidth = document.getElementById('camera2').clientWidth;

                    let coef = photoWidth / 352;

                    let faceWidth = face.width * coef;
                    let faceHeight = face.height * coef;
                    let faceOffsetX = face.x * coef;
                    let faceOffsetY = face.y * coef;

                    faceArea.style.width = `${faceWidth}px`;
                    faceArea.style.height = `${faceHeight}px`;
                    faceArea.style.left = `${faceOffsetX}px`;
                    faceArea.style.top = `${faceOffsetY}px`

                    document.getElementById('camera2').appendChild(faceArea);
                })
            }

            startRecognizeFromCamera2();
        });
}

window.addEventListener('load', initCam2, false);

function clearCam2() {
    let faceCount = document.getElementsByClassName('cam2-face').length;

    for (let i = 0; i < faceCount; i +=1) {
        document.getElementById(`cam2-face-${i}`).parentNode.removeChild(document.querySelector(`#cam2-face-${i}`));
    }
}
