var reg = {}; // modals stuff
this.count = 5;
var counter;
var modal1Data = {state: false, answer: true};
var modal2Data = {state: false, answer: true};

Game.level1 = function(game) {};

Game.level1.prototype = {
  preload: function() {
  this.game.time.advancedTiming = true;
  },

  create: function() {
  console.log('level1');
  this.nextPunch = 0;
  this.nextEnemyAtack = 0;
  this.punchRate = 700;
  this.currentPunch;
  this.spriteDeletionDistance = 0;
  this.letDown = false;
  this.nextFollowCheck = 0;
  this.enemiesWalking = 0;
  this.randomDirection = -1;
    // initiate the modal class
    reg.modal = new gameModal(this.game);
    this.modal1State = false;
    this.modal2State = false;
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

  this.enemyPunches = this.game.add.group();
  this.enemyPunches.enableBody = true;
  this.enemyPunches.physicsBodyType = Phaser.Physics.ARCADE;
  this.enemyPunches.createMultiple(1, 'punch');
  this.enemyPunches.setAll('damage', 1);

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
  this.player.atacked = false;
  this.player.health = 10;
  this.player.animations.add('left', [0, 1, 2, 3], 10, true);
  this.player.animations.add('right', [5, 6, 7, 8], 10, true);
  this.player.animations.add('punchLeft', [13, 14, 15, 16], 10, true);
  this.player.animations.add('punchRight', [9, 10, 11, 12], 10, true);
  this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);


  this.enemies = this.game.add.group();
  this.enemy1 = this.enemies.create(1200, 0, 'veikejasAnimuotas');
  createEnemy(this.game, this.enemies, this.enemy1);

  this.enemy2 = this.enemies.create(1300, 0, 'veikejasAnimuotas');
  createEnemy(this.game, this.enemies, this.enemy2);
  createModal1(this.enemy2.position.y, this.enemy2.position.x); // enemy2 modal

  this.enemies2 = this.game.add.group();

  this.enemy3 = this.enemies2.create(2500, 0, 'veikejasAnimuotas');
  createEnemy(this.game, this.enemies2, this.enemy3);
  this.enemy4 = this.enemies2.create(3800, 600, 'veikejasAnimuotas');
  createEnemy(this.game, this.enemies2, this.enemy4);
  createModal2(this.enemy4.position.y, this.enemy4.position.x);

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
  //follow = false;
  if(this.game.time.now > this.nextFollowCheck) {
    this.nextFollowCheck += 3000;
    console.log(modal1Data.answer, modal2Data.answer);
    if(modal1Data.answer == false)
    this.followPlayer(this.player, this.enemy1, this.enemy2, this.enemies);
    if(modal2Data.answer == false)
    this.followPlayer(this.player, this.enemy3, this.enemy4, this.enemies2);
  }
  if(this.enemies.agressive)
    this.game.physics.arcade.overlap(this.enemies, this.player, this.fightHandler.bind(this));
  if(this.enemies2.agressive)
    this.game.physics.arcade.overlap(this.enemies2, this.player, this.fightHandler.bind(this));

  if(this.game.time.now > this.enemiesWalking) {
    console.log("ASD");
    this.enemiesWalking += 2000;

    this.walkRandom(this.enemy1, this.randomDirection);

    this.randomDirection = this.randomDirection*(-1);
  }

  if(modal1Data.state != -1) {
    modal1Data = checkDistance(this.game, this.player, this.enemy2, "modal1", modal1Data.state, modal1Data.answer);
    //modal1Data.answer = checkDistance(this.game, this.player, this.enemy2, "modal1", modal1Data.state, modal1Data.answer).answer;
  }
  if(modal2Data.state != -1) {
    modal2Data = checkDistance(this.game, this.player, this.enemy4, "modal2", modal2Data.state, modal2Data.answer);
    //modal2Data.answer = checkDistance(this.game, this.player, this.enemy4, "modal2", modal2Data.state, modal2Data.answer).answer;
  }

  this.player.body.velocity.x = 0;
  //Playerio ir enemy collidinimas, su ismetama funkcija oncollide

  this.game.physics.arcade.overlap(this.player, this.blanks, function() {
    if(this.cursors.down.isDown)
    this.letDown = true;
  }.bind(this));

  if(this.player.body.y <= 340 && this.letDown == true)
    this.letDown = false;

  this.game.physics.arcade.collide(this.player, this.blockingLayer);
  this.game.physics.arcade.collide(this.enemies, this.blockingLayer);
  this.game.physics.arcade.collide(this.enemies2, this.blockingLayer);
  if(this.letDown == false)
    this.game.physics.arcade.collide(this.player, this.blockers);
  else this.game.physics.arcade.overlap(this.player, this.blockers);

  this.game.physics.arcade.overlap(this.punches, this.enemies, this.hitHandler.bind(this));
  this.game.physics.arcade.overlap(this.punches, this.enemies2, this.hitHandler.bind(this));

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

  walkRandom: function(enemy, randomDirection) {
  if(enemy.following == false) {
    enemy.body.velocity.x = 30*randomDirection;

    if(randomDirection == -1) {
    enemy.animations.play('left');
    }
    else {
    enemy.animations.play('right');
    }
  }
  },

  hitHandler: function(weapon, enemy) {
  weapon.kill();
  this.player.atacked = false;
  enemy.health -= weapon.damage;

  if(enemy.health <= 0)
    enemy.kill();
  },

  fightHandler: function(player, enemy) {
  if((this.game.time.now - this.nextEnemyAtack) > 1)
    this.nextEnemyAtack = Math.floor(this.game.time.now) - 1;
  if(this.game.time.now > this.nextEnemyAtack) {
    this.nextEnemyAtack += 1000;
    player.health -= enemy.damage;
    console.log(player.health);
  if(player.health <= 0) {
    player.kill();
    console.log('mireu');
    this.delfi.x = 0;
    this.delfi.y = 0;
  }

    enemy.body.velocity.x =0;
    enemy.animations.stop();
    if(enemy.direction == 1)
    enemy.animations.play("punchRight");
    else enemy.animations.play("punchLeft");
  }
  },

  followPlayer: function(player, enemy1, enemy2, enemies) {
  enemy1.following = true;
  enemy2.following = true;
  if(player.x > enemy1.x) {
    enemy1.direction = 1;
    enemy1.body.velocity.x = 75;
    enemy1.animations.play('right');
  }
  if(player.x < enemy1.x) {
    enemy1.direction = -1;
    enemy1.body.velocity.x = -75;
    enemy1.animations.play('left');
  }
  if(player.x > enemy2.x) {
    enemy2.direction = 1;
    enemy2.body.velocity.x = 75;
    enemy2.animations.play('right');
  }
  if(player.x < enemy2.x) {
    enemy2.direction = -1;
    enemy2.body.velocity.x = -75;
    enemy2.animations.play('left');
  }
  enemies.agressive = true;
  }
}

function createModal1(playerPosY, playerPosX) {
  console.log('y %s x %s', playerPosY, playerPosX);
  reg.modal.createModal({
    type: 'modal1',
    includeBackground: true,
    backgroundOpacity: 0,
    modalCloseOnInput: false,
    itemsArr: [
      {
        type: 'image',
        content: 'dialogBaloon1',
        offsetY: -25,
        offsetX: (-300 + playerPosX)
      },
      {
        type: 'image',
        content: 'choice1',
        offsetY: -45,
        offsetX: (-300 + playerPosX),
        callback: function() {
          console.log("nrml pacanas");
          reg.modal.hideModal("modal1");
          modal1Data.state = true;
          modal1Data.answer = true;
          this.count = 5;

          modal1Data.state = -1;
          clearInterval(counter);
        }
      },
      {
        type: 'image',
        content: 'choice2',
        offsetY: 0,
        offsetX: (-300 + playerPosX),
        callback: function() {
          console.log("zopa");
          reg.modal.hideModal("modal1");
          modal1Data.state = true;
          modal1Data.answer = false;
          this.count = 5;

          modal1Data.state = -1;
          clearInterval(counter);
        }
      },
      {
        type: "text",
        content: "5",
        color: "0xfff",
        offsetY: -90,
        offsetX: (-191 + playerPosX),
        fontSize: 24
      }
    ]
  });
}

function createModal2(playerPosY, playerPosX) {
  console.log('y %s x %s', playerPosY, playerPosX);
  reg.modal.createModal({
    type: 'modal2',
    includeBackground: true,
    backgroundOpacity: 0,
    modalCloseOnInput: false,
    itemsArr: [
      {
        type: 'image',
        content: 'dialogBaloon1',
        offsetY: 325,
        offsetX: (-300 + playerPosX)
      },
      {
        type: 'image',
        content: 'choice1',
        offsetY: 300,
        offsetX: (-300 + playerPosX),
        callback: function() {
          console.log("nrml pacanas");
          reg.modal.hideModal("modal2");
          modal2Data.state = true;
          modal2Data.answer = true;
          this.count = 5;

          modal2Data.state = -1;
          clearInterval(counter);
        }
      },
      {
        type: 'image',
        content: 'choice2',
        offsetY: 345,
        offsetX: (-300 + playerPosX),
        callback: function() {
          console.log("zopa");
          modal2Data.state = true;
          modal2Data.answer = false;
          reg.modal.hideModal("modal2");
          this.count = 5;

          modal2Data.state = -1;
          clearInterval(counter);
        }
      },
      {
        type: "text",
        content: "5",
        color: "0xfff",
        offsetY: 290,
        offsetX: (-191 + playerPosX),
        fontSize: 24
      }
    ]
  });
}

function checkDistance(gameId, playerId, enemyId, dialogId, dialogState, dialogAnswer, dialogAnswer) {
  //console.log("NaN: dialogState ", dialogState);
  if((gameId.physics.arcade.distanceBetween(playerId, enemyId) == 100) && (dialogState == false)) {
    console.log("saukiam modala");
    var item = reg.modal.getModalItem(dialogId, 1);
    item.y = enemyId.position.y - enemyId.height/2 - 100;
    reg.modal.showModal(dialogId);

    dialogState = true;
    counter = setInterval(function() {timer(dialogId)}, 1000);
  }
  if((gameId.physics.arcade.distanceBetween(playerId, enemyId) > 100) && (dialogState == true)) {
    reg.modal.hideModal(dialogId);
    console.log("hidinam modala");
    dialogAnswer = false;
    dialogState = -1;
    this.count = 5;
    clearInterval(counter);
  }
  return {state: dialogState, answer: dialogAnswer};
}

function timer(dialogId) {
  this.count = this.count - 1;
  var modalCount = reg.modal.getModalItem(dialogId, 5);
  modalCount.text = this.count;
  modalCount.update();

  if (this.count <= 0) {
    clearInterval(counter); // baigesi counteris
    reg.modal.hideModal(dialogId);
    this.count = 5;
  }
  console.log(this.count);
}


function createEnemy(gameId, enemiesGroup, enemyId) {
  gameId.physics.arcade.enable(enemyId);
  enemyId.body.gravity.y = 1000;
  enemyId.health = 5;
  enemyId.body.collideWorldBounds = true;
  enemyId.direction = 1;
  enemyId.frame = 4;
  enemyId.following = false;
  enemyId.damage = 1;
  enemyId.animations.add('left', [0, 1, 2, 3], 5, true);
  enemyId.animations.add('right', [5, 6, 7, 8], 5, true);
  enemyId.animations.add('punchLeft', [16, 15, 14, 13], 10, true);
  enemyId.animations.add('punchRight', [9, 10, 11, 12], 10, true);
}