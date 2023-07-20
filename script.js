import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Princess } from "./princess.js";

const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById("startButton")
const seccionJuego = document.getElementById('seccion-juego')

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
    guayarmina.createPrincess();
}

function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death === true){
        alert('Mosquito is dead')
        clearInterval(playerTimeId)
        clearInterval(enemyTimeId)
    }
}

function createEnemy () {
    console.log("Creating enemy object.");
    randomY = Math.floor(Math.random() * 10) * 50
    swatter = new Enemy(950, randomY, board, mosquito, flySwatters)
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

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        mosquito.directionX = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        mosquito.directionY = 0;
    }
});

btnIniciarJuego.addEventListener('click', function(){
    start();
  document.getElementById('intro').style.display = 'none';
  seccionJuego.style.display = 'block';
})

