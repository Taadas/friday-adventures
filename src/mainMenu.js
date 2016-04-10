Game.mainMenu = function(game) {

};

Game.mainMenu.prototype = {
	create: function() {
		music = this.game.add.audio('bgMusic');
		music.play();

		this.game.add.tileSprite(0, 0, 1000, 600, 'meniuFonas');
		this.button = this.game.add.button(this.game.world.centerX - 240, this.game.world.centerY + 100, 'meniuPradeti', this.startCharSelection, this, 1, 0);
	},

	startCharSelection: function() {
		this.state.start('charSelection');
	}
}
