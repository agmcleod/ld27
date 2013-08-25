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
    this.canBePickedUp = true;
  },

  onCollision: function(res, obj) {
    if(this.canBePickedUp && obj.type === 'player') {
      this.collidable = false;
      this.canBePickedUp = false;
      me.audio.play('coin');
      this.visible = false;
      game.playScreen.removeCoin();
    }
    /* else if(obj.type !== 'trap') {
      this.canBePickedUp = true;
      this.target.x = this.pos.x;
      this.target.y = this.pos.y;
    } */
  },

  setTrajectory: function() {
    this.targetAngle = Math.floor(Math.random() * 360) * 180 / Math.PI;
    this.distance = Math.floor(Math.random() * 120) + 50;
    this.target.x = this.pos.x * Math.cos(this.targetAngle);
    this.target.y = this.pos.y * Math.sin(this.targetAngle);
    this.originalPos.x = this.pos.x;
    this.originalPos.y = this.pos.y;
    this.visible = true;
    this.collidable = true;
  },

  update: function() {
    this.parent();
    if(!this.canBePickedUp && this.visible) {
      this.vel.x = Math.cos(this.targetAngle) * this.accel.x * me.timer.tick;
      this.vel.y = Math.sin(this.targetAngle) * this.accel.y * me.timer.tick;
      var v = this.updateMovement();
      if(v.x || v.y) {
        this.canBePickedUp = true;
        this.target.x = this.pos.x;
        this.target.y = this.pos.y;
      }
      if(Math.abs(this.pos.x - this.originalPos.x) > this.distance || Math.abs(this.pos.y - this.originalPos.y) > this.distance) {
        this.canBePickedUp = true;
      }
    }
    return true;
  }
});