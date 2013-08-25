game.Spikes = me.ObjectEntity.extend({
  init: function(x, y, trapParent) {
    this.parent(x, y-32, {
      image: 'trap',
      spritewidth: 32,
      spriteheight: 64
    });
    this.renderable.addAnimation('fire', [1,2,3,4,4,4,4,3,2,1], 30);
    var _this = this;
    this.renderable.setCurrentAnimation('fire', function() {
      me.game.world.removeChild(_this);
      trapParent.collided = false;
    });
    this.z = 220;
  }
});