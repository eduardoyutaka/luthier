var config = {
  type: Phaser.AUTO,
  width: 1702,
  height: 604,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/background/background.png');
  this.load.spritesheet('player', 'assets/character/standing.png', { frameWidth: 114, frameHeight: 166 });
};

function create() {
  this.add.image(1702 / 2, 604 / 2, 'background');

  player = this.physics.add.sprite(100, 450, 'player');
  player.setCollideWorldBounds(true);
};

function update() {

};
