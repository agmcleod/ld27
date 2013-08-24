game.Coin = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
      image: 'coin',
      spritewidth: 32,
      spriteheight: 32
    }
    this.parent(x, y, settings);
    this.z = 10;
    this.renderable.addAnimation('bounce',[0,1,2,3,4,3,2,1], 4);
    this.renderable.setAnimationFrame(Math.floor(Math.random() * 7));
  },

  onCollision: function() {
    this.collidable = false;
    me.audio.play('coin');
    me.game.world.removeChild(this);
    game.coins.remove(this);
  }
});