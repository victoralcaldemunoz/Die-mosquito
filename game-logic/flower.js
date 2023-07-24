function Flower(x, y, parent, mosquito, flowerArray) {
    let self = this;
    this.x = x;
    this.y = y;
    this.width = 50; 
    this.height = 50; 
    this.health = 100; 
    this.speed = 30;
    this.score = document.getElementById('score')
    this.sprite = document.createElement('div');

    this.createFlower = function(){
        this.sprite.classList.add('flower');
        this.sprite.style.left = this.x + 'px';
        this.sprite.style.top = this.y + 'px';
        parent.appendChild(this.sprite);
    }

    this.moveFlower = function () {
        self.checkCollisionFlower();
        self.x -= self.speed;
        self.sprite.style.left = self.x + 'px';
    
        if (self.x <= 0) {
            self.removeFlower();
        }
    }

    this.checkCollisionFlower = function(){
        if (this.x + this.width >= mosquito.x &&    
            this.x <= mosquito.x + mosquito.width &&
            this.y + this.height >= mosquito.y &&   
            this.y <= mosquito.y + mosquito.height)  
        {  
            console.log('take points');
            console.log(this)
            // self.addScore();
            // self.removeFlower();
            return true
        }
    }

    this.removeFlower = function(index) {
        parent.removeChild(this.sprite);
        clearInterval(this.timerId);
        flowerArray.splice(index, 1)
    }

    this.timerId = setInterval(this.moveFlower, 150);
}

export { Flower };
