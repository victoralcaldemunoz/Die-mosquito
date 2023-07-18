import { Player } from "./player.js";

const board = document.getElementById('board');
let mosquito = new Player(0, 200, board);
mosquito.createMosquito();
let moveId;

function movePlayer(){
     moveId = setInterval(playerMove, 50)

}

function playerMove(){
    mosquito.move()
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
})

window.addEventListener('keyup', function(e){
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        mosquito.directionX = 0;
        }
    if ( e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        mosquito.directionY = 0;
    }
})

movePlayer();





