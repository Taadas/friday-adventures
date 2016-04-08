Game.mainMenu = function(game) {

};

Game.mainMenu.prototype = {
  create: function() {
    this.game.add.tileSprite(0, 0, 1000, 600, 'meniuFonas');
    this.game.add.tileSprite(this.game.world.centerX - 162, 100, 304, 273, 'meniuPavadinimas');
    this.button = this.game.add.button(this.game.world.centerX - 240, this.game.world.centerY + 100, 'meniuPradeti', this.startCharSelection, this, 1, 0);

    //this.startButton.onInputOver.add(over, this);
    //this.startButton.onInputOut.add(out, this);
  },

  startCharSelection: function() {
    this.state.start('charSelection');
  }

  //startButtonOver:function() {
  //  console.log('button over');
  //}

  //startButtonOut:function() {
  //  console.log('button out');
  //}
}
