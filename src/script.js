var startBackground = {
  width: 1290,
  height: 602,
};

var houseBackground = {
  width: 1824,
  height: 602,
};

var streetBackground = {
  width: 5516,
  height: 600,
};

var forrestBackground = {
  width: 12871,
  height: 602,
};

var startScene = new Phaser.Scene('startScene');
var gameScene = new Phaser.Scene('gameScene');

startScene.init = function() { };

startScene.preload = function() {
  this.load.image('startBackground', 'assets/start/start-background.png');
};

startScene.create = function() {
  this.add.image(startBackground.width / 2, startBackground.height / 2, 'startBackground');
};

startScene.update = function() { };

var currentAudio = 0;

function playNextAudio() {
  if (currentAudio > 0) {
    audios[currentAudio - 1].stop();
  }
  audios[currentAudio].play();
  currentAudio++;
};

function collectKeyboard() {
  keyboard.disableBody(true, true);
  smoke.destroy();
  playNextAudio();
};

function collectNote1() {
  note1.disableBody(true, true);
  playNextAudio();
}

function collectNote2() {
  note2.disableBody(true, true);
  playNextAudio();
}

function collectNote3() {
  note3.disableBody(true, true);
  playNextAudio();
}

function collectNote4() {
  note4.disableBody(true, true);
  playNextAudio();
}

function collectNote5() {
  note5.disableBody(true, true);
}

function collectNote6() {
  note6.disableBody(true, true);
  playNextAudio();
}

gameScene.init = function() { };

gameScene.preload = function() {
  this.load.image('houseBackground', 'assets/background/background2.png');
  this.load.image('streetBackground', 'assets/background/background3.png');
  this.load.image('forrestBackground', 'assets/background/background4.png');
  this.load.image('ground-house-upper-left', 'assets/platforms/ground-house-upper-left.png', { frameWidth: 480, frameHeight: 36 });
  this.load.image('ground-house-upper-right', 'assets/platforms/ground-house-upper-right.png', { frameWidth: 1096, frameHeight: 36 });
  this.load.image('ground-house-lower', 'assets/platforms/ground-house-lower.png', { frameWidth: 1824, frameHeight: 56 });
  this.load.image('ground-street', 'assets/platforms/ground-street.png', { frameWidth: 234, frameHeight: 56 });
  this.load.image('ground-forrest', 'assets/platforms/ground-forrest.png', { frameWidth: 5516, frameHeight: 56 });
  this.load.spritesheet('player-stand', 'assets/player/stand.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-left', 'assets/player/walk-left.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('player-walk-right', 'assets/player/walk-right.png', { frameWidth: 114, frameHeight: 158 });
  this.load.spritesheet('keyboard', 'assets/objects/keyboard-broken.png', { frameWidth: 120, frameHeight: 80 });
  this.load.spritesheet('smoke', 'assets/objects/smoke.png', { frameWidth: 132, frameHeight: 94 });
  this.load.spritesheet('note', 'assets/objects/notamusical02.png', { frameWidth: 90, frameHeight: 72 });
  this.load.audio('stepsAudio', 'assets/audio/passos_volbaixo.mp3');
  this.load.audio('audio0', 'assets/audio/audio0.mp3');
  this.load.audio('audio1', 'assets/audio/audio1.mp3');
  this.load.audio('audio2', 'assets/audio/audio2.mp3');
  this.load.audio('audio3', 'assets/audio/audio3.mp3');
  this.load.audio('audio4', 'assets/audio/audio4.mp3');
  this.load.audio('audio5', 'assets/audio/audio5.mp3');
  this.load.audio('audio6', 'assets/audio/audio6.mp3');
};

gameScene.create = function() {
  this.add.image(startBackground.width / 2, startBackground.height / 2, 'startBackground');
  this.add.image(912, 301, 'houseBackground');
  this.add.image(4581, 301, 'streetBackground');
  this.add.image(houseBackground.width + streetBackground.width + forrestBackground.width / 2 - 3, 303, 'forrestBackground');
  
  platforms = this.physics.add.staticGroup();
  platforms.create(912, 576, 'ground-house-lower');
  platforms.create(240, 246, 'ground-house-upper-left');
  platforms.create(1276, 246, 'ground-house-upper-right');
  platforms.create(4580, 576, 'ground-street');
  platforms.create(houseBackground.width + streetBackground.width + forrestBackground.width / 2, 576, 'ground-forrest');

  player = this.physics.add.sprite(100, 0, 'player-stand');
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  var camera = this.cameras.main;
  camera.startFollow(player);
  camera.setFollowOffset(300 -(houseBackground.width + streetBackground.width + forrestBackground.width) / 2, -303);
  camera.setDeadzone(0, 938);

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

  this.anims.create({
    key: 'keyboard',
    frames: this.anims.generateFrameNumbers('keyboard', { start: 0, end: 4 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: 'smoke',
    frames: this.anims.generateFrameNumbers('smoke', { start: 0, end: 8 }),
    frameRate: 9,
    repeat: -1,
  });

  this.anims.create({
    key: 'note',
    frames: this.anims.generateFrameNumbers('note', { start: 0, end: 3 }),
    frameRate: 4,
    repeat: -1,
  });

  keyboard = this.physics.add.sprite(1500, 508, 'keyboard');
  keyboard.anims.play('keyboard', true);

  smoke = this.add.sprite(1506, 410, 'smoke');
  smoke.anims.play('smoke', true);

  note1 = this.physics.add.sprite(1506, 100, 'note');
  note1.anims.play('note', true);

  note2 = this.physics.add.sprite(3100, 200, 'note').setImmovable(true);
  note2.body.setAllowGravity(false);
  note2.anims.play('note', true);

  note3 = this.physics.add.sprite(5000, 200, 'note');
  note3.anims.play('note', true);

  note4 = this.physics.add.sprite(9000, 200, 'note');
  note4.anims.play('note', true);

  note5 = this.physics.add.sprite(15000, 200, 'note');
  note5.anims.play('note', true);

  note6 = this.physics.add.sprite(18000, 200, 'note');
  note6.anims.play('note', true);

  this.physics.add.collider(keyboard, platforms);
  this.physics.add.overlap(player, keyboard, collectKeyboard, null, this);

  this.physics.add.collider(note1, platforms);
  this.physics.add.overlap(player, note1, collectNote1, null, this);

  this.physics.add.collider(note2, platforms);
  this.physics.add.overlap(player, note2, collectNote2, null, this);
  this.physics.add.collider(note3, platforms);
  this.physics.add.overlap(player, note3, collectNote3, null, this);
  this.physics.add.collider(note4, platforms);
  this.physics.add.overlap(player, note4, collectNote4, null, this);
  this.physics.add.collider(note5, platforms);
  this.physics.add.overlap(player, note5, collectNote5, null, this);
  this.physics.add.collider(note6, platforms);
  this.physics.add.overlap(player, note6, collectNote6, null, this);

  stepsAudio = this.sound.add('stepsAudio');
  stepsAudio.loop = true;
  audio0 = this.sound.add('audio0');
  audio0.loop = true;
  audio1 = this.sound.add('audio1');
  audio1.loop = true;
  audio2 = this.sound.add('audio2');
  audio2.loop = true;
  audio3 = this.sound.add('audio3');
  audio3.loop = true;
  audio4 = this.sound.add('audio4');
  audio4.loop = true;
  audio5 = this.sound.add('audio5');
  audio5.loop = true;
  audio6 = this.sound.add('audio6');
  audio6.loop = true;
  audios = [audio0, audio1, audio1, audio3, audio4, audio5, audio6]
};

gameScene.update = function() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-500);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(500);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('stand', true);
  }

  if ((cursors.left.isDown || cursors.right.isDown) && player.body.touching.down) {
    if (!stepsAudio.isPlaying) {
      stepsAudio.play();
    }
  } else {
    if (stepsAudio.isPlaying) {
      stepsAudio.stop();
    }
  }

  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-1000);
  }
};

var config = {
  type: Phaser.AUTO,
  width: houseBackground.width + streetBackground.width + forrestBackground.width,
  height: 602,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1300 },
      debug: false,
    },
  },
};

var platforms;
var player;
var keyboard;
var smoke;
var stepsAudio;
var note1;
var note2;
var note3;
var note4;
var note5;
var note6;
var audio0;
var audio1;
var audio2;
var audio3;
var audio4;
var audio5;
var audio6;
var audios;
var game = new Phaser.Game(config);
game.scene.add('startScene', startScene);
game.scene.add('gameScene', gameScene);
game.scene.start('gameScene');
