Game.charSelection = function(game) {

};

Game.charSelection.prototype = {
  create: function() {
    this.game.add.tileSprite(0, 0, 1000, 600, 'pasirinkimasFonas');
    this.button = this.game.add.button(170, this.game.world.centerY - 50, 'veikejas', this.selectChar1, this);
    this.button = this.game.add.button(410, this.game.world.centerY - 50, 'veikejas', this.selectChar1, this);
    this.button = this.game.add.button(643, this.game.world.centerY - 50, 'veikejas', this.selectChar1, this);
  },
  selectChar1: function() {
    this.state.start('level1');
  }
}
