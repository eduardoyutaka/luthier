var background1 = {
  width: 1824,
  height: 602,
};

var background2 = {
  width: 5516,
  height: 600,
};

var config = {
  type: Phaser.AUTO,
  width: background1.width + background2.width,
  height: 602,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var platforms;
var player;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('background2', 'assets/background/background2.png');
  this.load.image('background3', 'assets/background/background3.png');
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
  this.add.image(912, 301, 'background2');
  this.add.image(4581, 303, 'background3');
  
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
  camera.setFollowOffset(300 -(background1.width + background2.width) / 2, -303);
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
