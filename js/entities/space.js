game.Space = me.ObjectEntity.extend({
  init: function() {
    this.parent(0, 0, {
      image: 'player',
      spritewidth: 64,
      spriteheight: 64
    });
    this.alwaysUpdate = true;
    this.z = 1000;
  },

  draw: function(context) {
    context.fillStyle = '#000';
    context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
});