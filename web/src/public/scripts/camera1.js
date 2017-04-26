function initCam1() {
    startRecognizeFromCamera1();
}

let cam1FacesCount = 0;

function startRecognizeFromCamera1() {
    let now = moment();

    let year = now.format('YYYY');
    let month = now.format('MM');
    let day = now.format('DD');
    let hours = now.utc().format('HH');
    let minutes = now.format('mm');
    let seconds = now.format('ss');

    let data = {
        camera: 1,
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
            clearCam1();

            let faces = res;

            cam1FacesCount = faces;

            if (faces.length > 0) {
                faces.forEach((face, index) => {
                    if (document.getElementById(`cam1-face-${index}`)) {
                        document.getElementById(`cam1-face-${index}`).remove();
                    }

                    let faceArea = document.createElement('a');

                    faceArea.className = 'face cam1-face';

                    faceArea.setAttribute('id', `cam1-face-${index}`);

                    let photoWidth = document.getElementById('camera1').clientWidth;

                    let coef = photoWidth / 352;

                    let faceWidth = face.width * coef;
                    let faceHeight = face.height * coef;
                    let faceOffsetX = face.x * coef;
                    let faceOffsetY = face.y * coef;

                    faceArea.style.width = `${faceWidth}px`;
                    faceArea.style.height = `${faceHeight}px`;
                    faceArea.style.left = `${faceOffsetX}px`;
                    faceArea.style.top = `${faceOffsetY}px`

                    document.getElementById('camera1').appendChild(faceArea);
                })
            }

            startRecognizeFromCamera1();
        });
}

window.addEventListener('load', initCam1, false);

function clearCam1() {
    let faceCount = document.getElementsByClassName('cam1-face').length;

    for (let i = 0; i < faceCount; i +=1) {
        document.getElementById(`cam1-face-${i}`).parentNode.removeChild(document.querySelector(`#cam1-face-${i}`));
    }
}
