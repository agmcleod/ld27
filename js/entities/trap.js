game.Trap = me.ObjectEntity.extend({
  init: function(x, y) {
    this.parent(x, y, {
      image: 'trap',
      spritewidth: 32,
      spriteheight: 32
    });
    this.renderable.addAnimation('idle', [0], 1);
    this.renderable.setCurrentAnimation('idle');
    this.z = 200;
    this.collided = false;
  },

  onCollision: function(res, obj) {
    if(!this.collided && obj.type == 'player') {
      this.collided = true;
      console.log('collide');
      me.game.world.addChild(new game.Spikes(this.pos.x, this.pos.y, this));
      me.game.world.addChild(new game.Blood(this.pos.x, this.pos.y));
    }
  }
});