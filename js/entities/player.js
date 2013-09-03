game.Player = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.renderable.addAnimation('top', [0,4,8,12], 100);
    this.renderable.addAnimation('right', [1,5,9,13], 100);
    this.renderable.addAnimation('bottom', [2,6,10,14], 100);
    this.renderable.addAnimation('left', [3,7,11,15], 100);
    this.renderable.addAnimation('topStill', [0], 1);
    this.renderable.addAnimation('rightStill', [1], 1);
    this.renderable.addAnimation('bottomStill', [2], 1);
    this.renderable.addAnimation('leftStill', [3], 1);
    this.renderable.setCurrentAnimation('rightStill');
    this.setVelocity(10, 10);
    this.updateColRect(20, 21, 5, 59);
    this.direction = 'right';
    this.target = new me.Vector2d(0,0);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.type = 'player';
  },

  dontGoOutOfMap: function() {
    if(this.pos.y + this.height > me.game.currentLevel.height) {
      this.vel.y = 0;
      this.pos.y = me.game.currentLevel.height - this.height;
    }
    if(this.pos.x < 0) {
      this.pos.x = 0;
    }
    if(this.pos.y < 0) {
      this.pos.y = 0;
    }
    if(this.pos.x + this.width > me.game.currentLevel.width) {
      this.pos.x = me.game.currentLevel.width - this.width;
    }
  },

  keyboardInput: function() {
    var stopped;
    if(me.input.isKeyPressed('up')) {
      this.vel.y -= this.accel.y * me.timer.tick;
      this.direction = 'top';
    }
    else if(me.input.isKeyPressed('down')) {
      this.vel.y += this.accel.y * me.timer.tick;
      this.direction = 'bottom';
    }
    else {
      if(this.vel.y != 0) {
        stopped = true;
      }
      this.vel.y = 0;
    }
    if(me.input.isKeyPressed('left')) {
      this.vel.x -= this.accel.y * me.timer.tick;
      this.direction = 'left';
    }
    else if(me.input.isKeyPressed('right')) {
      this.vel.x += this.accel.y * me.timer.tick;
      this.direction = 'right';
    }
    else {
      if(this.vel.x != 0) {
        stopped = true;
      }
      this.vel.x = 0;
    }
    return stopped;
  },

  setTarget: function() {
    if(game.playScreen.darknessController.flashed) {
      this.moving = true;
      var canvas = me.video.getScreenCanvas();
      var pos = me.input.mouse.pos;
      this.target.x = (pos.x + me.game.viewport.pos.x) - this.renderable.width / 2;
      this.target.y = (pos.y + me.game.viewport.pos.y) - this.renderable.height / 2;
      var tx = this.target.x, ty = this.target.y, px = this.pos.x, py = this.pos.y;
      var h = tx - px, v = ty - py;
      if(Math.abs(h) > Math.abs(v)) {
        if(h < 0) {
          this.direction = 'left';
        }
        else {
          this.direction = 'right';
        }
      }
      else {
        if(v < 0) {
          this.direction = 'top';
        }
        else {
          this.direction = 'bottom';
        }
      }
    }
  },

  touchInput: function() {
    switch(this.direction) {
      case 'top':
        if(this.pos.y < this.target.y) {
          this.pos.x = this.target.x;
          this.pos.y = this.target.y;
        }
        break;
      case 'right':
        if(this.pos.x > this.target.x) {
          this.pos.x = this.target.x;
          this.pos.y = this.target.y;
        }
        break;
      case 'bottom':
        if(this.pos.y > this.target.y) {
          this.pos.x = this.target.x;
          this.pos.y = this.target.y;
        }
        break;
      case 'left':
        if(this.pos.x < this.target.x) {
          this.pos.x = this.target.x;
          this.pos.y = this.target.y;
        }
        break;
    };
    if(this.pos.x === this.target.x && this.pos.y === this.target.y) {
      this.vel.x = 0;
      this.vel.y = 0;
      this.moving = false;
    }
    else {
      var angle = Math.atan2(this.target.y - this.pos.y, this.target.x - this.pos.x) * (180 / Math.PI);
      this.vel.x = Math.cos(angle * Math.PI / 180) * this.accel.x * me.timer.tick;
      this.vel.y = Math.sin(angle * Math.PI / 180) * this.accel.y * me.timer.tick;
    }
  },

  update: function() {
    var stopped;
    if(me.sys.isMobile && this.moving) {
      this.touchInput();
    }
    else {
      stopped = this.keyboardInput();
    }
    

    this.updateMovement();
    if(!this.renderable.isCurrentAnimation(this.direction) || stopped) {
      if(this.vel.x != 0 || this.vel.y != 0) {
        this.renderable.setCurrentAnimation(this.direction);
      }
      else {
        this.renderable.setCurrentAnimation(this.direction + 'Still');
      }
    }
    me.game.world.collide(this);
    this.dontGoOutOfMap();
    this.parent();
    
    return true;
  }
});