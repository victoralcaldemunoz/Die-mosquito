const board = document.getElementById('board');
const player = new Mosquito(500, 250)

function Mosquito (x, y){
    this.x = x;
    this.y = y;

    this.sprite = document.createElement('div')

    this.createMosquito = function(){
        this.sprite.classList.add('mosquito')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        board.appendChild(this.sprite)
    }
}

player.createMosquito()