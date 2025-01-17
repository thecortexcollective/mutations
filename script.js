let pattern = 'strobe', patternIndex = 0; 
let main = document.querySelector('main');
const patterns = ['strobe', 'stay', 'shift', 'stop'];
const dictionaries = {};
if (typeof i_dict !== 'undefined') {
    dictionaries['i'] = i_dict;
}
if (typeof ii_dict !== 'undefined') {
    dictionaries['ii'] = ii_dict;
}
if (typeof iii_dict !== 'undefined') {
    dictionaries['iii'] = iii_dict;
}
if (typeof iv_dict !== 'undefined') {
    dictionaries['iv'] = iv_dict;
}
console.log(dictionaries); 
let scrollTimeout;
const glitchButton = document.getElementById('glitch-button');
if (glitchButton != null){
    newPattern();
} else {
    basalGlitches(page_dict, main);
}



function newPattern(){
    // UPDATE PATTERN
    patternIndex = (patternIndex + 1) % patterns.length;
    console.log(`updating pattern from ${pattern} to ${patterns[patternIndex]}`); 
    pattern = patterns[patternIndex];
    glitchButton.innerHTML = patterns[(patternIndex + 1) % patterns.length];

    // RESET GLITCHES
    let allGlitches = document.querySelectorAll('.glitch');
    allGlitches.forEach(div => div.remove());

    // BASAL GLITCHES
    // BASAL GLITCHES
    if (typeof page_dict !== 'undefined' && page_dict !== null){
        console.log("not on homepage"); 
        basalGlitches(page_dict, main);
    }

    // WRITTEN GLITCHES
    // WRITTEN GLITCHES
    const writtens = document.querySelectorAll('.written');
    writtens.forEach(button => {
        console.log(`for button ${button.id}`);
        if (button.dataset.clicked == "true"){
            console.log("button is clicked"); 
            const glitch_dict = dictionaries[button.id] || undefined;
            console.log(`glitch_dict is ${glitch_dict}`); 
            let pdf = document.getElementById('pdf');
            writtenGlitches(glitch_dict, pdf); 
        } else {
            console.log("button is unclicked"); 
        }
    }); 

    // GLITCH WHEN SCROLL
    addGlitchScroller();
}

function handleScroll(){
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
}

function addGlitchScroller(){
    if (pattern == 'stay' || pattern == 'stop'){
        window.removeEventListener('scroll', handleScroll);
        return; 
    }
    window.addEventListener('scroll', handleScroll);
}

function basalGlitches(page_dict, main){
    if (pattern == 'stop'){
        return;
    }
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
        if (pattern == 'stay'){
            thisGlitch.firstChild.style.animation = `none`; 
        } else {
            thisGlitch.firstChild.style.animation = `${page_dict[key][pattern]}`;
        }
        thisGlitch.style.filter = `${page_dict[key].filter}`;
        
        // thisGlitch.addEventListener('mouseover', () => {
        //     thisGlitch.classList.add('hidden'); 
        // });
        // thisGlitch.addEventListener('mouseleave', () => {
        //     thisGlitch.classList.remove('hidden'); 
        // });
        main.appendChild(thisGlitch);
    }
}

function writtenGlitches(glitch_dict, pdf){
    if (pattern == 'stop'){
        return;
    }
    for (const key in glitch_dict){
        console.log(key, glitch_dict[key]);
        let thisGlitch = document.createElement('div');
        thisGlitch.classList.add('glitch');
        thisGlitch.innerHTML = `<img src="${glitch_dict[key].src}">`;
        thisGlitch.style.top = `${glitch_dict[key].top}`;
        thisGlitch.style.left = `${glitch_dict[key].left}`;
        thisGlitch.style.width = `${glitch_dict[key].width}`;
        thisGlitch.style.height = `${glitch_dict[key].height}`;
        if (pattern == 'stay'){
            thisGlitch.firstChild.style.animation = `none`; 
        } else {
            thisGlitch.firstChild.style.animation = `${glitch_dict[key][pattern]}`;
        }
        thisGlitch.style.filter = `${glitch_dict[key].filter}`;  
        pdf.appendChild(thisGlitch);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // SCALING
    function scalePage(){
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const main = document.querySelector('main');
        let scaleFactor = 1;
        if (1160 >= vw >= 700){
            scaleFactor = (vw - 80) / 600;
        } else if (vw >= 1160){
            scaleFactor = 1.6; 
        }
        main.style.transform = `scale(${scaleFactor})`;
        main.style.height = `${vh / scaleFactor}px`;
        // const pdf = document.getElementById('pdf');
        // if (pdf){
        //     pdf.style.transform = `scale(${scaleFactor+0.4})`; 
        //     // TODO this is the line that makes the pdf burst, good?
        // }
    }
    scalePage();
    window.addEventListener('resize', scalePage);

    // CAROUSEL?
    let carousel = document.getElementById('carousel');
    if (carousel != null){
        console.log("there is a carousel");
        let items = carousel.querySelectorAll(".item");
        function showItem(index){
            items.forEach((item, idx) => {
                item.classList.remove("active");
                if (idx === index){
                    item.classList.add("active");
                }
            }); 
        }
        document.getElementById("prev").addEventListener("click", () => {
            let index = [...items].findIndex((item) =>
                item.classList.contains("active")
            ); 
            showItem((index-1+items.length)%items.length);
        });
        document.getElementById("next").addEventListener("click", () => {
            let index = [...items].findIndex((item) =>
                item.classList.contains("active")
            ); 
            showItem((index+1)%items.length);
        });
    }

    // POPULATING
    const musicButton = document.getElementById('music-button');
    if (musicButton !== null){
        musicButton.innerHTML = musicShort;
    }
    const music = document.getElementById('music');
    if (music !== null){
        music.innerHTML = musicStatement;
    }
    const visartButton = document.getElementById('visart-button');
    if (visartButton !== null){
        visartButton.innerHTML = visartShort;
    }
    const visart = document.getElementById('visart');
    if (visart !== null){
        visart.innerHTML = visartStatement;
    }
    const pdfBox = document.getElementById('pdf-box'); 
    if (pdfBox !== null){
        pdfBox.innerHTML = written_descrips;
    }
    
    // HOMEPAGE GLITCHBOX
    // HOMEPAGE GLITCHBOX
    const glitchBox = document.getElementById('glitch-box');
    if (typeof glitch_box_dict !== 'undefined' && glitch_box_dict !== null){

        // GLITCH BOX DICT
        // GLITCH BOX DICT
        console.log('glitch_box_dict exists');
        for (const key in glitch_box_dict){
            let thisGlitch = document.createElement('img');
            thisGlitch.src = glitch_box_dict[key].src;
            thisGlitch.style.top = glitch_box_dict[key].top;
            thisGlitch.style.left = glitch_box_dict[key].left;
            thisGlitch.style.width = glitch_box_dict[key].width;
            thisGlitch.style.height = glitch_box_dict[key].height;
            thisGlitch.style.filter = glitch_box_dict[key].filter;
            glitchBox.appendChild(thisGlitch);
            console.log('appended a glitch'); 
        }

        const images = glitchBox.querySelectorAll("img");
        let currIndex = 0;
        function cycleImages(){
            console.log(`currIndex: ${currIndex}`);
            let prevIndex = (currIndex-1+images.length)%images.length;
            console.log(`prevIndex: ${prevIndex}`); 
            images[prevIndex].classList.remove("active"); 
            images[currIndex].classList.add("active");
            currIndex = (currIndex+1)%images.length;
        }
        setInterval(cycleImages, 500); // 1 second per image

        // GLITCH BORDER DICT
        // GLITCH BORDER DICT
        for (const key in glitch_border_dict){
            let thisGlitch = document.createElement('img');
            thisGlitch.src = glitch_border_dict[key].src;
            thisGlitch.style.width = '100%';
            thisGlitch.style.height = '100%';
            thisGlitch.style.filter = glitch_border_dict[key].filter;
            thisGlitch.style.display = 'block';
            thisGlitch.style.opacity = '0.3';
            glitchBox.appendChild(thisGlitch);
            console.log('appended a glitch'); 
        }
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
                writtenGlitches(glitch_dict, pdf); 

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