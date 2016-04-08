Game.Level1 =  function(game) {};

Game.Level1.prototype = {
  preload: function() {
    this.game.time.advancedTiming = true;
  },

  create: function() {
    console.log("LEVEL1");

    //Sukuriam tilemapa
    this.nextFire = 0;
    this.fireRate = 100;
    this.shotsFired = [];
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

    //Sukuriam layerius pagal tilemapa
    this.backgroundlayer = this.map.createLayer('background');
    //this.infrontlayer = this.map.createLayer('infrontLayer');
    //tile sprite
    //this.stars = this.game.add.tileSprite(0, 0, 1000, 420, 'stars');

    this.blockingLayer1 = this.map.createLayer('blockingLayer1');

    //Padarom, kad visi blockedLayer elementai collidintu

    this.map.setCollisionBetween(1, 100000, true, 'blockingLayer1');
    //this.map.setCollisionBetween(1, 100000, true, 'infrontLayer');
    //Resizinam worlda pagal backgroundlayer išmatavimus
    this.backgroundlayer.resizeWorld();

    //this.game.physics.setBoundsToWorld();

    //PLAYER CREATION AND OPTIONS
    this.player = this.add.sprite(0, 0, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.direction = 1;

    this.player.body.setSize(6, 48, 12);

    //Enemy test

    this.enemy = this.add.sprite(500, 0, 'player');
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.gravity.y = 1000;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    this.enemy.animations.add('right', [5, 6, 7, 8], 10, true);

    //Bullets test
    this.bullets = this.game.add.group();
   this.bullets.enableBody = true;
   this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
   this.bullets.createMultiple(1, 'goldCoin');
   this.bullets.setAll('outOfBoundsKill', true);
   this.bullets.setAll('checkWorldBounds', true);

    this.enemy.body.setSize(6, 48, 12);

    this.enemy.moving = false;
    this.tween = this.game.add.tween(this.enemy);
    this.tween.to({x: this.enemy.x + 10, moving: true}, 2000, Phaser.Easing.Linear.None);
    this.tween.onComplete.add(function(){
      this.enemy.moving = false;
    }.bind(this));
    this.tween.start();

    //Sukuriam layeri, kuris būtų priešais playerį
    this.blockingLayer = this.map.createLayer('blockingLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockingLayer');

    this.game.camera.follow(this.player);

    //Keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  i: 0,
  update: function() {
    //this.stars.tilePosition.y += 2;
    this.player.body.velocity.x = 0;

    for(var i = 0; i < this.shotsFired.length; i++)
      if(this.game.physics.arcade.distanceBetween(this.player, this.shotsFired[i]) > 100) {
        this.shotsFired[i].kill();
        this.shotsFired.splice(i);
        break;
      }
    //Kad playeris collidintu su blockedLayer
    this.game.physics.arcade.overlap(this.blockingLayer, this.player);
    this.game.physics.arcade.collide(this.player, this.enemy, function(){
      this.game.paused = true;
      this.game.add.text(this.player.x, this.player.y, "ima faget");
    }.bind(this));
    this.game.physics.arcade.collide(this.player, this.blockingLayer1);
    this.game.physics.arcade.collide(this.enemy, this.blockingLayer1);


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
    // STAND STILL FRAME WHEN NOT RUNING
    else {
        this.player.animations.stop();

        this.player.frame = 4;
    }

    //if(this.game.physics.arcade.distanceBetween(this.player, this.bullet) > 100)
      //console.log(this.game.physics.arcade.distanceBetween(this.player, this.bullets));

    //  JUMP WHEN TOUCHES GROUND
    if(this.cursors.up.isDown && this.player.body.blocked.down) {
        this.player.body.velocity.y = -750;
    }

    if(this.fireButton.isDown) {
      this.fireBullet();
    }

    if(this.enemy.moving)
      this.enemy.animations.play('left');
    else this.enemy.frame = 4;

  },

  fireBullet: function() {
    if(this.game.time.now > this.nextFire) {
      this.nextFire = this.game.time.now + this.fireRate;
      this.bullet = this.bullets.getFirstExists(false);
      console.log(this.bullets);
      this.shotsFired.push(this.bullet);
      this.bullet.reset(this.player.x, this.player.y + 8);
      this.bullet.body.velocity.x = 400*this.player.direction;
    }
  },

  render: function()
    {
        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
    },
}
