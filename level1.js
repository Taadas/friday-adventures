Game.level1 = function(game) {

};

Game.level1.prototype = {
  create: function() {
    console.log('level1');
    this.game.add.tileSprite(0, 0, 1000, 600, 'meniuFonas');

    this.player = this.add.sprite(0, 0, 'veikejasAnimuotas');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;
    this.player.direction = 1;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.enemy = this.add.sprite(700, 0, 'veikejasAnimuotas');
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.gravity.y = 1000;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.direction = 1;
    this.enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    this.enemy.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.player.body.velocity.x = 0;
    //Playerio ir enemy collidinimas, su ismetama funkcija oncollide
    this.game.physics.arcade.overlap(this.player, this.enemy, function(){
      console.log("Collision");
    }.bind(this));

    if(this.cursors.left.isDown) {
    //  Move to the left
      this.player.body.velocity.x = -150;
      this.player.direction = -1;

      this.player.animations.play('left');
    }
    else if(this.cursors.right.isDown) {
    //  Move to the right
      this.player.body.velocity.x = 150;
      this.player.direction = 1;

      this.player.animations.play('right');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 4;
    }

  },

  render: function() {
      this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
  }
}
