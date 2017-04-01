'use strict';

/* eslint-disable */
  function startup() {
    var width = 320;
    var height = 0;

    var streaming = false;

    var constraints = { audio: true, video: { width: 1280, height: 720 } };
    let videosRowHtml = document.getElementsByClassName('video')[0];

    if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    }

    navigator.mediaDevices.enumerateDevices()
    .then((MediaDeviceInfo) => {
      MediaDeviceInfo.map((device, index) => {
        if (device.kind === 'videoinput') {
          let col4 = document.createElement('div', { class: 'col-md-4' });

          col4.innerHTML = `
            <div class="camera">
              <video id="video">Недоступно</video>
              <button id="startbutton">Снимок</button>
            </div>
            <canvas id="canvas"></canvas>
            <div class="output">
              <img id="photo" alt="Снимок будет тут">
            </div>
          `
          videosRowHtml.appendChild(col4);
        }
      })
        console.log(MediaDeviceInfo);
    })
    .then(() => {
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {

          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }

      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      const photo = document.getElementById('photo');
      const startbutton = document.getElementById('startbutton');


      console.log(video);
      console.log(canvas);

      navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: '5ec2cca2ba8fcb586cd12916ec9e7cd38a68a1707279b66a9d9ce94e184c162a',
      }
      })
      .then(function(stream) {
      var video = document.querySelector('video');
      console.log('video', video);
      if ("srcObject" in video) {
      video.srcObject = stream;
      } else {
      video.src = window.URL.createObjectURL(stream);
      }
      video.onloadedmetadata = function(e) {
      video.play();
      };
      })
      .catch(function(err) {
      console.log(err.name + ": " + err.message);
      });

      video.addEventListener('canplay', function(ev){
      if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);


      if (isNaN(height)) {
      height = width / (4/3);
      }

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
      }
      }, false);

      startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
      }, false);

      clearphoto();

      function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      }

      function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          var data = canvas.toDataURL('image/png');
          photo.setAttribute('src', data);
        } else {
          clearphoto();
        }
      }
    });
  }

window.addEventListener('load', startup, false);
