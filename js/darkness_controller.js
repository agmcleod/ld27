game.DarknessController = Object.extend({
  init: function() {
    this.alwaysUpdate = true;
    this.drawFillers = false;
    this.dark = new game.Darkness(0, 0, 'dark');
    this.flashed = false;
    this.flashedTime = me.timer.getTime()-10000;
    this.halfPosition = new me.Vector2d(me.game.viewport.width / 2, me.game.viewport.height / 2);
    this.padding = new me.Vector2d(0,0);
    this.z = 1;
    me.game.world.addChild(this.dark);
  },
  
  update: function() {
    if(me.input.isKeyPressed('flash')) {
      if(!this.flashed && me.timer.getTime() - this.flashedTime > 10000) {
        this.dark.alpha = 0;
        this.flashed = true;
        this.flashedTime = me.timer.getTime();
        game.intro = false;
      }
      if(this.flashed) game.player.setTarget();
    }
    
    if(this.flashed) {
      var diff = (me.timer.getTime() - this.flashedTime);
      this.dark.alpha = diff / 9000;
      if(diff >= 10000) {
        this.flashed = false;
        game.clock.setCurrentAnimation(0);
      }
      else {
        var frame = Math.floor(diff / 1000);
        game.clock.setCurrentAnimation('' + frame);
      }
    }
  }
});