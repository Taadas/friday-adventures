

Game.preloader = function(game) {
};

Game.preloader.prototype = {
	preload: function () {
		console.log("PRELOAD");
		//Load All assets----------------------------------------
		this.game.load.image('dialogas1', 'assets/dialogas1.png');
		this.game.load.image('dialogas11', 'assets/dialogas1pirmas.png');
		this.game.load.image('dialogas12', 'assets/dialogas1antras.png');

		this.game.load.image('dialogas2', 'assets/dialogas2.png');
		this.game.load.image('dialogas21', 'assets/dialogas2pirmas.png');
		this.game.load.image('dialogas22', 'assets/dialogas2antras.png');

		this.game.load.audio('bgMusic', ['assets/audio/bg.mp3']);

		this.load.spritesheet('meniuPradeti', 'assets/meniuPradeti.png', 479, 108);
		this.game.load.image('meniuFonas','assets/meniuFonas.png');
		this.game.load.image('meniuPavadinimas','assets/meniuPavadinimas.png');
		this.game.load.image('pasirinkimasFonas','assets/pasirinkimasFonas.png');
		this.game.load.image('veikejas','assets/veikejas.png');
		this.game.load.image('punch','assets/pink.png');
		this.game.load.image('bachuras1','assets/bachuras1.png');
		this.game.load.image('bachuras2','assets/bachuras2.png');
		this.game.load.image('bachuras3','assets/bachuras3.png');
		this.game.load.image('newspaper','assets/newspaper.png');
		this.load.spritesheet('veikejasAnimuotas1', 'assets/veikejasAnimuotas1.png', 90, 141);
		this.load.spritesheet('veikejasAnimuotas2', 'assets/veikejasAnimuotas2.png', 90, 141);
		this.load.spritesheet('veikejasAnimuotas3', 'assets/veikejasAnimuotas3.png', 90, 141);
		this.load.image('zenklasStotis', 'assets/zenklasStotis.png');
		this.load.image('zenklasPozemine', 'assets/zenklasPozemine.png');
		this.load.image('zenklasTraku', 'assets/zenklasTraku.png');
		this.load.image('klubas', 'assets/klubas.png');
		this.load.image('suoliukas', 'assets/suoliukas.png');
		this.load.image('stulpeliai', 'assets/stulpeliai.png');
		this.load.image('money', 'assets/money.png');
		this.load.image('tuscias', 'assets/tuscias.png');
		this.load.image('heart', 'assets/heart.png');
		this.load.image('apsauginis', 'assets/apsauginis.png');
		this.load.image('dialogas3', 'assets/dialogas3.png');
		this.game.load.audio('bgMusic', ['assets/audio/bg.mp3']);

		this.load.tilemap('level1Map', 'assets/level1Map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('level1Background','assets/level1Background.png');
	},

	create: function() {
		this.state.start('mainMenu');
	}
}
