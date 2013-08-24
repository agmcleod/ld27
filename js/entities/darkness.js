game.Darkness = me.ObjectEntity.extend({
  init: function(x, y) {
    var settings = {
      image: 'darkness',
      spritewidth: 960,
      spriteheight: 640
    };
    this.parent(x, y, settings);
    this.z = 200;
    this.flashed = false;
  },

  draw: function(ctx) {
    ctx.fillRect(this.pos.x, this.pos.y, 32, 32);
  }
});