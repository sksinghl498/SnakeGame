// Game constants & variables

let inputDirection = {x: 0 ,y:0}
const foodSound= new Audio('../music/food.mp3');
const gameOverSound= new Audio('../music/gameover.mp3');
const moveSound= new Audio('../music/move.mp3');
const musicSound= new Audio('../music/music.mp3');
const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const hiScoreBox= document.getElementById("highScore");
let speed= 5;
let lastpaintTime = 0;
let score=0;
let hiscoreval=0;
let snakeArr= [
    {
        x: 13,
        y: 15,
    }
]

let food = {
     x: 10,
     y: 15,
}
// Game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime- lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime= ctime;
    gameEngine();
}


function isCollide(snake){
    // If you bump into yourself

    for(let i=1;i< snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
          }
        }

        // If you bump into the walls
        if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true;  
        }
     return false;
}






function gameEngine(){

    // Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDirection= {x:0 ,y:0};

        alert("Game over!! Press any key to play again...");
        snakeArr = [ { x: 13,y: 15,  } ]
        if(score > hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "Highest score: "+ hiscoreval;

        }
        // musicSound.play();
        score= 0;
        scoreDisplay.innerHTML= "Score : "+ score;
    }

    // If you have eaten the food, increment the score and regenrate the food..

    if(snakeArr[0].y=== food.y && snakeArr[0].x === food.x){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x+inputDirection.x, y: snakeArr[0].y+ inputDirection.y});
        score+=1;
        
        let a= 2;
        let b= 16;
        scoreDisplay.innerHTML= "Score : "+ score;
        food= {x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // Move the snake

    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]= {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Display the snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        const snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
         
        board.appendChild(snakeElement);
    })

    // Display the food
    const foodElement= document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}




// Main logic starts here
let hiScore= localStorage.getItem("hiscore");
if(hiScore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval= JSON.parse(hiScore);
    hiScoreBox.innerHTML = "Highest score: "+ hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=> {
    inputDirection = {x: 0 ,y:1} // start the game
    moveSound.play();
    musicSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x= 0;
            inputDirection.y= -1 ;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x= 0;
            inputDirection.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x=-1;
            inputDirection.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x=1;
            inputDirection.y=0;
            break;
        default: 
            break;
    }
});