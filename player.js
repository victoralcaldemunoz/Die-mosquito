function Player (x, y, parent){
    let self = this;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 10;
    this.death = false;
    this.sprite = document.createElement('div');
 
    this.createMosquito = function(){
        this.sprite.classList.add('mosquito')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
    }
    this.move = function(){
        let newX = self.x + self.speed * self.directionX
        let newY = self.y + self.speed * self.directionY
        if (newX >= 0 && newX <= 900){
            self.x = newX
            self.sprite.style.left = self.x + 'px'
        }
        if (newY >= 0 && newY <= 450){
            self.y = newY
            self.sprite.style.top = self.y + 'px'
        }
    }  
}

export { Player }