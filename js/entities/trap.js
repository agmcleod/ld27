game.Trap = me.ObjectEntity.extend({
  init: function(x, y) {
    this.parent(x, y, {
      image: 'trap',
      spritewidth: 32,
      spriteheight: 32
    });
    this.renderable.addAnimation('idle', [0], 1);
    this.renderable.setCurrentAnimation('idle');
    this.z = 50;
    this.collided = false;
    this.type = 'trap';
  },

  onCollision: function(res, obj) {
    if(!this.collided && obj.type == 'player') {
      this.collided = true;
      var grunt; 
      if(Math.floor(Math.random() * 2) == 0) {
        grunt = 'grunt';
      }
      else {
        grunt = 'grunt2';
      }
      game.playScreen.dropCoins();
      me.audio.play(grunt);
      var spike = new game.Spikes(this.pos.x, this.pos.y, this);
      var blood = new game.Blood(this.pos.x, this.pos.y);
      (function() { me.game.world.addChild(spike) }).defer(this);
      (function() { me.game.world.addChild(blood) }).defer(this);
    }
  }
});