game.Spikes = me.ObjectEntity.extend({
  init: function(x, y, trapParent) {
    this.parent(x, y, {
      image: 'trap',
      spritewidth: 32,
      spriteheight: 32
    });
    this.renderable.addAnimation('fire', [6,7,8,9,9,9,9,8,7], 10);
    var _this = this;
    this.renderable.setCurrentAnimation('fire', function() {
      me.game.world.removeChild(_this);
      trapParent.collided = false;
    });
    this.z = 501;
  }
});