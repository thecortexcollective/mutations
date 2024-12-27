document.addEventListener('DOMContentLoaded', () => {

    // ** change the progress bar width based on the audio current time **
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    let isDragging = false;
    
    audio.addEventListener('timeupdate', () => {
        if (!isDragging && audio.duration) {
            const progressPercentage = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercentage}%`;
        }
    });

    // reset
    audio.addEventListener('ended', () => {
        progress.style.width = '0%';
    });

    // ** make the progress bar change the audio current time **
    const calculateProgress = (event) => {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
        return percentage;
    };

    progress.addEventListener('mousedown', (event) => {
        isDragging = true;
        updateProgress(calculateProgress(event));
    }); 

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            updateProgress(calculateProgress(event));
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    const updateProgress = (percentage) => {
        const newTime = percentage * audio.duration;
        progress.style.width = `${percentage * 100}%`;
        audio.currentTime = newTime;
    }; 
}); 