document.addEventListener('DOMContentLoaded', () => {

    // WRITTEN WRITTEN WRITTEN
    // WRITTEN WRITTEN WRITTEN

    const buttons = document.querySelectorAll('button');
    const descrips = document.getElementById('descrips'); 
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (event) => {
            const buttonId = event.target.id;
            switch (buttonId) {
            case 'gobbler':
                descrips.innerHTML = `
                    <i>Gobbler</i> is a video game created for the
                    <b>CMS</b>, <b>input/output</b>, <b>ambient website</b>,
                    and <b>keyboard
                    instrument</b> assignments. It tests players’
                    ability to make decisions fast, weigh priorities
                    without falling prey to hesitation or indecision,
                    and move on from mistakes. I want the player to get 
                    a little bit frustrated
                    when playing <i>Gobbler</i> - to repeat to themselves:
                    “ugh, why did I just do that!”
                    <br><br>
                    I used free icons from pixabay and flaticon, and 
                    created the music myself using <b><a href="https://www.beepbox.co/">beepbox</a></b>!
                `; 
                break;
            case 'heehee':
                descrips.innerHTML = `
                <i>Heehee Box</i> is a collection of laughs created
                for <b>Project 1: <i>Collection</i></b>. I realized 
                that while we so often take photos of each other smiling,
                we almost never capture our laughs, and I wanted to rectify
                this, at least for myself and my friends. I love laughs
                because they’re often so recognizable. I can tell exactly
                which laugh belongs to which friend, in an instant. I
                wanted to bring this realization to
                others as well. 
                <br><br>
                I went through a lot of different stages in the design
                process for this one. After the final critique, I resolved
                to completely change up the aesthetic. In particular, I was really
                inspired by Ellie’s presentation of her Tool for One (the
                prank message creator), and wanted to bring that vibe to the design. 
                <br><br>
                Unfortunately, I didn’t have much time to implement the new aesthetic,
                so it’s still pretty rough around the edges. For example, I wanted 
                (and still currently plan) to make the borders of each box feel
                more hand-drawn like the borders around the boxes of Chris’s project. 
                I’m also not a great visual artist, and so the hand I drew doesn’t 
                look that amazing, although I think it works.
                <br><br>
                Another thing I changed was that while I kept the frame device for web,
                I got rid of it for mobile! The idea is that you’re already in some sense
                ‘closer to the metal’ by touching it with your fingers, so you don’t
                really need the frame device anymore.  
                `; 
                break;
            case 'bookmarklet':
                descrips.innerHTML = `Created for the <b>bookmarklet</b> assignment, 
                <i>Bookmarklet for Synesthesiacs</i> was actually one of my discarded
                <b><i>Tool for one</i></b> ideas. I wanted to build off of what we made
                in class to create something for a specific group of people! 
                `; 
                break;
            case 'turntable':
                descrips.innerHTML = `
                <i>Nucleica</i> is a bimodally interactive musical composition created
                for <b>Project 2: <i>Tool for one</i></b>. I wanted to somehow combine
                two disparate passions of my mom’s into a single piece: thinking about DNA,
                and mixing music. The piece is interactive in two ways: first, the 
                actual chords played are determined by a DNA file either uploaded or
                chosen by the listener (my mom) from a given list of presets, and second, the listener can take an
                active role in the piece while it’s running by moving the four sliders up
                and down, each corresponding to the level of a different set of instruments
                and samples. I also took care in designing an interface that felt natural both
                on mobile and web. 
                <br><br>

                In the creation of this piece I 
                learned how to use Tone.js, got way better at javascript in general, 
                composed a musical piece, and created a fairly large sample library
                in the process. 
                <br><br>

                I am also very proud of the design of this piece - probably moreso than 
                any of the others I made in this class. I really thought a lot about
                each element. The backgrounds fading into each other are meant to signal how
                the sliders were used and also to give a sense of the world around us, of the
                natural beauty reached after a long hike - a common and powerful occurrence in my mom’s
                life. I also find playing around with the sliders and backgrounds very enjoyable in itself. 
                The wooden texture of the box is meant to evoke the trailheads 
                at the end of my mom’s journeys, as well as traditional dj-sets and synths. 
                And much more than any of my other pieces, I think this one looks beautiful. 
                <br><br>

                I also made substantial changes to this project after critique. Among other changes,
                I made the ‘select organism’ button show which organism was selected after
                the selection page goes away, and changed the emoji slider labels to black icons
                that I felt better matched the wooden vibe. 
                `; 
                break;
            // case 'mneumonica':
            //     descrips.innerHTML = "Smth new"; 
            //     break;
            case 'dead-drop':
                descrips.innerHTML = `<i>LockerNotes</i> was a proposed social media
                app made with Ellie and Emma for
                <b>Project 3: <i>Symposium</i></b>. I was really proud of the idea
                and honestly might try to implement something like it over winter
                break with a friend. I think it’s a really cool idea
                and something I myself would love to use. 
                `; 
                break;
            case 'black-hole':
                descrips.innerHTML = `Created for the <b>website as...</b> and
                <b>ambient website</b> assignments, I wanted to make the viewport-size-change-effect
                a meaningful part of the story. I also really liked the idea of a black hole
                as something that takes things in but doesn’t put much out, and as an analogy for
                how I perceive myself and think others perceive me (although maybe not in this class). 
                I was proud of the idea of using the webcam as a forced
                mirror to demonstrate this theme. 
                `; 
                break;
            case 'enzo-mari':
                descrips.innerHTML = `Created for our <b>Enzo Mari Remix</b>
                assignment, this piece is definitely the roughest one here!
                I still decided to include it in my final work because I think it’s
                fun, and hints at an older internet age where things didn't have
                to look nice to be funny and used.`; 
                break;
            default:
            }
        });
        // button.addEventListener('mouseleave', (event) => {
        //     descrips.innerHTML = "Hover over a project to read about it!"; 
        // }); 
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