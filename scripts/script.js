import {Bird, createPlatform} from '/scripts/class.js';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let flappy = new Bird(
    canvas.width / 2 - 100, 
    canvas.height / 2 - 25, 
    70, 70,
    "../seagull.png");
let imgObstacle = new Image();
imgObstacle.src = 'https://cdn-icons-png.flaticon.com/512/4666/4666467.png';
let gravity = 0.43;
let raf;
let isJumping = false;
let isGameOver = false;
let gameOn = false;
let obstacles = [];
let score = 0;

function gameLoop(){
    
   if(!isGameOver){
        ctx.clearRect(0, 0, canvas.width, canvas.height * 2);
        //Move obstacles
        obstacles.forEach(obstacle =>{
            //Add difficulty
            obstacle.posX -= score > 15 ? 5.4
            : score > 8 ? 4.6
            : score > 4 ? 4
            : 3.1
            
            ctx.drawImage(imgObstacle, 
                obstacle.posX, 
                obstacle.posY, 
                obstacle.width, 
                obstacle.height);
            ctx.drawImage(imgObstacle, 
                obstacle.posX, 0, 
                obstacle.width, 
                obstacle.posY - 150);

            //Collision
            if(
                flappy.x + (flappy.width - 40) > obstacle.posX &&
                flappy.x < obstacle.posX + (obstacle.width - 30) &&
                (flappy.y + (flappy.height - 30) > obstacle.posY ||
                flappy.y < obstacle.posY - 170) ||
                flappy.y + flappy.height > canvas.height

            ){
                gameOver();
            }
            
        });

        //Add obstacles
        if(
            (obstacles[0].posX < (canvas.width / 1.5) - obstacles[0].width) &&
            (obstacles.length < 2)
        ){
            createPlatform(obstacles, ctx, canvas.width, canvas.height, 140, imgObstacle);
            //Add point
            score++
        }

        //Remove obstacles
        obstacles = obstacles.filter(obstacle =>{
            return obstacle.posX > -80
        });

        //Jump
        if(!isJumping){
            flappy.vy += gravity
            flappy.y += flappy.vy;
        }else{
            flappy.y += flappy.jump;
        }

        //Draw score
        writeText(score, 50, 60);

        flappy.draw(ctx);
        
        raf = window.requestAnimationFrame(gameLoop);
    }
}

function gameOver(){
    raf = window.cancelAnimationFrame(raf)
    isGameOver = true;
    gameOn = false;
    writeText('Game Over!', 150, canvas.height / 2.5);
}

function writeText(text, x, y){
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 40px Courier New'
    ctx.fillText(text, x, y);
}

//Listeners
canvas.addEventListener("click", ()=>{
    flappy.vy = 0;
    isJumping = true;
    //Jump delay
    setTimeout(()=>{
        isJumping = false;
    }, 150);
    //Start game
    if(!gameOn){
        raf = window.requestAnimationFrame(gameLoop);
        gameOn = true
    };
});

document.addEventListener("DOMContentLoaded", ()=>{
    flappy.draw(ctx)
    createPlatform(obstacles, 
        ctx, 
        canvas.width, 
        canvas.height, 
        140, 
        imgObstacle);
    writeText('Click to start!', 80, 50);
});

