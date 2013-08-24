game.DarknessController = Object.extend({
  init: function() {
    this.alwaysUpdate = true;
    this.drawFillers = false;
    this.dark = new game.Darkness(0, 0, 'dark');
    this.fillers = { vertical: new game.Space(), horizontal: new game.Space()};
    this.fillers.vertical.height = me.game.viewport.height;
    this.fillers.horizontal.width = me.game.viewport.width;
    this.light = new game.Darkness(0, 0, 'light');
    this.flashed = false;
    this.flashedTime = me.timer.getTime()-10000;
    this.halfPosition = new me.Vector2d(me.game.viewport.width / 2, me.game.viewport.height / 2);
    this.padding = new me.Vector2d(0,0);

    me.game.world.addChild(this.dark);
    me.game.world.addChild(this.light);
    me.game.world.addChild(this.fillers.vertical);
    me.game.world.addChild(this.fillers.horizontal);
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

    // update x
    if(me.game.viewport.pos.x > me.game.viewport.width) {
      this.padding.x = (game.player.pos.x - me.game.viewport.pos.x) - this.halfPosition.x;
    }
    else {
      this.padding.x = game.player.pos.x - this.halfPosition.x;
    }
    if(this.padding.x < 0) {
      this.fillers.vertical.pos.x = me.game.viewport.width + this.padding.x;
    }
    else {
      this.fillers.vertical.pos.x = 0;
    }
    this.fillers.vertical.width = Math.abs(this.padding.x);
    
    // update y
    if(me.game.viewport.pos.y > me.game.viewport.height) {
      this.padding.y = (game.player.pos.y - me.game.viewport.pos.y) - this.halfPosition.y;
    }
    else {
      this.padding.y = game.player.pos.y - this.halfPosition.y;
    }
    
    if(this.padding.y < 0) {
      this.fillers.horizontal.pos.y = me.game.viewport.height + this.padding.y;
    }
    else {
      this.fillers.horizontal.pos.y = 0;
    }
    this.fillers.horizontal.height = Math.abs(this.padding.y);
  }
});