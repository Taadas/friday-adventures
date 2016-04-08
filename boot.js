var Game = {};

Game.boot = function(game) {

};

Game.boot.prototype = {
  preload: function() {
    console.log("BOOT");
  },
  create: function() {
    //Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('preloader');
  }
};
