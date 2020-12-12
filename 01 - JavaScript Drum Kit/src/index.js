'use strict';

let currentKeyCode;

function playSound(){
    // add "playing" class
    let targetKey = document.querySelector(`div[data-key = "${currentKeyCode}"]`);
    targetKey.classList.add("playing");

    // audio play
    let audioKey = document.querySelector(`audio[data-key = "${currentKeyCode}"]`);
    audioKey.play();

    // remove playing class 
    setTimeout(() => targetKey.classList.remove("playing"), 500);
    //targetKey.classList.remove("playing");
}

function handleKeyDown(event){
    switch(event.keyCode){
        case 65:
            currentKeyCode = "65";
            playSound();
            break;
        case 83:
            currentKeyCode = "83";
            playSound();
            break;
        case 68:
            currentKeyCode = "68";
            playSound();
            break;
        case 70:
            currentKeyCode = "70";
            playSound();
            break;
        case 71:
            currentKeyCode = "71";
            playSound();
            break;
        case 72:
            currentKeyCode = "72";
            playSound();
            break;
        case 74:
            currentKeyCode = "74";
            playSound();
            break;
        case 75:
            currentKeyCode = "75";
            playSound();
            break;
        case 76:
            currentKeyCode = "76";
            playSound();
            break;
    }
}

window.addEventListener("keydown", handleKeyDown);