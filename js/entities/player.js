game.Player = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.setVelocity(10, 10);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.z = 100;
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
    if(this.pos.y + this.height > me.game.currentLevel.rows * 32) {
      this.vel.y = 0;
      this.pos.y = me.game.currentLevel.rows * 32 - 64;
    }
    this.parent();
    
    return true;
  }
});