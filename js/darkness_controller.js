game.DarknessController = Object.extend({
  init: function() {
    this.dark = new game.Darkness(0, 0, 'dark');
    this.light = new game.Darkness(0, 0, 'light');
    me.game.world.addChild(this.dark);
    me.game.world.addChild(this.light);
    this.flashed = false;
    this.flashedTime = me.timer.getTime()-10000;
  },
  update: function() {
    if(me.input.isKeyPressed('flash')) {
      if(!this.flashed && me.timer.getTime() - this.flashedTime > 10000) {
        this.dark.renderable.alpha = 0;
        this.flashed = true;
        this.flashedTime = me.timer.getTime();
      }
    }
    
    if(this.flashed) {
      var diff = (me.timer.getTime() - this.flashedTime);
      this.dark.renderable.alpha = diff / 5000;
      if(diff >= 10000) {
        this.flashed = false;
      }
    }
  }
});