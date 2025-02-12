const canvas = document.querySelector("#draw");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";

ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let direction = true;

let hue = 0;

function draw(event){
    if(!isDrawing) return; // stop the function if it is not the drawing mode.
    console.log(event);

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    lastX = event.offsetX;
    lastY = event.offsetY;
    
    hue++;
    if(hue >= 360){
        hue = 0;
    }

    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if(direction){
        ctx.lineWidth++;
    }
    else{
        ctx.lineWidth--;
    }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false); 