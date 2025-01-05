document.addEventListener('DOMContentLoaded', () => {

    // POPULATING
    const musicButton = document.getElementById('music-button');
    musicButton.innerHTML = musicShort;
    const music = document.getElementById('music');
    music.innerHTML = musicStatement;
    const visartButton = document.getElementById('visart-button');
    visartButton.innerHTML = visartShort;
    const visart = document.getElementById('visart');
    visart.innerHTML = visartStatement;
    const pdfBox = document.getElementById('pdf-box'); 
    pdfBox.innerHTML = written_descrips;

    // GLITCHES
    let glitchBox = document.querySelector('#glitch-box');
    let scrollTimeout;
    window.addEventListener('scroll', function(){
        glitchBox.style.display = 'none';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function(){
            glitchBox.style.display = 'block';
        }, 200); // hide after 0.2 seconds of inactivity
    }); 

    // WRITTEN WRITTEN WRITTEN
    // WRITTEN WRITTEN WRITTEN

    const writtens = document.querySelectorAll('.written');
    const nav = document.getElementById('nav');
    
    writtens.forEach(button => {
        button.addEventListener('click', (event) => {

            // unclick all other buttons
            writtens.forEach(otherButton => {
                if (otherButton !== button && otherButton !== nav) {
                    otherButton.dataset.clicked = "false"; 
                    otherButton.style.color = "white"; 
                    otherButton.style.backgroundColor = "black";
                    otherButton.style.borderStyle = "outset";
                }
            });

            // click this button
            const buttonId = event.target.id;
            const clicked = event.target.dataset.clicked === "true";
            event.target.dataset.clicked = clicked ? "false" : "true";

            if (event.target.dataset.clicked === "true"){
                switch (buttonId) {
                    case 'i':
                        pdfBox.innerHTML = `
                            <p id="i-p" style="cursor: pointer;">
                                ${i_statement} 
                            </p>
                            <img class="pdf" src="${path_to_i}">
                        `; 
                        break;
                    case 'ii':
                        pdfBox.innerHTML = `
                            <p id="ii-p" style="cursor: pointer;">
                                ${ii_statement} 
                            </p>
                            <img class="pdf" src="${path_to_ii}">
                        `; 
                        break;
                    case 'iii':
                        pdfBox.innerHTML = `
                            <p id="iii-p" style="cursor: pointer;">
                                ${iii_statement} 
                            </p>
                            <img class="pdf" src="${path_to_iii}">
                        `; 
                        break;
                    case 'iv':
                        pdfBox.innerHTML = `
                            <p id="iv-p" style="cursor: pointer;">
                                ${iv_statement} 
                            </p>
                            <img class="pdf" src="${path_to_iv}">
                        `; 
                        break;
                    default:
                }
                event.target.style.color = "black";
                event.target.style.backgroundColor = "white";
                event.target.style.borderStyle = "inset";
            } else {
                pdfBox.innerHTML = written_descrips;
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