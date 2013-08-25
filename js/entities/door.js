game.Door = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.renderable.addAnimation('idle', [0], 1);
  },

  onCollision: function() {
    if(game.coins.length == 0) {
      me.entityPool.purge();
      me.levelDirector.loadLevel('end');
    }
  }
});