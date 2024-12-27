document.addEventListener('DOMContentLoaded', () => {

    // WRITTEN WRITTEN WRITTEN
    // WRITTEN WRITTEN WRITTEN

    const writtens = document.querySelectorAll('.written');
    const pdfBox = document.getElementById('pdf-box'); 
    writtens.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonId = event.target.id;
            switch (buttonId) {
            case 'nonfiction':
                pdfBox.innerHTML = `
                    This is the nonfiction piece.
                `; 
                break;
            case 'fiction':
                pdfBox.innerHTML = `
                    This is the fiction piece.   
                `; 
                break;
            case 'poetry':
                pdfBox.innerHTML = `
                    This is the poetry piece.`; 
                break;
            default:
            }
        });
    });

    // AUDIO AUDIO AUDIO
    // AUDIO AUDIO AUDIO

    const audio = document.getElementById('sound');
    const playPause = document.getElementById('playpause'); 
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    let isDragging = false;

    // ** toggle play/pause button **
    playPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPause.classList.add('playing');
        } else {
            audio.pause();
            playPause.classList.remove('playing');
        }
    }); 

    // also play/pause with space bar
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            if (audio.paused) {
                audio.play();
                playPause.classList.add('playing');
            } else {
                audio.pause();
                playPause.classList.remove('playing');
            }
        }
    }); 

    audio.addEventListener('play', () => {
        playPause.classList.add('playing');
    }); 

    audio.addEventListener('pause', () => {
        playPause.classList.remove('playing');
    }); 
    
    // ** change the progress bar width based on the audio current time **
    audio.addEventListener('timeupdate', () => {
        if (!isDragging && audio.duration) {
            const progressPercentage = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercentage}%`;
        }
    });

    // reset
    audio.addEventListener('ended', () => {
        progress.style.width = '0%';
        audio.play() // loop
    });

    // ** make the progress bar change the audio current time **
    const calculateProgress = (event) => {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
        return percentage;
    };

    progressContainer.addEventListener('mousedown', (event) => {
        isDragging = true;
        const percentage = calculateProgress(event);
        updateProgress(percentage);
    }); 

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const percentage = calculateProgress(event);
            updateProgress(percentage);
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