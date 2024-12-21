import "@lottiefiles/lottie-player";
import {create} from '@lottiefiles/lottie-interactivity';

let resumeButton, expertiseButton, backButtons;
let mainSection, resumeSection, expertiseSection;

var currentSection = 0;

function transition(from, to, flex = true) {
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
        to.style.display = flex ? 'flex' : 'block';
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
        if(currentSection === 1) transition(resumeSection, mainSection, false);
        else if(currentSection === 2) transition(expertiseSection, mainSection, false);
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

function initializeLottie() {
    const instagram = document.getElementById("instagram");
    instagram.onload = (e) => {
        create({
            player:'#instagram',
            mode:"cursor",
            actions: [{type: "hold"}]
        });
    }
    
    const download = document.getElementById("download");
    download.onload = (e) => {
        create({
            player:'#download',
            mode:"cursor",
            actions: [
                {
                    type: "click",
                    forceFlag: false
                }
            ]
        });
    }
}

function initializeSections() {
    mainSection = document.querySelector("#main-section");
    resumeSection = document.querySelector("#resume-section");
    expertiseSection = document.querySelector("#expertise-section");
}

function initializeButtons() {
    backButtons = document.querySelectorAll(".back-button");
    resumeButton = document.querySelector("#resume-button");
    expertiseButton = document.querySelector("#expertise-button");
    
    resumeButton.onclick = gotoResume;
    expertiseButton.onclick = gotoExpertise;
    backButtons.forEach((button) => {
        button.onclick = gotoMain;
        const animation = button.querySelector("lottie-player");
        const playAnimation = () => {
            animation.play();
        };
        const pauseAnimation = () => {
            animation.stop();
        };
        animation.addEventListener("mouseenter", playAnimation);
        animation.addEventListener("mouseleave", pauseAnimation);
    });
}

function initializePDF() {
    let pdfCanvas = document.querySelector("#pdf-canvas");
    const context = pdfCanvas.getContext("2d");
    
    pdfjsLib.getDocument("./resources/docs/Jewel John Resume 24-09-24.pdf").promise.then(pdfDoc => {
        pdfDoc.getPage(1).then(page => {
            let pageViewport = page.getViewport({scale: 1});
            pdfCanvas.width = pageViewport.width;
            pdfCanvas.height = pageViewport.height;
            page.render({
                canvasContext: context,
                viewport: pageViewport
            });
        }).catch(pageErr => {
            console.log(pageErr);
        });
    }).catch(pdfErr => {
        console.log(pdfErr);
    });
}

function init() {
    initializeLottie();
    initializeSections()
    initializeButtons();
    initializePDF();
}

init();