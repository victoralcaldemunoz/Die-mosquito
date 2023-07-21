function Enemy (x, y,parent,arr ){
    let self = this;
    this.x = x
    this.y = y
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 0.5;
    this.sprite = document.createElement('div')
    this.timerId = setInterval(this.move, 100)

    this.insertFlySwatter = function(){ 
        this.sprite.classList.add('swatter')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
    }
    this.move = function(){
        
        self.x += self.speed
        self.sprite.style.top = self.x + 'px'

        if(self.x >=900){
            self.removeEnemy()
        }
        
    };
    this.removeEnemy = function(index){
        if (this.x > 950) {
          arr.shift() // El enemigo que ha llegado al borde inferior es el que más tiempo lleva en pantalla, por lo que es el primer elemento del array de enemigos. Lo quitamos con la función shift()
        } else {
          arr.splice(index, 1) // Si no ha llegado al borde inferior, eliminamos el elemento en el índice que hemos recibido desde la función 'checkCollision' de la bala que ha colisionado con este enemigo
        }
        parent.removeChild(this.sprite)
        clearInterval(this.timerId)
      }
    
    }
export { Enemy }