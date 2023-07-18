import { Player } from "./player.js";  // Importamos los datos de Player en el JS principal
import { Enemy } from ".enemy.js"; // Importamos los datos del Enemigo en el JS principal


const board = document.getElementById('board'); //Traemos el container principal donde nos referenciaremos para crear las cosas desde el JS
let mosquito = new Player(0, 200, board); // creamos un jugador con sus parametros.
mosquito.createMosquito();  //Hacemos funcionar para que se cree nuestro jugador
let moveId; //creamo una variable de movimiento

function movePlayer(){ //Creamos una función para darle velocidad al jugador
     moveId = setInterval(playerMove, 50) 
}

function playerMove(){  //Creamos una función para crear el movimiento del jugador, dicho movimiento fue creada en el JS de Player.
    mosquito.move()
}

window.addEventListener('keydown', function(e){  //Creamos los botones de funcionamiento de nuestro jugador
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

window.addEventListener('keyup', function(e){  //
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        mosquito.directionX = 0;
        }
    if ( e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        mosquito.directionY = 0;
    }
})

movePlayer(); //Hacemos funcionar al Jugador





