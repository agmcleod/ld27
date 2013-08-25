game.Fontbox = me.Rect.extend({
  init: function(font, x, y) {
    this.floating = true;

    this.parent(new me.Vector2d(x || 30, y || 30), 100, 40);
    this.z = 500;
    this.name = 'fontbox';
    this.isRenderable = true;
    this.visible = true;
    this.font = font;
  },
  draw: function(context) {
    var amount = game.playScreen.numberOfCoins();
    if(game.intro) {
      this.font.draw(context, 'Give the tab or enter key a try.', this.pos.x, this.pos.y);
    }
    else if(game.playScreen.gameOver) {
      this.font.draw(context, 'You won in '+ game.playScreen.getRuntime() +' seconds. Press enter to play again.', this.pos.x, this.pos.y);
    }
    else if(amount === game.playScreen.getMaxCoins()) {
      this.font.draw(context, 'Try collecting some coins around.', this.pos.x, this.pos.y);
    }
    else if(amount > 0 && amount < 5) {
      this.font.draw(context, amount + ' left', this.pos.x, this.pos.y);
    }
    else if(amount == 0) {
      this.font.draw(context, 'Pay the exit', this.pos.x, this.pos.y);
    }
  },

  update: function() {
    return true;
  }
});