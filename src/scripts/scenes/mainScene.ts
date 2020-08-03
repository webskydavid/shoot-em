import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../constants';

export default class MainScene extends Phaser.Scene {
  player: Player;
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'MainScene'});
  }

  create() {
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.fpsText = new FpsText(this);
    this.player = new Player(this, 50, 100);
    this.player.create();

    // tilemap settings
    let map1 = this.add.tilemap('map1');
    let tilemap = map1.addTilesetImage('tileset_map1', 'tileset');
    let ground = map1.createStaticLayer('ground', [tilemap], 0, 0).setDepth(-1);
    let obstacle = map1
      .createStaticLayer('obstacle', [tilemap], 0, 0)
      .setDepth(1);
    this.physics.add.collider(this.player, ground);
    ground.setCollisionByProperty({collide: true});
  }

  update() {
    this.fpsText.update();
    this.player.update();
  }
}
