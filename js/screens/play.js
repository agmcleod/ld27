(function() {
  var maxCoins = 20;
  var coinCount;
  
  var coins = Array(coinCount);
  var noSpawn = {
    5: [29,30,31],
    6: [29,30,31],
    7: [29,30,31],
    8: [29,30,31],
    43: [31,32,33],
    44: [31,32,33],
    45: [31,32,33],
    46: [31,32,33],
  };
  var runtime;

  var isNotNull = function(value) {
    return typeof value !== 'undefined' && value !== null;
  }

  game.PlayScreen = me.ScreenObject.extend({
    font: new me.Font('Arial', 32, '#0c0', 'left'),
    init: function() {
      this.parent(true, true);
    },

    dropCoins: function() {
      coinCount = maxCoins;
      this.eachInactiveCoin(function(coin) {
        coin.pos.x = game.player.pos.x;
        coin.pos.y = game.player.pos.y;
        coin.setTrajectory();
      });
    },

    eachInactiveCoin: function(fn) {
      for(var i = 0; i < coins.length; i++) {
        var coin = coins[i];
        if(!coin.visible) {
          fn(coin);
        }
      }
    },

    endLevel: function() {
      this.gameOver = true;
      runtime = (me.timer.getTime() - this.startTime) / 1000;
      (function() {
        me.levelDirector.loadLevel('end');
        me.game.world.addChild(new game.Fontbox(game.playScreen.font, 50, 500));
      }).defer(this);
    },

    getMaxCoins: function() {
      return maxCoins;
    },

    getRandomCoinPosition: function() {
      var r = null, c = null;
      var collisionData = me.game.currentLevel.getLayerByName('collision').layerData;
      var rows = me.game.currentLevel.rows - 5;
      var cols = me.game.currentLevel.cols - 5;
      while(r === null || c === null) {
        r = Math.floor(Math.random() * rows) + 4;
        c = Math.floor(Math.random() * cols) + 4;
        if(collisionData[c][r] !== null || (isNotNull(this.traps[c]) && isNotNull(this.traps[c][r]))) {
          r = null;
          c = null;
        }
      }
      return {r:r,c:c};
    },

    getRuntime: function() {
      return runtime;
    },

    hasCoins: function() {
      return this.numberOfCoins() > 0;
    },

    initializeGame: function() {
      coinCount = maxCoins;
      this.gameOver = false;
      me.levelDirector.loadLevel('level');
      this.startTime = me.timer.getTime();
      this.setupBinds();
      this.darknessController = new game.DarknessController();
      game.player = me.game.world.getEntityByProp('name', 'player')[0];
      me.game.world.addChild(this.darknessController);

      game.clock = new game.Clock();
      me.game.world.addChild(game.clock);
      this.spawnTraps();
      this.setupCoins();
      me.game.world.addChild(new game.Fontbox(this.font));
    },

    noActiveCoins: function() {
      var inactiveCount = 0;
      this.eachInactiveCoin(function() {
        inactiveCount++;
      });
      return inactiveCount === maxCoins;
    },

    numberOfCoins: function() {
      return coinCount;
    },

    onResetEvent: function() {
      var coinCount = maxCoins;
      var coins = Array(coinCount);
      this.initializeGame();
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
      me.input.unbindMouse(me.input.mouse.LEFT);
      me.input.unbindTouch();
    },

    removeCoin: function(coin) {
      coinCount--;
      if(coinCount < 0) coinCount = 0;
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
      me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
      me.input.bindTouch(me.input.KEY.ENTER);
    },

    setupCoins: function() {
      for(var i = 0; i < maxCoins; i++) {
        this.spawnCoin(i);
      }
    },

    spawnCoin: function(i) {
      var pos = this.getRandomCoinPosition();
      var coin = new game.Coin(pos.c * 32, pos.r * 32);
      me.game.world.addChild(coin);
      coins[i] = coin;
    },

    spawnTraps: function() {
      this.traps = {};
      var collisionData = me.game.currentLevel.getLayerByName('collision').layerData;
      var rows = me.game.currentLevel.rows-5;
      var cols = me.game.currentLevel.cols-5;
      for(var i = 0; i < 17; i++) {
        var r = null, c = null;
        while(r === null || c === null) {
          r = Math.floor(Math.random() * rows) + 4;
          c = Math.floor(Math.random() * cols) + 4;
          if(collisionData[c][r] !== null || (isNotNull(noSpawn[c]) && noSpawn[c].indexOf(r) != -1) || (isNotNull(this.traps[c]) && isNotNull(this.traps[c][r]))) {
            r = null;
            c = null;
          }
        }
        this.traps[c] ? this.traps[c].push(r) : this.traps[c] = [r];
        me.game.world.addChild(new game.Trap(c * 32, r * 32));
      }
    },

    update: function() {
      if(this.gameOver && me.input.isKeyPressed('flash')) {
        this.initializeGame();
      }
      return true;
    }
  });

}).call(this);
