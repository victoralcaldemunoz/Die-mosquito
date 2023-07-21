import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
// import { Princess } from "./princess.js";


// TABLERO
const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById('startButton');
const seccionJuego = document.getElementById('seccion-juego');
let gameStarted = true;


// SONIDO
let btnSound = document.getElementById('audioButton')
let buzz = new Audio('multimedia/mosquito.mp3')
let isPlaying = false;

let mosquito = new Player(0, 200, board);
/* let guayarmina = new Princess(1000, 400, board);
let princessId; */
let flySwatters = [];
let playerTimeId;
let enemyTimeId;

let randomY;
let swatter;

function start() {
    console.log("Start function is running.")
    mosquito.createMosquito()
    playerTimeId = setInterval(mosquitoMovement, 50)
    enemyTimeId = setInterval(createEnemy, 3000)
    // guayarmina.createPrincess();
}


// EVENTO PARA INICIAR EL BOARD DEL JUEGO
btnIniciarJuego.addEventListener('click', function(){
    start();
    document.getElementById('intro').style.display = 'none';
    seccionJuego.style.display = 'block';
});

function createEnemy () {
    console.log("Creating enemy object.");
    randomY = Math.floor(Math.random() * 5) * 100
    swatter = new Enemy(1400, randomY, board, mosquito, flySwatters)
    flySwatters.push(swatter) 
    swatter.createFlySwatter() 
  };

function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death === gameStarted){
       // alert('Mosquito is dead')
       //board.removeChild()
        clearInterval(playerTimeId)
        clearInterval(enemyTimeId)
        showGameoverScreen();
    }
};

// EVENTO PARA MOVER A MOSQUITO

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        mosquito.directionX = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        mosquito.directionY = 0;
    }
});

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowRight':
            mosquito.directionX = 1;
            break;
        case 'ArrowLeft':
            mosquito.directionX = -1;
            break;
        case 'ArrowUp':
            mosquito.directionY = -1;
            break;
        case 'ArrowDown':
            mosquito.directionY = 1;
            break;
    }
});

// EVENTO PARA PONER O QUITAR EL SONIDO
buzz.addEventListener('canplaythrough', function(e){
    btnSound.addEventListener('click', function(){
        if (isPlaying) {
            buzz.pause()
        }else {
            buzz.play()
        }
        isPlaying = !isPlaying;
    });
});

// GAME OVER
function showGameoverScreen(){
    let gameoverSection = document.createElement('section');
    gameoverSection.setAttribute('id', 'gameover');
    gameoverSection.innerHTML=`GAMER OVER`

    let divContainerGameover = document.createElement('div')
    divContainerGameover.classList.add('gameover-button-div');

    let restartButton = document.createElement('button')
    restartButton.setAttribute('id', 'restart')
    restartButton.textContent = 'Restart'

    // EVENTO PARA INICIAR EL BOARD DEL JUEGO
   restartButton.addEventListener('click', function(){
    
    document.getElementById('intro').style.display = 'block'; 
   
    
        
    });

    divContainerGameover.appendChild(restartButton);

    gameoverSection.appendChild(divContainerGameover);

    document.body.appendChild(gameoverSection);
    
    gameoverSection.style.display = 'block';
    seccionJuego.style.display = 'none';

    gameStarted = true;

}