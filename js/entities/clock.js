game.Clock = me.ObjectEntity.extend({
  init: function() {
    this.x = me.game.viewport.width - 80;
    this.y = 30;
    this.parent(this.x, this.y, {
      image: 'clock',
      spritewidth: 64, 
      spriteheight: 64
    });
    this.renderable.addAnimation('0', [0], 1);
    this.renderable.addAnimation('1', [1], 1);
    this.renderable.addAnimation('2', [2], 1);
    this.renderable.addAnimation('3', [3], 1);
    this.renderable.addAnimation('4', [4], 1);
    this.renderable.addAnimation('5', [5], 1);
    this.renderable.addAnimation('6', [6], 1);
    this.renderable.addAnimation('7', [7], 1);
    this.renderable.addAnimation('8', [8], 1);
    this.renderable.addAnimation('9', [9], 1);
    this.renderable.setCurrentAnimation('0');
    this.z = 500;
  },

  update: function() {
    this.parent();
    this.pos.x = this.x + me.game.viewport.pos.x;
    this.pos.y = this.y + me.game.viewport.pos.y;
    return true;
  }
});