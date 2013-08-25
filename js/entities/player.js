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

  update: function() {
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