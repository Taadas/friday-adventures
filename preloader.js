Game.preloader = function(game) {
};

Game.preloader.prototype = {
  preload: function () {
    console.log("PRELOAD");
    //Load All assets----------------------------------------

    this.load.spritesheet('meniuPradeti', 'assets/meniuPradeti.png', 479, 108);
    this.game.load.image('meniuFonas','assets/meniuFonas.png');
    this.game.load.image('meniuPavadinimas','assets/meniuPavadinimas.png');
    this.game.load.image('pasirinkimasFonas','assets/pasirinkimasFonas.png');
    this.game.load.image('veikejas','assets/veikejas.png');
    this.load.spritesheet('veikejasAnimuotas', 'assets/veikejasAnimuotas.png', 90, 141);
  },

  create: function() {
    this.state.start('mainMenu');
  }
}
