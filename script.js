let isPlaying = false;
let currentTrack = 1;
const totalTracks = 3;
let currentTime = 0; // in seconds
let duration = 30; // in seconds

const tracks = [
    { title: "Track 1", artist: "Artist 1", duration: 25 },
    { title: "Track 2", artist: "Artist 2", duration: 30 },
    { title: "Track 3", artist: "Artist 3", duration: 28 }
];

function updateDisplay() {
    document.querySelector('.track-number').textContent = `Playing music ${currentTrack} of ${totalTracks}`;
    document.querySelector('.title').textContent = tracks[currentTrack - 1].title;
    document.querySelector('.artist').textContent = tracks[currentTrack - 1].artist;
    document.querySelector('.duration').textContent = formatTime(tracks[currentTrack - 1].duration);
    updateProgressBar();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateProgressBar() {
    const progressPercentage = (currentTime / duration) * 100;
    document.querySelector('.progress-bar').style.width = `${progressPercentage}%`;
    document.querySelector('.current-time').textContent = formatTime(currentTime);
}

function playPause() {
    isPlaying = !isPlaying;
    const playBtn = document.querySelector('.play-btn i');
    playBtn.classList.toggle('fa-play');
    playBtn.classList.toggle('fa-pause');
    
    if (isPlaying) {
        const interval = setInterval(() => {
            if (currentTime < duration) {
                currentTime++;
                updateProgressBar();
            } else {
                clearInterval(interval);
                isPlaying = false;
                playBtn.classList.remove('fa-pause');
                playBtn.classList.add('fa-play');
            }
        }, 1000);
    }
}

function prevTrack() {
    currentTrack = currentTrack > 1 ? currentTrack - 1 : totalTracks;
    currentTime = 0;
    duration = tracks[currentTrack - 1].duration;
    updateDisplay();
}

function nextTrack() {
    currentTrack = currentTrack < totalTracks ? currentTrack + 1 : 1;
    currentTime = 0;
    duration = tracks[currentTrack - 1].duration;
    updateDisplay();
}

// Initialize the player
updateDisplay();
