function Enemy (x, y, parent, mosquito, enemies){
  console.log("Creating enemy object.");
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
    this.removeEnemy = function(i){
      if (this.x === 0) {
        enemies.shift() 
      }
      parent.removeChild(this.sprite)
      clearInterval(this.timerId)
      }
      this.removeEnemyRestart = function() {
        parent.removeChild(this.sprite);
        clearInterval(this.timerId);
    }
  this.checkCollision = function(){
      if (this.x + this.width >= mosquito.x &&    
          this.x <= mosquito.x + mosquito.width &&
          this.y + this.height >= mosquito.y &&   
          this.y <= mosquito.y + mosquito.height)  
      {  
          console.log('collision')
          mosquito.death = true;
          mosquito.setColliding(true);
      }
  }

  this.timerId = setInterval(this.move, 150)
  }
export { Enemy }