export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'PreloadScene'});
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('gun', 'assets/gun.png');
    this.load.image('tileset', 'assets/img/tileset.png');

    this.load.tilemapTiledJSON('map1', 'assets/maps/map1.json');
  }

  create() {
    this.scene.start('MainScene');
  }
}
