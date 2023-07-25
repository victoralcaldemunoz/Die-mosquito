import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Flower } from "./flower.js";

// VARIABLES DEL DOM
const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById("startButton");
const seccionJuego = document.getElementById('seccion-juego');
let score = document.getElementById('score');

const winSection = document.createElement('section');
winSection.setAttribute('id', 'win-image');
var mosquitoWin = document.createElement('div');
mosquitoWin.setAttribute('id', 'mosquito-win');
mosquitoWin.innerText = 'Mosquito Win'
winSection.appendChild(mosquitoWin);



let restartButtonWin = document.createElement('button');
restartButtonWin.setAttribute('id', 'restartWin');
restartButtonWin.textContent = 'Restart';

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

let gameoverSection;
let gameoverSwatter;

var scoreNumber = 0;

// EMPEZAR EL JUEGO
function start() {
    console.log("Start function is running.")
    mosquito.createMosquito()
    playerTimeId = setInterval(mosquitoMovement, 50)
    enemyTimeId = setInterval(createEnemy, 3000)
    flowerTimeId = setInterval(createFlowers, 5000)
}

// GAME OVER
function showGameoverScreen() {
    gameoverSection = document.createElement('section');
    gameoverSection.setAttribute('id', 'gameover');
    gameoverSection.innerHTML='<br>GAMER-OVER<br>MOSQUITO DIED<br>'
    soundGame.pause()

    let restartButton = document.createElement('button');
    restartButton.setAttribute('id', 'restart');
    restartButton.textContent = 'Restart';

    // Eliminar el evento anterior antes de añadir uno nuevo
    restartButton.removeEventListener('click', restartGame);
    function restartGame() {
        resetGame(); // Reiniciar el juego
        gameoverSection.style.display = 'none';
        seccionJuego.style.display = 'block';
        score.style.display = 'inline';
        soundGame.currentTime = 0;
        soundGame.play();
        
    }
    restartButton.addEventListener('click', function(){
        start()
        gameoverSection.style.display = 'none'
        gameoverSwatter.style.display= 'none';
        seccionJuego.style.display = 'block'
        score.style.display = 'inline'
        soundGame.currentTime = 0
        soundGame.play()
    })

    restartButton.addEventListener('click', restartGame);
    gameoverSection.appendChild(restartButton);
    document.body.appendChild(gameoverSection);

    gameoverSection.style.display = 'block';
    seccionJuego.style.display = 'none';
    score.style.display = 'none'
}

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

    // Volver a iniciar el juego
    start();
}

function resetGameWithoutStart() {
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
    if (scoreNumber == 100){
        mosquito.win = true;
    }
}

function winBoard(){
    console.log('win')
    
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
        })


// SONIDOSS
let btnSound = document.getElementById('audioButton')
let buzz = new Audio('multimedia/mosquito.mp3')
let isPlaying = false;

//SONIDO DEL JUEGO
let soundGame = new Audio('multimedia/OST.mp3');
soundGame.volume = 0.30

//SONIDO GAME OVER
let soundGameOver = new Audio('multimedia/ended.mp3');

function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death && gameStarted){
        mosquito.setColliding(false);
        //alert('Mosquito is dead')
        clearInterval(playerTimeId)
        clearInterval(enemyTimeId)
        soundGameOver.play();
        showGameoverScreen();
        }
    if (mosquito.win){
        winBoard();
        resetGameWithoutStart();
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
}    

function createEnemy () {
    console.log("Creating enemy object.");
    randomY = Math.floor(Math.random() * 5) * 100
    swatter = new Enemy(1500, randomY, board, mosquito, flySwatters)
    flySwatters.push(swatter) 
    swatter.createFlySwatter() 

  }

  function createFlowers () {
    console.log(scoreNumber);
    randomYFlower = Math.floor(Math.random() * 5) * 100
    flower = new Flower(1400, randomYFlower, board, mosquito, flowers)
    flowers.push(flower) 
    flower.createFlower() 
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


/* EVENTO PARA MOVER A MOSQUITO

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        mosquito.directionX = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        mosquito.directionY = 0;
    }
});*/

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


//EVENTO BOTON START
startButton.addEventListener('click', function() {
    const seccionJuego = document.getElementById('seccion-juego');
    let gameStarted = true;
    soundGame.play()
});

/*CONDICION Y FUNCION PARA QUE SE MUEVAN MAS RAPIDO LOS SWATERS
creamos un if donde ponga la condicion que cuando el primer matamosca 
llege a mitad del tablero, aumente la velocidad el doble cada 10 seg CON UN SETTIMEOUT()
parar intervalo de cada setInterval y volver a iniciarlo*/

const swattermoving = function(){
    if (swatter.left > 50) {
        console.log("mas de medio")
    }
}


buzz.play()