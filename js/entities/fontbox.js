game.Fontbox = me.Rect.extend({
  init: function(font) {
    this.floating = true;
    this.parent(new me.Vector2d(30, 30), 100, 40);
    this.z = 500;
    this.name = 'fontbox';
    this.isRenderable = true;
    this.visible = true;
    this.font = font;
  },
  draw: function(context) {
    var amount = game.coins.length;
    if(game.intro) {
      this.font.draw(context, 'Give the shift or enter key a try.', this.pos.x, this.pos.y);
    }
    else if(amount < 10) {
      this.font.draw(context, amount + ' left', this.pos.x, this.pos.y);
    }
  },

  update: function() {
    return true;
  }
});