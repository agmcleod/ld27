game.Blood = me.ObjectEntity.extend({
  init: function(x, y) {
    this.parent(x, y, {
      image: 'trap',
      spritewidth: 32,
      spriteheight: 32
    });
    this.renderable.addAnimation('splat', [5,5,5,5,10,11,12,13,14], 10);
    var _this = this;
    this.renderable.setCurrentAnimation('splat', function() {
      me.game.world.removeChild(_this);
    });
    this.z = 501;
  }
});