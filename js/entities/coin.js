game.Coin = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
      image: 'coin',
      spritewidth: 64,
      spriteheight: 64
    }
    this.parent(x, y, settings);
    this.z = 10;
    this.renderable.addAnimation('bounce',[0,1,2,3,4,5,6,7], 4);
  },

  onCollision: function() {
    this.collidable = false;
    me.audio.play('coin');
    me.game.world.removeChild(this);
    game.coins.remove(this);
  }
});