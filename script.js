document.addEventListener('DOMContentLoaded', () => {

    // WRITTEN WRITTEN WRITTEN
    // WRITTEN WRITTEN WRITTEN

    const writtens = document.querySelectorAll('.written');
    const pdfBox = document.getElementById('pdf-box'); 
    
    writtens.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonId = event.target.id;
            const clicked = button.dataset.clicked === "true";
            button.dataset.clicked = clicked ? "false" : "true";

            if (button.dataset.clicked === "true"){
                switch (buttonId) {
                    case 'nonfiction':
                        pdfBox.innerHTML = `
                            Make the nonfiction pdf an image,
                            and display it here.
                        `; 
                        break;
                    case 'fiction':
                        pdfBox.innerHTML = `
                            Make the fiction pdf an image,
                            and display it here.   
                        `; 
                        break;
                    case 'poetry':
                        pdfBox.innerHTML = `
                            Make the poetry pdf an image,
                            and display it here.
                        `; 
                        break;
                    default:
                }
                event.target.style.color = "black";
                event.target.style.backgroundColor = "white";
                event.target.style.borderStyle = "inset";
            } else {
                pdfBox.innerHTML = `<p>
                        Nonfiction: <i>What Does it Mean to Take?</i>
                        by Max Kiekhofer.<br>
                        Fiction: <i>Wildfire</i> by Kane Trundle.<br>
                        Poetry: <i>Striga</i> by Mara Klein.
                    </p>
                `;
                event.target.style.color = "white";
                event.target.style.backgroundColor = "black";
                event.target.style.borderStyle = "outset";
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