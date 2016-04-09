Game.preloader = function(game) {
};

Game.preloader.prototype = {
  preload: function () {
    console.log("PRELOAD");
    //Load All assets----------------------------------------
    this.game.load.image('dialogBaloon1', 'assets/dialogueBaloon1.png');
    this.game.load.image('choice1', 'assets/choice1.png');
    this.game.load.image('choice2', 'assets/choice2.png');


    this.load.spritesheet('meniuPradeti', 'assets/meniuPradeti.png', 479, 108);
    this.game.load.image('meniuFonas','assets/meniuFonas.png');
    this.game.load.image('meniuPavadinimas','assets/meniuPavadinimas.png');
    this.game.load.image('pasirinkimasFonas','assets/pasirinkimasFonas.png');
    this.game.load.image('veikejas','assets/veikejas.png');
    this.game.load.image('punch','assets/pink.png');
    this.load.spritesheet('veikejasAnimuotas', 'assets/veikejasAnimuotas.png', 90, 141);
    this.load.image('zenklasStotis', 'assets/zenklasStotis.png');
    this.load.image('zenklasPozemine', 'assets/zenklasPozemine.png');
    this.load.image('zenklasTraku', 'assets/zenklasTraku.png');
    this.load.image('klubas', 'assets/klubas.png');
    this.load.image('suoliukas', 'assets/suoliukas.png');
    this.load.image('stulpeliai', 'assets/stulpeliai.png');
    this.load.image('tuscias', 'assets/tuscias.png');

    this.load.tilemap('level1Map', 'assets/level1Map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('level1Background','assets/level1Background.png');
  },

  create: function() {
    this.state.start('mainMenu');
  }
}
