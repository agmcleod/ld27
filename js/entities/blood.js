game.Blood = me.AnimationSheet.extend({
  init: function(x, y) {
    var w = 32, h = 32;
    this.parent(x, y, me.loader.getImage('trap'), w, h);
    this.addAnimation('splat', [5,5,5,5,10,11,12,13,14], 30);
    var _this = this;
    this.setCurrentAnimation('splat', function() {
      me.game.world.removeChild(_this);
      return false;
    });
    this.z = 220;
  }
});