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
    this.offsetX = null;
    this.offsetY = null;
  },

  update: function() {
    if(game.player.vel.x != 0) {
      if(game.player.vel.x < 0) {
        this.offsetX = -10;
      }
      else {
        this.offsetX = 10;
      }
    }
    else {
      this.offsetX = 0;
    }
    if(game.player.vel.y != 0) {
      if(game.player.vel.y < 0) {
        this.offsetY = -10;
      }
      else {
        this.offsetY = 10;
      }
    }
    else {
      this.offsetY = 0;
    }
    if(this.type == 'dark') {
      this.pos.x = me.game.viewport.pos.x + this.offsetX;
      this.pos.y = me.game.viewport.pos.y + this.offsetY;
    }
    else {
      this.pos.x = game.player.pos.x - this.width / 2 + 32;
      this.pos.y = game.player.pos.y - this.height / 2 + 32;
    }
    return true;
  }
});