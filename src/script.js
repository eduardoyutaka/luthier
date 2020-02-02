var houseBackground = {
  width: 1824,
  height: 602,
};

var streetBackground = {
  width: 5516,
  height: 600,
};

var startBackground = {
  width: 1290,
  height: 602,
};

var startScene = new Phaser.Scene('startScene');
var gameScene = new Phaser.Scene('gameScene');

startScene.init = function() {

};

startScene.preload = function() {
  this.load.image('startBackground', 'assets/start/start-background.png');
};

startScene.create = function() {
  this.add.image(startBackground.width / 2, startBackground.height / 2, 'startBackground');
};

startScene.update = function() {

};

gameScene.init = function() {
  console.log('init');
};

gameScene.preload = function() {
  this.load.image('houseBackground', 'assets/background/background2.png');
  this.load.image('streetBackground', 'assets/background/background3.png');
  this.load.image('ground-house-upper-left', 'assets/platforms/ground-house-upper-left.png', { frameWidth: 480, frameHeight: 36 });
  this.load.image('ground-house-upper-right', 'assets/platforms/ground-house-upper-right.png', { frameWidth: 1096, frameHeight: 36 });
  this.load.image('ground-house-lower', 'assets/platforms/ground-house-lower.png', { frameWidth: 1824, frameHeight: 56 });
  this.load.image('ground-street', 'assets/platforms/ground-street.png', { frameWidth: 234, frameHeight: 56 });
  this.load.spritesheet('player-stand', 'assets/player/stand.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-left', 'assets/player/walk-left.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-right', 'assets/player/walk-right.png', { frameWidth: 114, frameHeight: 158 });
  this.load.audio('audio', 'assets/audio/3_bass.mp3');
};

gameScene.create = function() {
  this.add.image(startBackground.width / 2, startBackground.height / 2, 'startBackground');
  this.add.image(912, 301, 'houseBackground');
  this.add.image(4581, 303, 'streetBackground');
  
  platforms = this.physics.add.staticGroup();
  platforms.create(912, 576, 'ground-house-lower');
  platforms.create(240, 246, 'ground-house-upper-left');
  platforms.create(1276, 246, 'ground-house-upper-right');
  platforms.create(4580, 576, 'ground-street');

  player = this.physics.add.sprite(100, 0, 'player-stand');
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'stand',
    frames: this.anims.generateFrameNumbers('player-stand', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player-walk-left', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player-walk-right', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);

  var camera = this.cameras.main;
  camera.startFollow(player);
  camera.setFollowOffset(300 -(houseBackground.width + streetBackground.width) / 2, -303);
  camera.setDeadzone(0, 938);
};

gameScene.update = function() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-1000);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(1000);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('stand', true);
  }

  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-700);
  }
};

var config = {
  type: Phaser.AUTO,
  width: houseBackground.width + streetBackground.width,
  height: 602,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
};

var platforms;
var player;
var game = new Phaser.Game(config);
game.scene.add('startScene', startScene);
game.scene.add('gameScene', gameScene);
console.log(game);
game.scene.start('gameScene');

function preload() {
  this.load.image('houseBackground', 'assets/background/background2.png');
  this.load.image('streetBackground', 'assets/background/background3.png');
  this.load.image('ground-house-upper-left', 'assets/platforms/ground-house-upper-left.png', { frameWidth: 480, frameHeight: 36 });
  this.load.image('ground-house-upper-right', 'assets/platforms/ground-house-upper-right.png', { frameWidth: 1096, frameHeight: 36 });
  this.load.image('ground-house-lower', 'assets/platforms/ground-house-lower.png', { frameWidth: 1824, frameHeight: 56 });
  this.load.image('ground-street', 'assets/platforms/ground-street.png', { frameWidth: 234, frameHeight: 56 });
  this.load.spritesheet('player-stand', 'assets/player/stand.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-left', 'assets/player/walk-left.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-right', 'assets/player/walk-right.png', { frameWidth: 114, frameHeight: 158 });
  this.load.audio('audio', 'assets/audio/3_bass.mp3');
};

function create() {
  this.add.image(912, 301, 'houseBackground');
  this.add.image(4581, 303, 'streetBackground');
  
  platforms = this.physics.add.staticGroup();
  platforms.create(912, 576, 'ground-house-lower');
  platforms.create(240, 246, 'ground-house-upper-left');
  platforms.create(1276, 246, 'ground-house-upper-right');
  platforms.create(4580, 576, 'ground-street');

  player = this.physics.add.sprite(100, 0, 'player-stand');
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'stand',
    frames: this.anims.generateFrameNumbers('player-stand', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player-walk-left', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player-walk-right', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);

  var camera = this.cameras.main;
  camera.startFollow(player);
  camera.setFollowOffset(300 -(houseBackground.width + streetBackground.width) / 2, -303);
  camera.setDeadzone(0, 938);
};

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-1000);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(1000);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('stand', true);
  }

  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-700);
  }
};
