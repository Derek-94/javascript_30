'use strict';

const spaceRange = document.getElementById("spacing");
const blurRange = document.getElementById("blur");
const colorClick = document.getElementById("base");

const img = document.querySelector("img");
const h1Class = document.querySelector('.hl');

function handleSpaceRange(event){
    img.style.padding = `${event.target.value}px`;
}

spaceRange.addEventListener("input", handleSpaceRange);

function handleBlurRange(event){
    if(!img.style.filter){
        img.style.filter = `blur(${event.target.value}px)`;
    }
    else{
        img.style.filter = `blur(${event.target.value}px)`;
    }
}

blurRange.addEventListener("input", handleBlurRange);

function handleBaseColor(event){
    img.style.backgroundColor =  event.target.value;
    h1Class.style.color = event.target.value;
}

colorClick.addEventListener("input", handleBaseColor);

