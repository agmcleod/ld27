game.Clock = me.AnimationSheet.extend({
  init: function() {
    var x = me.game.viewport.width - 80;
    var y = 30;
    this.parent(x, y, me.loader.getImage('clock'), 64, 64);
    this.addAnimation('0', [0], 1);
    this.addAnimation('1', [1], 1);
    this.addAnimation('2', [2], 1);
    this.addAnimation('3', [3], 1);
    this.addAnimation('4', [4], 1);
    this.addAnimation('5', [5], 1);
    this.addAnimation('6', [6], 1);
    this.addAnimation('7', [7], 1);
    this.addAnimation('8', [8], 1);
    this.addAnimation('9', [9], 1);
    this.setCurrentAnimation('0');
    this.floating = true;
    this.z = 500;
  }
});