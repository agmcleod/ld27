game.Blood = me.Renderable.extend({
  init: function(x, y) {
    var w = 32, h = 32;
    this.parent(new me.Vector2d(x, y), w, h);
    this.renderable = new me.AnimationSheet(0, 0, me.loader.getImage('trap'), w, h);
    this.renderable.addAnimation('splat', [5,5,5,5,10,11,12,13,14], 30);
    var _this = this;
    this.renderable.setCurrentAnimation('splat', function() {
      me.game.world.removeChild(_this);
      return false;
    });
    this.z = 220;
  },

  draw: function(context) {
    this.parent(context);
    context.translate(this.pos.x, this.pos.y);
    this.renderable.draw(context);
    context.translate(-this.pos.x, -this.pos.y);
  }
});