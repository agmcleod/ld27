game.Darkness = me.SpriteObject.extend({
  init: function(x, y) {
    this.parent(x, y, settings);
    this.z = 200;
    this.flashed = false;
  },

  draw: function(ctx) {
    ctx.fillRect(this.pos.x, this.pos.y, 32, 32);
  }
});