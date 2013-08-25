game.PlayScreen = me.ScreenObject.extend({
  font: new me.Font('Arial', 32, 'white', 'left'),
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
    this.spawnTraps();
    this.setupCoins();

    game.intro = true;
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
    game.coins = [];
    for(var i = 0; i < 50; i++) {
      this.spawnCoin(i);
    }
    me.game.world.addChild(new game.Fontbox(this.font));
  },

  spawnCoin: function(i) {
    var collisionData = me.game.currentLevel.getLayerByName('collision').layerData;
    var rows = me.game.currentLevel.rows-5;
    var cols = me.game.currentLevel.cols-5;
    var r = null, c = null;

    while(r === null || c === null) {
      r = Math.floor(Math.random() * rows) + 4;
      c = Math.floor(Math.random() * cols) + 4;
      if(collisionData[c][r] !== null || (typeof this.traps[c] !== 'undefined' && typeof this.traps[c][r] !== 'undefined')) {
        r = null;
        c = null;
      }
    }
    var coin = new game.Coin(c * 32, r * 32);
    me.game.world.addChild(coin);
    game.coins[i] = coin;
  },

  spawnTraps: function() {
    this.traps = {};
    var collisionData = me.game.currentLevel.getLayerByName('collision').layerData;
    var rows = me.game.currentLevel.rows-5;
    var cols = me.game.currentLevel.cols-5;
    var r = null, c = null;
    while(r === null || c === null) {
      r = Math.floor(Math.random() * rows) + 4;
      c = Math.floor(Math.random() * cols) + 4;
      if(collisionData[c][r] !== null) {
        r = null;
        c = null;
      }
    }
    //this.traps[c] ? this.traps[c].push(r) : this.traps[c] = [r];
    this.traps[6] = [6];
    me.game.world.addChild(new game.Trap(6 * 32, 6 * 32));
  }
});
