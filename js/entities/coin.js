game.Coin = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
      image: 'coin',
      spritewidth: 32,
      spriteheight: 32
    }
    this.parent(x, y, settings);
    this.z = 10;
    this.setVelocity(14, 14);
    this.renderable.addAnimation('bounce', [0,1,2,3,4,3,2,1], 4);
    this.renderable.setAnimationFrame(Math.floor(Math.random() * 7));
    this.target = new me.Vector2d(x,y);
    this.originalPos = new me.Vector2d(x, y);
  },

  onCollision: function(res, obj) {
    if(obj.type === 'player') {
      this.collidable = false;
      me.audio.play('coin');
      this.visible = false;
      game.playScreen.removeCoin();
    }
    else if(obj.type !== 'trap') {
      this.collidable = true;
    }
  },

  setTrajectory: function() {
    this.targetAngle = Math.floor(Math.random() * 360) * 180 / Math.PI;
    this.distance = Math.floor(Math.random() * 120) + 50;
    this.target.x = this.pos.x * Math.cos(this.targetAngle);
    this.target.y = this.pos.y * Math.sin(this.targetAngle);
    this.originalPos.x = this.pos.x;
    this.originalPos.y = this.pos.y;
    this.visible = true;
  },

  update: function() {
    this.parent();
    if(!this.collidable && this.visible) {
      this.vel.x = Math.cos(this.targetAngle) * this.accel.x * me.timer.tick;
      this.vel.y = Math.sin(this.targetAngle) * this.accel.y * me.timer.tick;
      this.updateMovement();
      if(Math.abs(this.pos.x - this.originalPos.x) > this.distance || Math.abs(this.pos.y - this.originalPos.y) > this.distance) {
        this.collidable = true;
      }
    }
    return true;
  }
});