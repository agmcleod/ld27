game.PlayScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
  },

  onResetEvent: function() {  
    me.levelDirector.loadLevel('level');
    me.input.bindKey(me.input.KEY.W, 'up');
    me.input.bindKey(me.input.KEY.A, 'left');
    me.input.bindKey(me.input.KEY.S, 'down');
    me.input.bindKey(me.input.KEY.D, 'right');
    me.input.bindKey(me.input.KEY.UP, 'up');
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.DOWN, 'down');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.TAB, 'flash', true);
    me.input.bindKey(me.input.KEY.ENTER, 'flash', true);
    this.darknessController = new game.DarknessController();
    game.player = me.game.world.getEntityByProp('name', 'player')[0];
  },
  
  
  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.W);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.S);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.UP);
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.DOWN);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.TAB);
    me.input.unbindKey(me.input.KEY.ENTER);
  },

  update: function() {
    this.parent();
    this.darknessController.update();
  }
});
