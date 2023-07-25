import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Flower } from "./flower.js";

// VARIABLES DEL DOM
const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById("startButton");
const seccionJuego = document.getElementById('seccion-juego');
let score = document.getElementById('score');

// WIN DOM
const winSection = document.createElement('section');
winSection.setAttribute('id', 'win-image');
var mosquitoWin = document.createElement('div');
mosquitoWin.setAttribute('id', 'mosquito-win');
mosquitoWin.innerText = 'Mosquito Win';
winSection.appendChild(mosquitoWin);

let restartButtonWin = document.createElement('button');
restartButtonWin.setAttribute('id', 'restartWin');
restartButtonWin.textContent = 'Restart';

// GAME-OVER DOM
let gameoverSection = document.createElement('section');
gameoverSection.setAttribute('id', 'gameover');
gameoverSection.innerHTML='<br>GAMER-OVER<br>MOSQUITO DIED<br>'

let restartButton = document.createElement('button');
restartButton.setAttribute('id', 'restart');
restartButton.textContent = 'Restart';

// SONIDOS
let btnSound = document.getElementById('audioButton')
let buzz = new Audio('multimedia/mosquito.mp3')
let isPlaying = false;

//SONIDO DEL JUEGO
let soundGame = new Audio('multimedia/OST.mp3');
soundGame.volume = 0.30

//SONIDO GAME OVER
let soundGameOver = new Audio('multimedia/ended.mp3');

//SONIDO WIN
let soundGameWin = new Audio('multimedia/victory.mp3');
soundGameWin.volume = 0.10

// VARIABLES GLOBALES
let mosquito = new Player(0, 200, board);

let flySwatters = [];
let flowers = [];

let playerTimeId;
let enemyTimeId;
let flowerTimeId;

let randomY;
let randomYFlower;
let swatter;
let flower;

let gameStarted = true;

var scoreNumber = 0;

// EMPEZAR EL JUEGO
function start() {
    mosquito.createMosquito()
    playerTimeId = setInterval(mosquitoMovement, 50)
    enemyTimeId = setInterval(createEnemy, 2000)
    flowerTimeId = setInterval(createFlowers, 5000)
    soundGame.play()
    buzz.pause()
    soundGameWin.pause()
}

// GAME OVER
function showGameoverScreen() {
    
    soundGame.pause()

    document.body.appendChild(gameoverSection);
        gameoverSection.appendChild(restartButton);
        gameoverSection.style.display = 'block';

    seccionJuego.style.display = 'none';
    score.style.display = 'none'
        
    }
    restartButton.addEventListener('click', function(){
        start()
        gameoverSection.style.display = 'none'
        seccionJuego.style.display = 'block'
        score.style.display = 'inline'
        soundGame.currentTime = 0
    })

// Función para reiniciar el juego
function resetGame() {
    // Detener los intervalos de tiempo
    clearInterval(playerTimeId);
    clearInterval(enemyTimeId);
    clearInterval(flowerTimeId);

    // Eliminar los enemigos del tablero
    for (let i = 0; i < flySwatters.length; i++) {
        flySwatters[i].removeEnemyRestart();
    }
    flySwatters = [];

    // Eliminar las flores del tablero
    for (let i = 0; i < flowers.length; i++){
        flowers[i].removeFlower();
    }
    flowers = [];

    // Restablecer la posición del mosquito
    mosquito.x = 0;
    mosquito.y = 200;
    mosquito.sprite.style.left = mosquito.x + 'px';
    mosquito.sprite.style.top = mosquito.y + 'px';

    // Restablecer las variables del juego
    gameStarted = true;
    mosquito.death = false;
    mosquito.setColliding(false);

    // Restablecer las flores
    clearInterval(flower.timerId)

    // Restablecer el score
    scoreNumber = 0;
    score.innerText = 0;
}

// FUNCIÓN QUE CHEQUEA EL WIN DEL JUEGO
function win(){
    if (scoreNumber == 50){
        mosquito.win = true;
    }
}

function winBoard(){
    soundGameWin.currentTime = 0;
        soundGameWin.play()
        soundGame.pause()
    
        document.body.appendChild(winSection);
        winSection.appendChild(restartButtonWin);
        winSection.style.display = 'block';

        seccionJuego.style.display = 'none';
        score.style.display = 'none'
    
        // Reiniciar el juego
            
        }
        restartButtonWin.addEventListener('click', function(){
            start()
            winSection.style.display = 'none'
            seccionJuego.style.display = 'block'
            score.style.display = 'inline'
            soundGame.currentTime = 0
            soundGame.play()
        });

function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death && gameStarted){
        mosquito.setColliding(false);
        soundGameOver.play();
        showGameoverScreen();
        resetGame();
        }
    if (mosquito.win){
        winBoard();
        resetGame();
        mosquito.win = !mosquito.win

    }
        flowers.forEach(function(flower, index){
            if (flower.checkCollisionFlower()){
                flower.removeFlower(index)
                
                scoreNumber += 10;
                score.innerText = `${scoreNumber}`
            }
        })
        win()
};    

function createEnemy () {
    randomY = Math.floor(Math.random() * 5) * 100
    swatter = new Enemy(1500, randomY, board, mosquito, flySwatters)
    flySwatters.push(swatter) 
    swatter.createFlySwatter() 

  };

  function createFlowers () {
    randomYFlower = Math.floor(Math.random() * 5) * 100
    flower = new Flower(1400, randomYFlower, board, mosquito, flowers)
    flowers.push(flower) 
    flower.createFlower() 
  };

// EVENTO PARA MOVER A MOSQUITO
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