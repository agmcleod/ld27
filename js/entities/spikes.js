game.Spikes = me.AnimationSheet.extend({
  init: function(x, y, trapParent) {
    var w = 32, h = 64;
    this.parent(x, y-32, me.loader.getImage('trap'), w, h);
    this.addAnimation('fire', [1,2,3,4,4,4,4,3,2,1], 30);
    var _this = this;
    this.setCurrentAnimation('fire', function() {
      me.game.world.removeChild(_this);
      trapParent.collided = false;
    });
    this.z = 220;
  }
});