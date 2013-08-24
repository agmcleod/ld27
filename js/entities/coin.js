game.Coin = me.CollectableEntity.extend({
  init: function(x, y) {
    var settings = {
      image: 'coin',
      spritewidth: 64,
      spriteheight: 64
    }
    this.parent(x, y, settings);
  },

  onCollision: function() {
    this.collidable = false;
    me.game.world.removeChild(this);
  }
});