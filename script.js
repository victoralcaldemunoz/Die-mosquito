
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

const board = document.getElementById('board');
let mosquito = new Player(0, 200, board);
let arrEnemy = []
let playerMoveId;
let enemyMoveId;

function start(){
    mosquito.createMosquito();
    playerMoveId = setInterval(playerMove, 50);
    enemyMoveId = setInterval(createEnemy, 2000)
}

function playerMove() {
    mosquito.move();
}

function createEnemy(){
    setInterval(enemy.move)

    let randomY = Math.floor(Math.random() * 5) * 50
    let enemy = new Enemy(950, randomY, board);
    arrEnemy.push(enemy)
    enemy.insertFlySwatter()
    
    
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









