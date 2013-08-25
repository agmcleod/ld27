var game = {
  onload: function () {
    if (!me.video.init("screen", 960, 640, true, '1')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }
  
    if (document.location.hash === "#debug") {
      window.onReady(function () {
      me.plugin.register.defer(debugPanel, "debug");
      });
    }

    me.audio.init("mp3,ogg");
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(game.resources);
    me.state.change(me.state.LOADING);
  },

  loaded : function () {
    game.playScreen = new game.PlayScreen();
    me.state.set(me.state.PLAY, game.playScreen);
    me.sys.gravity = 0;
    me.entityPool.add("player", game.Player);
    me.entityPool.add("door", game.Door);

    me.state.change(me.state.PLAY);
  }
};
