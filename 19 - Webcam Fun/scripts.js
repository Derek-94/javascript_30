// video is going to come off the webcam on the video element
// and we're going to dump it into the canvas every so often.

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.error(`OH NO!!!`, err);
      });
}

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    setInterval( () => {
        ctx.drawImage(video, 0, 0, width, height)

        // take the pixels out, 
        let pixels = ctx.getImageData(0, 0, width, height);
        
        // and then mess with them,
        // pixels = redEffect(pixels);
         pixels = RGBSplit(pixels);
        // ctx.globalAlpha = 0.8;
        pixels = greenScreen(pixels);

        // and then finally put them back in to ctx.
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

const takePhoto = () => {
    snap.currentTime = 0 ;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "Derek");
    link.innerHTML = `<img src = "${data}" alt = Derek />`;
    strip.insertBefore(link, strip.firstChild);
}

const redEffect = (pixels) => {
    for(let i = 0 ; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 70; 
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; 
    }
    return pixels;
}

const RGBSplit = (pixels) => {
    for(let i = 0 ; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

const greenScreen = (pixels) => {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }

getVideo();

video.addEventListener("canplay", paintToCanvas);