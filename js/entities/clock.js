game.Clock = me.Renderable.extend({
  init: function() {
    this.x = me.game.viewport.width - 80;
    this.y = 30;
    this.parent(new me.Vector2d(this.x, this.y), 64, 64);
    this.renderable = new me.AnimationSheet(0,0, me.loader.getImage('clock'), 64, 64);
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
    this.floating = true;
    this.z = 500;
  },

  draw: function(context) {
    context.translate(this.pos.x, this.pos.y);
    this.renderable.draw(context);
    context.translate(-this.pos.x, -this.pos.y);
  }
});