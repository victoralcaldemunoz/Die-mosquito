import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
// import { Princess } from "./princess.js";


// TABLERO
const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById("startButton");
startButton.addEventListener('click', function() {
    const seccionJuego = document.getElementById('seccion-juego');
    let gameStarted = true;
});
const seccionJuego = document.getElementById('seccion-juego');
let gameStarted = true;

// GAME OVER

let gameoverSection;

function showGameoverScreen() {
    gameoverSection = document.createElement('section');
    gameoverSection.setAttribute('id', 'gameover');
   

    let divContainerGameover = document.createElement('div');
    divContainerGameover.classList.add('gameover-button-div');

    let restartButton = document.createElement('button');
    restartButton.setAttribute('id', 'restart');
    restartButton.textContent = 'Restart';

    // Eliminar el evento anterior antes de añadir uno nuevo
    restartButton.removeEventListener('click', restartGame);

    function restartGame() {
        resetGame(); // Reiniciar el juego
        gameoverSection.style.display = 'none';
        seccionJuego.style.display = 'block';
        
    }
    restartButton.addEventListener('click', function(){
        start()
        gameoverSection.style.display = 'none'
        seccionJuego.style.display = 'block'
        soundGame.currentTime = 0;
        soundGame.play();
    })

    restartButton.addEventListener('click', function(){
        start()
        gameoverSection.style.display = 'none'
        seccionJuego.style.display = 'block'
        soundGame.currentTime = 0;
        soundGame.play();
    })

    divContainerGameover.appendChild(restartButton);

    gameoverSection.appendChild(divContainerGameover);

    document.body.appendChild(gameoverSection);

    gameoverSection.style.display = 'block';
    seccionJuego.style.display = 'none';
}

// Función para reiniciar el juego
function resetGame() {
    // Detener los intervalos de tiempo
    clearInterval(playerTimeId);
    clearInterval(enemyTimeId);

    // Eliminar los enemigos del tablero
    for (let i = 0; i < flySwatters.length; i++) {
        flySwatters[i].removeEnemyRestart();
    }
    flySwatters = [];

    // Restablecer la posición del mosquito
    mosquito.x = 0;
    mosquito.y = 200;
    mosquito.sprite.style.left = mosquito.x + 'px';
    mosquito.sprite.style.top = mosquito.y + 'px';

    // Restablecer las variables del juego
    gameStarted = true;
    mosquito.death = false;
    mosquito.setColliding(false);

    // Volver a iniciar el juego
    start();
}


// SONIDO
let btnSound = document.getElementById('audioButton')
let buzz = new Audio('multimedia/mosquito.mp3')
let isPlaying = false;

//SONIDO DEL JUEGO
let soundGame = new Audio('multimedia/OST.mp3');
//soundGame.addEventListener("canplaythrough", function(event){});

function startGame() {
  soundGame.play(); 
  start(); 
}

btnIniciarJuego.addEventListener('click', function() {
  startGame();
});

//PRINCESS
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

function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death && gameStarted){
        mosquito.setColliding(false);
        //alert('Mosquito is dead')
        clearInterval(playerTimeId)
        clearInterval(enemyTimeId)
        showGameoverScreen();
        }
}

function createEnemy () {
    console.log("Creating enemy object.");
    randomY = Math.floor(Math.random() * 5) * 100
    swatter = new Enemy(1400, randomY, board, mosquito, flySwatters)
    flySwatters.push(swatter) 
    swatter.createFlySwatter() 
  }

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


// EVENTO PARA MOVER A MOSQUITO

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        mosquito.directionX = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        mosquito.directionY = 0;
    }
});

// EVENTO PARA INICIAR EL BOARD DEL JUEGO
btnIniciarJuego.addEventListener('click', function(){
    start();
    document.getElementById('intro').style.display = 'none';
    seccionJuego.style.display = 'block';
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

buzz.play()