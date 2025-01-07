document.addEventListener('DOMContentLoaded', () => {

    // SCALING
    function scalePage(){
        const vw = window.innerWidth;
        const main = document.querySelector('main');
        let scaleFactor = 1;
        if (vw >= 700){
            scaleFactor = (vw - 80) / 600;
        }
        main.style.transform = `scale(${scaleFactor})`;
        // const pdf = document.getElementById('pdf');
        // if (pdf){
        //     pdf.style.transform = `scale(${scaleFactor})`; 
        //     // TODO this is the line that makes the pdf burst, good?
        // }
    }
    scalePage();
    window.addEventListener('resize', scalePage);

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

    // BASAL GLITCHES
    // BASAL GLITCHES
    let main = document.querySelector('main');
    for (const key in page_dict){
        console.log(main);
        console.log(page_dict);
        console.log(key, page_dict[key]);
        let thisGlitch = document.createElement('div');
        thisGlitch.classList.add('glitch');
        thisGlitch.innerHTML = `<img src="${page_dict[key].src}">`;
        thisGlitch.style.top = `${page_dict[key].top}`;
        thisGlitch.style.left = `${page_dict[key].left}`;
        thisGlitch.style.width = `${page_dict[key].width}`;
        thisGlitch.style.height = `${page_dict[key].height}`;
        thisGlitch.firstChild.style.animation = `${page_dict[key].animation}`;
        thisGlitch.style.filter = `${page_dict[key].filter}`;  
        main.appendChild(thisGlitch);
    }

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
            let glitch_dict; 

            if (event.target.dataset.clicked === "true"){
                switch (buttonId) {
                    case 'i':
                        pdfBox.innerHTML = `
                            <p id="i-p" style="cursor: pointer;">
                                ${i_statement} 
                            </p>
                            <div id="pdf">
                                <img src="${path_to_i}">
                            </div>
                        `; 
                        glitch_dict = i_dict; 
                        break;
                    case 'ii':
                        pdfBox.innerHTML = `
                            <p id="ii-p" style="cursor: pointer;">
                                ${ii_statement} 
                            </p>
                            <div id="pdf">
                                <img src="${path_to_ii}">
                            </div>
                        `; 
                        glitch_dict = ii_dict; 
                        break;
                    case 'iii':
                        pdfBox.innerHTML = `
                            <p id="iii-p" style="cursor: pointer;">
                                ${iii_statement} 
                            </p>
                            <div id="pdf">
                                <img src="${path_to_iii}">
                            </div>
                        `; 
                        glitch_dict = iii_dict; 
                        break;
                    case 'iv':
                        pdfBox.innerHTML = `
                            <p id="iv-p" style="cursor: pointer;">
                                ${iv_statement} 
                            </p>
                            <div id="pdf">
                                <img src="${path_to_iv}">
                            </div>
                        `; 
                        glitch_dict = iv_dict; 
                        break;
                    default:
                }
                event.target.style.color = "black";
                event.target.style.backgroundColor = "white";
                event.target.style.borderStyle = "inset";

                // GLITCHES GLITCHES GLITCHES
                // GLITCHES GLITCHES GLITCHES
                let pdf = document.getElementById('pdf');
                for (const key in glitch_dict){
                    console.log(key, glitch_dict[key]);
                    let thisGlitch = document.createElement('div');
                    thisGlitch.classList.add('glitch');
                    thisGlitch.innerHTML = `<img src="${glitch_dict[key].src}">`;
                    thisGlitch.style.top = `${glitch_dict[key].top}`;
                    thisGlitch.style.left = `${glitch_dict[key].left}`;
                    thisGlitch.style.width = `${glitch_dict[key].width}`;
                    thisGlitch.style.height = `${glitch_dict[key].height}`;
                    thisGlitch.firstChild.style.animation = `${glitch_dict[key].animation}`;
                    thisGlitch.style.filter = `${glitch_dict[key].filter}`;  
                    pdf.appendChild(thisGlitch);
                }
            } else {
                pdfBox.innerHTML = written_descrips;
                event.target.style.color = "white";
                event.target.style.backgroundColor = "black";
                event.target.style.borderStyle = "outset";
            }
        });
    });

    // TODO UN-COMMENT!
    let scrollTimeout;
    window.addEventListener('scroll', function(){
        let allGlitches = document.querySelectorAll('.glitch');
        allGlitches.forEach(glitch => {
            glitch.style.visibility = 'visible';
        });
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function(){
            allGlitches.forEach(glitch => {
                glitch.style.visibility = 'hidden';
            });
        }, 800); // show/hide after X seconds of inactivity
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