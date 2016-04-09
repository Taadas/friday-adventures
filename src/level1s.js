Game.level1 = function(game) {

};



Game.level1.prototype = {
  preload: function() {
    this.game.time.advancedTiming = true;
  },

  create: function() {
    console.log('level1');
    this.nextPunch = 0;
    this.punchRate = 700;
    this.currentPunch;
    this.spriteDeletionDistance = 0;
    this.letDown = false;
    this.modal1State = false;
    this.count = 5;

    this.blockers = this.game.add.group();
    this.blockers.enableBody = true;
    this.blocker1 = this.blockers.create(2840, 520, 'tuscias');
    this.blocker2 = this.blockers.create(4720, 520, 'tuscias');
    this.blocker1.body.immovable = true;
    this.blocker2.body.immovable = true;
    //TileMapas ir layeriai
    this.map = this.game.add.tilemap('level1Map');
    this.map.addTilesetImage('background', 'level1Background');
    this.backgroundlayer = this.map.createLayer('background');
    this.blockingLayer = this.map.createLayer('objects');
    this.map.setCollisionBetween(1, 100000, true, 'objects');
    this.backgroundlayer.resizeWorld();
    //

    this.punches = this.game.add.group();
    this.punches.enableBody = true;
    this.punches.physicsBodyType = Phaser.Physics.ARCADE;
    this.punches.createMultiple(1, 'punch');
    this.punches.setAll('damage', 1);

    this.blanks = this.game.add.group();
    this.blanks.enableBody = true;
    this.blank1 = this.blanks.create(2840, 440, 'tuscias');
    this.blank2 = this.blanks.create(4720, 440, 'tuscias');

    this.player = this.add.sprite(0, 0, 'veikejasAnimuotas');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;
    this.player.direction = 1;
    this.player.weaponEquiped = 0;
    this.player.health = 20;
    this.player.atacked = false;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.animations.add('punchLeft', [13, 14, 15, 16], 10, true);
    this.player.animations.add('punchRight', [9, 10, 11, 12], 10, true);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);


    this.enemies = this.game.add.group();
    this.enemy1 = this.enemies.create(500, 0, 'veikejasAnimuotas');
    this.game.physics.arcade.enable(this.enemy1);
    this.enemy1.body.gravity.y = 1000;
    this.enemy1.health = 5;
    this.enemy1.body.collideWorldBounds = true;
    this.enemy1.direction = 1;
    this.enemy1.frame = 4;
    this.enemy1.animations.add('left', [0, 1, 2, 3], 10, true);
    this.enemy1.animations.add('right', [5, 6, 7, 8], 10, true);
    this.enemy1.animations.add('punchLeft', [16, 15, 14, 13], 10, true);
    this.enemy1.animations.add('punchRight', [9, 10, 11, 12], 10, true);
    //createModals(this.enemy1.position.y, this.enemy1.position.x);

    this.stulpai = this.game.add.group();
    this.stulpai.enableBody = true;
    this.stulpai.create(640, 240, 'zenklasStotis');
    this.stulpai.create(1240, 452, 'suoliukas');
    this.stulpai.create(2290, 240, 'zenklasTraku');
    this.stulpai.create(2850, 281, 'zenklasPozemine');
    this.stulpai.create(this.game.world.width - 397, 438, 'stulpeliai');
    this.stulpai.create(this.game.world.width - 172, 124, 'klubas');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.dButton = this.input.keyboard.addKey(Phaser.Keyboard.D);
  },

  update: function() {
    this.player.body.velocity.x = 0;
    //Playerio ir enemy collidinimas, su ismetama funkcija oncollide
    this.game.physics.arcade.overlap(this.player, this.enemies, function(){
      //console.log("Collision");
    }.bind(this));

    this.game.physics.arcade.overlap(this.player, this.blanks, function() {
      if(this.cursors.down.isDown)
        this.letDown = true;
    }.bind(this));

    if(this.player.body.y <= 340 && this.letDown == true)
      this.letDown = false;

    this.game.physics.arcade.collide(this.player, this.blockingLayer);
    this.game.physics.arcade.collide(this.enemies, this.blockingLayer);
    if(this.letDown == false)
      this.game.physics.arcade.collide(this.player, this.blockers);
    else this.game.physics.arcade.overlap(this.player, this.blockers);

    this.game.physics.arcade.overlap(this.punches, this.enemies, this.hitHandler.bind(this));

    //if((this.player.body.x > 2840 )

    if(this.player.atacked) {
      if(this.player.direction == -1)
        this.spriteDeletionDistance = 60;
      else this.spriteDeletionDistance = 130;

      if(this.game.physics.arcade.distanceBetween(this.player, this.currentPunch) > this.spriteDeletionDistance) {
        this.currentPunch.kill();
        this.player.atacked = false;
      }
    }

    if(this.fireButton.isDown) {
      if(this.player.direction == -1)
        this.player.animations.play('punchLeft');
      else this.player.animations.play('punchRight');
      if(this.player.weaponEquiped === 0)
        this.punchAtack();
    }
    else if(this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.velocity.y = -500;
    }
    else if(this.cursors.left.isDown) {
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
  },

  punchAtack: function() {
    if(this.player.atacked == false && this.game.time.now > this.nextPunch) {
      this.punch = this.punches.getFirstExists(false);
      this.nextPunch = this.game.time.now + this.punchRate;
      this.game.physics.arcade.enable(this.punch);
      this.currentPunch = this.punch;
      this.player.atacked = true;
      this.punch.reset(this.player.x + 45, this.player.y + 30);
      this.punch.body.velocity.x = 400*this.player.direction;
    }
  },

  hitHandler: function(weapon, enemy) {
    weapon.kill();
    this.player.atacked = false;
    enemy.health -= weapon.damage;

    if(enemy.health <= 0)
      enemy.kill();
  }
}
