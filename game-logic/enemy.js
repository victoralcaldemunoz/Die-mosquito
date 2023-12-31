function Enemy (x, y, parent, mosquito, enemies){
  let self = this;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.speed = 40;
  this.sprite = document.createElement('div')

  this.createFlySwatter = function(){
      this.sprite.classList.add('swatter')
      this.sprite.style.left = this.x + 'px'
      this.sprite.style.top = this.y + 'px'
      parent.appendChild(this.sprite)
  }

  this.move = function () {
      self.checkCollision()   
      self.x -= self.speed  
      self.sprite.style.left = self.x + 'px'
  
      if (self.x <= 0) {
        self.removeEnemy() 
      }
    }
      this.removeEnemy = function(index) {
        parent.removeChild(this.sprite);
        clearInterval(this.timerId);
        enemies.splice(index, 1)
    }
  this.checkCollision = function(){
      if (this.x + this.width >= mosquito.x &&    
          this.x <= mosquito.x + mosquito.width &&
          this.y + this.height >= mosquito.y &&   
          this.y <= mosquito.y + mosquito.height)  
      {  
          mosquito.death = true;
          mosquito.setColliding(true);
      }
  }
  this.timerId = setInterval(this.move, 150)
  }
export { Enemy }