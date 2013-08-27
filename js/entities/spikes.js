game.Spikes = me.Renderable.extend({
  init: function(x, y, trapParent) {
    var w = 32, h = 64;
    this.parent(new me.Vector2d(x, y-32), w, h);
    this.renderable = new me.AnimationSheet(0, 0, me.loader.getImage('trap'), w, h);
    this.renderable.addAnimation('fire', [1,2,3,4,4,4,4,3,2,1], 30);
    var _this = this;
    this.renderable.setCurrentAnimation('fire', function() {
      me.game.world.removeChild(_this);
      trapParent.collided = false;
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