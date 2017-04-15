function initCam1() {
    setInterval(recognize, 300);
}

function recognize() {
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
            let faces = res;

            console.log(faces);

            if (faces.length === 0 && document.querySelector('#camera1 a')) {
                document.querySelector('#camera1 a').remove();
            }

            if (faces.length > 0) {
                faces.forEach((face, index) => {
                    if (document.getElementById(`face-${index}`)) {
                        document.getElementById(`face-${index}`).remove();
                    }

                    let faceArea = document.createElement('a');

                    faceArea.className = 'face';

                    faceArea.setAttribute('id', `face-${index}`);

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
        });
}

window.addEventListener('load', initCam1, false);
