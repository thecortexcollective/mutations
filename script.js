// change the progress bar width based on the audio current time
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercentage = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercentage}%`;
        }
    });

    // reset
    audio.addEventListener('ended', () => {
        progress.style.width = '0%';
    });
}); 