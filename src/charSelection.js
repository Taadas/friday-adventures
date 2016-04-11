var selectedChar;

Game.charSelection = function(game) {

};

Game.charSelection.prototype = {
  create: function() {
    this.game.add.tileSprite(0, 0, 1000, 600, 'pasirinkimasFonas');
    this.button1 = this.game.add.button(170, this.game.world.centerY - 50, 'bachuras1', this.selectChar1, this);
    this.button2 = this.game.add.button(410, this.game.world.centerY - 50, 'bachuras2', this.selectChar2, this);
    this.button3 = this.game.add.button(643, this.game.world.centerY - 50, 'bachuras3', this.selectChar3, this);
    this.button1.events.onInputOver.add(function() {this.button1.y -= 10;}, this);
    this.button1.events.onInputOut.add(function() {this.button1.y += 10;}, this);
    this.button2.events.onInputOver.add(function() {this.button2.y -= 10;}, this);
    this.button2.events.onInputOut.add(function() {this.button2.y += 10;}, this);
    this.button3.events.onInputOver.add(function() {this.button3.y -= 10;}, this);
    this.button3.events.onInputOut.add(function() {this.button3.y += 10;}, this);
  },
  selectChar1: function() {
    selectedChar = 0;
    this.state.start('level1');
  },
  selectChar2: function() {
    selectedChar = 1;
    this.state.start('level1');
  },
  selectChar3: function() {
    selectedChar = 3;
    this.state.start('level1');
  }
}
