game.Door = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    this.renderable.addAnimation('idle', [0], 1);
  },

  onCollision: function() {
    if(!game.playScreen.hasCoins() && game.playScreen.noActiveCoins()) {
      game.playScreen.endLevel();
    }
  }
});