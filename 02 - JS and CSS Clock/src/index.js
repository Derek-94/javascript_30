function setSecond(){
    const date = new Date();
    const seconds = date.getSeconds();
    const secondsDegree = (seconds / 60) * 360 + 90;
    const secondHand = document.querySelector(".second-hand").style;
    secondHand.transform = `rotate(${secondsDegree}deg)`;
}

function setMinute(){
    const date = new Date();
    const minutes = date.getMinutes();
    const miuntesDegree = (minutes / 60) * 360 + 90;
    const minHand = document.querySelector(".min-hand").style;
    minHand.transform = `rotate(${miuntesDegree}deg)`;
}

function setHours(){
    const date = new Date();
    const hours = date.getHours();
    const hoursDegree = (hours / 12) * 360 + 90;
    const hourHand = document.querySelector(".hour-hand").style;
    hourHand.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(setSecond, 1000);
setInterval(setMinute, 1000);
setInterval(setHours, 1000);
