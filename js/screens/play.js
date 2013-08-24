game.PlayScreen = me.ScreenObject.extend({
  /**  
   *  action to perform on state change
   */
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

    me.game.world.addChild(new game.Darkness(32, 32));
  },
  
  
  /**  
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.W);
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.S);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.UP);
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.DOWN);
    me.input.unbindKey(me.input.KEY.RIGHT);
  }
});
