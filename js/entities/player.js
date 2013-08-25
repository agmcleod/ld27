game.Player = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.setVelocity(10, 10);
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
    if(me.input.isKeyPressed('up')) {
      this.vel.y -= this.accel.y * me.timer.tick;
    }
    else if(me.input.isKeyPressed('down')) {
      this.vel.y += this.accel.y * me.timer.tick;
    }
    else {
      this.vel.y = 0;
    }
    if(me.input.isKeyPressed('left')) {
      this.vel.x -= this.accel.y * me.timer.tick;
    }
    else if(me.input.isKeyPressed('right')) {
      this.vel.x += this.accel.y * me.timer.tick;
    }
    else {
      this.vel.x = 0;
    }
    this.updateMovement();
    me.game.world.collide(this);
    this.dontGoOutOfMap();
    this.parent();
    
    return true;
  }
});