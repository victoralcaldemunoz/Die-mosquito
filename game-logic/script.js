import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Flower } from "./flower.js";

// VARIABLES DEL DOM
const board = document.getElementById('board');
const btnIniciarJuego = document.getElementById("startButton");
const seccionJuego = document.getElementById('seccion-juego');
const score = document.getElementById('score');

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
let scoreNumber = 0;

// SONIDOS
const btnSound = document.getElementById('audioButton');
const buzz = new Audio('multimedia/mosquito.mp3');
let isPlaying = false;

// SONIDO DEL JUEGO
const soundGame = new Audio('multimedia/OST.mp3');
soundGame.volume = 0.30;

// SONIDO GAME OVER
const soundGameOver = new Audio('multimedia/ended.mp3');

// SONIDO WIN
const soundGameWin = new Audio('multimedia/victory.mp3');
soundGameWin.volume = 0.10;

// GAME-OVER DOM
const gameoverSection = document.createElement('section');
gameoverSection.setAttribute('id', 'gameover');
gameoverSection.innerHTML = '<br>GAMER-OVER<br>MOSQUITO DIED<br>';

const restartButton = document.createElement('button');
restartButton.setAttribute('id', 'restart');
restartButton.textContent = 'Restart';

// WIN DOM
const winSection = document.createElement('section');
winSection.setAttribute('id', 'win-image');
const mosquitoWin = document.createElement('div');
mosquitoWin.setAttribute('id', 'mosquito-win');
mosquitoWin.innerText = 'Mosquito Win';
winSection.appendChild(mosquitoWin);

const restartButtonWin = document.createElement('button');
restartButtonWin.setAttribute('id', 'restartWin');
restartButtonWin.textContent = 'Restart';

// EMPEZAR EL JUEGO
function start() {
    mosquito.createMosquito();
    playerTimeId = setInterval(mosquitoMovement, 50);
    enemyTimeId = setInterval(createEnemy, 2000);
    flowerTimeId = setInterval(createFlowers, 5000);
    soundGame.play();
    buzz.pause();
    soundGameWin.pause();
}

// Creamos los objetos
function createEnemy () {
    randomY = Math.floor(Math.random() * 5) * 100;
    swatter = new Enemy(1500, randomY, board, mosquito, flySwatters);
    flySwatters.push(swatter);
    swatter.createFlySwatter();
}

function createFlowers () {
    randomYFlower = Math.floor(Math.random() * 5) * 100;
    flower = new Flower(1400, randomYFlower, board, mosquito, flowers);
    flowers.push(flower);
    flower.createFlower();
}

// Movimiento de mosquito
function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death && gameStarted) {
        mosquito.setColliding(false);
        soundGameOver.play();
        showGameoverScreen();
        resetGame();
    }
    if (mosquito.win) {
        winBoard();
        resetGame();
        mosquito.win = false;
    }
    flowers.forEach(function(flower, index){
        if (flower.checkCollisionFlower()) {
            flower.removeFlower(index);
            scoreNumber += 10;
            score.innerText = `${scoreNumber}`;
        }
    });
    flySwatters.forEach(function(swater, index){
        if (swater.checkCollision()) {
            swater.removeEnemy(index);
        }
    })
    win();
}

// FUNCIÓN QUE CHEQUEA EL WIN DEL JUEGO
function win() {
    if (scoreNumber >= 10) {
        mosquito.win = true;
    }
}

// WIN
function winBoard() {
    soundGameWin.currentTime = 0;
    soundGameWin.play();
    soundGame.pause();
    document.body.appendChild(winSection);
    winSection.appendChild(restartButtonWin);
    winSection.style.display = 'block';
    seccionJuego.style.display = 'none';
    score.style.display = 'none';
}

restartButtonWin.addEventListener('click', function(){
    start();
    winSection.style.display = 'none';
    seccionJuego.style.display = 'block';
    score.style.display = 'inline';
    soundGame.currentTime = 0;
    soundGame.play();
});

// GAME OVER
function showGameoverScreen() {
    soundGame.pause();
    document.body.appendChild(gameoverSection);
    gameoverSection.appendChild(restartButton);
    gameoverSection.style.display = 'block';
    seccionJuego.style.display = 'none';
    score.style.display = 'none';
}

restartButton.addEventListener('click', function(){
    start();
    gameoverSection.style.display = 'none';
    seccionJuego.style.display = 'block';
    score.style.display = 'inline';
    soundGame.currentTime = 0;
});

// FUNCIÓN PARA REINICIAR EL JUEGO
function resetGame() {
    clearInterval(playerTimeId);
    clearInterval(enemyTimeId);
    clearInterval(flowerTimeId);

    for (let i = 0; i < flySwatters.length; i++) {
        flySwatters[i].removeEnemy();
        i--
    }
    flySwatters = [];

    for (let i = 0; i < flowers.length; i++){
        flowers[i].removeFlower();
        i--
    }
    flowers = [];

    mosquito.x = 0;
    mosquito.y = 200;
    mosquito.sprite.style.left = mosquito.x + 'px';
    mosquito.sprite.style.top = mosquito.y + 'px';

    gameStarted = true;
    mosquito.death = false;
    mosquito.setColliding(false);

    clearInterval(flower.timerId);

    scoreNumber = 0;
    score.innerText = 0;
}

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
            buzz.pause();
        } else {
            buzz.play();
        }
        isPlaying = !isPlaying;
    });
});

buzz.play();
