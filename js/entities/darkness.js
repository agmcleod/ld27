game.Darkness = me.Renderable.extend({
  init: function(x, y) {
    var settings = {
      image: 'darkness',
      spritewidth: 960,
      spriteheight: 640
    };
    this.player = me.game.world.getEntityByName('player')[0];
    this.image = me.loader.getImage(settings.image);
    this.parent(new me.Vector2d(x, y), settings.spritewidth, settings.spriteheight);
    this.z = 200;
    this.alwaysUpdate = true;
    this.floating = true;
  },

  draw: function(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, 0, 0, this.width, this.height, this.pos.x, this.pos.y, this.width, this.height);
    ctx.globalAlpha = 1;
  },

  update: function() {
    return true;
  }
});