const items = document.getElementsByClassName("item");
const inputs = document.querySelectorAll(".item input");

let flag = false;
let firstChecked;

let keepCheck = false;

let shiftKeyPressed = false;

console.log(inputs);

function handleClick(event){
    if(flag && shiftKeyPressed){
        // already checked sth else.
        inputs.forEach(input => {
            if(firstChecked === input){
                input.toggleAttribute("checked");
                keepCheck = true;
                
            }
            else if(keepCheck){
                input.toggleAttribute("checked");
            }

            if(input === event.target){
                keepCheck = false;
            }
        })
    }
    else{
        flag = true;
        event.target.toggleAttribute("checked");
        firstChecked = event.target;
    }
}

inputs.forEach(input => {
    input.addEventListener('click', handleClick);
})

window.addEventListener("keydown", function (e) {
    if(e.keyCode == 16){
        shiftKeyPressed = true;
        // console.log(shiftKeyPressed);
    }
})

window.addEventListener("keyup", function(e){
    if(e.keyCode == 16){
        shiftKeyPressed = false;
        // console.log("up!")
    }
})