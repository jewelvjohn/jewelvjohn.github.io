import "@lottiefiles/lottie-player";
import {create} from '@lottiefiles/lottie-interactivity';

let resumeButton, expertiseButton, backButtons;
let mainSection, resumeSection, expertiseSection;

var currentSection = 0;

function transition(from, to) {
    const fadeOut = from.animate([
        {
            opacity: 1
        }, {
            opacity: 0
        }
    ], {
        duration: 250,
        fill: "forwards",
        easing: "ease-out"
    });

    fadeOut.addEventListener("finish", () => {
        from.style.display = 'none';
        to.style.display = 'flex';
        const fadeIn = to.animate([
            {
                opacity: 0
            }, {
                opacity: 1
            }
        ], {
            duration: 250,
            fill: "forwards",
            easing: "ease-in"
        });
    }, {once: true});
}

function gotoMain() {
    if(currentSection !== 0) {
        if(currentSection === 1) transition(resumeSection, mainSection);
        else if(currentSection === 2) transition(expertiseSection, mainSection);
        currentSection = 0;
    }
}

function gotoResume() {
    if(currentSection !== 1) {
        transition(mainSection, resumeSection);
        currentSection = 1;
    }
}

function gotoExpertise() {
    if(currentSection !== 2) {
        transition(mainSection, expertiseSection);
        currentSection = 2;
    }
}

function init() {
    const instagram = document.getElementById("instagram");
    instagram.onload = (e) => {
        create({
            player:'#instagram',
            mode:"cursor",
            actions: [{type: "hold"}]
        });
    }

    backButtons = document.querySelectorAll(".back-button");
    resumeButton = document.querySelector("#resume-button");
    expertiseButton = document.querySelector("#expertise-button");
    mainSection = document.querySelector("#main-section");
    resumeSection = document.querySelector("#resume-section");
    expertiseSection = document.querySelector("#expertise-section");

    resumeButton.onclick = gotoResume;
    expertiseButton.onclick = gotoExpertise;
    backButtons.forEach((button) => {
        button.onclick = gotoMain;
    });
}

init();