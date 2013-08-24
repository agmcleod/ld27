game.Darkness = me.ObjectEntity.extend({
  init: function(x, y, type) {
    var settings = {
      image: 'darkness',
      spritewidth: 960,
      spriteheight: 640
    };
    this.parent(x, y, settings);
    this.renderable.addAnimation('dark', [0], 1);
    this.renderable.addAnimation('light', [1], 1);
    this.renderable.setCurrentAnimation(type);
    this.z = 200;
    this.type = type;
    if(type == 'light') this.z = 199;
    this.alwaysUpdate = true;
  },

  update: function() {
    if(this.type == 'dark') {
      this.pos.x = me.game.viewport.pos.x;
      this.pos.y = me.game.viewport.pos.y;
    }
    else {
      this.pos.x = game.player.pos.x - this.width / 2 + 32;
      this.pos.y = game.player.pos.y - this.height / 2 + 32;
    }
    return true;
  }
});