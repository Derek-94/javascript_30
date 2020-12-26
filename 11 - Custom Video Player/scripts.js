/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    video.paused ? video.play() : video.pause();
}

// The fact that this function is not included in "togglePlay()"
// is meaningful. We listened to the "play" and "pause" event.
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

// this function have to be ran everytime.
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach(btn => btn.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

video.addEventListener("timeupdate", handleProgress)

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));

progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false)
