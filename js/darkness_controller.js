game.DarknessController = Object.extend({
  init: function() {
    this.alwaysUpdate = true;
    this.drawFillers = false;
    this.dark = new game.Darkness(0, 0, 'dark');
    this.fillers = { vertical: new game.Space(), horizontal: new game.Space()};
    this.fillers.vertical.height = me.game.viewport.height;
    this.fillers.horizontal.width = me.game.viewport.width;
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
        this.dark.renderable.alpha = 0;
        this.flashed = true;
        this.flashedTime = me.timer.getTime();
        game.intro = false;
      }
    }
    
    if(this.flashed) {
      var diff = (me.timer.getTime() - this.flashedTime);
      this.dark.renderable.alpha = diff / 7000;
      if(diff >= 10000) {
        this.flashed = false;
        game.clock.renderable.setCurrentAnimation(0);
      }
      else {
        var frame = Math.floor(diff / 1000);
        game.clock.renderable.setCurrentAnimation('' + frame);
      }
    }
  }
});