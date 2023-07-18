import { mosquito } from "./script.js";

function Enemy (x, y,parent ){
    let self = this;
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 6;
    this.sprite = document.createElement('div')


    this.createFlySwatter = function(){
        this.sprite.classList.add('swatter')
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
            if (newY >= 0 && newY <= 400){
                self.y = newY
                self.sprite.style.top = self.y + 'px'
        }
            if (self.x >= 900) {
            self.directionX = -1; 
        } else if (newX <= 0){
            self.x = 900;
        }
    };
    this.checkCollision = function(){
        if ( this.y + this.height >= mosquito.y &&
            this.y <= mosquito.y + mosquito.height &&
            this.x + this.width >= mosquito.x &&
            this.x <= mosquito.x + mosquito.width    
        ){  
            console.log('collision')  
        }
    }
    
    }
export { Enemy }