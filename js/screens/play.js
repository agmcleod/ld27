game.PlayScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
  },

  onResetEvent: function() {  
    me.levelDirector.loadLevel('level');
    this.setupBinds();
    this.darknessController = new game.DarknessController();
    game.player = me.game.world.getEntityByProp('name', 'player')[0];
    me.game.world.addChild(this.darknessController);

    game.clock = new game.Clock();
    me.game.world.addChild(game.clock);

    this.setupCoins();
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

  setupBinds: function() {
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
  },

  setupCoins: function() {
    this.cols = me.game.currentLevel.width / 64;
    this.rows = me.game.currentLevel.height / 64;

    this.spawnX = Array(this.cols-1);
    for(var i = 1; i < this.cols; i++) {
      this.spawnX[i] = i * 64;
    }
    
    this.spawnY = Array(this.rows-1);
    for(var i = 1; i < this.rows; i++) {
      this.spawnY[i] = i * 64;
    }
    
    game.coins = Array(50);
    for(var i = 0; i < 50; i++) {
      this.spawnCoin(i);
    }
  },

  spawnCoin: function(i) {
    var xIndex = Math.floor(Math.random() * this.spawnX.length) + 1;
    var yIndex = Math.floor(Math.random() * this.spawnY.length) + 1;
    var x = this.spawnX[xIndex];
    var y = this.spawnX[yIndex];
    var coin = new game.Coin(x, y);
    me.game.world.addChild(coin);
    game.coins[i] = coin;
    this.spawnX.splice(xIndex, 1);
    this.spawnY.splice(yIndex, 1);
  }
});
