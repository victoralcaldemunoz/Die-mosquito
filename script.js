import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

const board = document.getElementById('board');
let mosquito = new Player(0, 200, board);
let swatter = new Enemy (900, 200, board);
mosquito.createMosquito();
swatter.createFlySwatter();
let playerMoveId;
let enemyMoveId;


function movePlayer(){
     playerMoveId = setInterval(playerMove, 50)

}

function playerMove(){
    mosquito.move()
}

function moveEnemy(){
    enemyMoveId = setInterval(enemyMove, 50)

}

function enemyMove(){
    swatter.move()
}

window.addEventListener('keydown', function(e){
    switch (e.key){
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

window.addEventListener('keyup', function(e){
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        mosquito.directionX = 0;
        }
    if ( e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        mosquito.directionY = 0;
    }
})

movePlayer();
moveEnemy();





