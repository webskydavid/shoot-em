import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../constants';
import Bullet from '../objects/bullet';
import Gun from '../objects/gun';

export default class MainScene extends Phaser.Scene {
  bullets: Phaser.GameObjects.Group;
  player: Player;
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'MainScene'});
  }

  create() {
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.fpsText = new FpsText(this);
    this.bullets = this.physics.add.group({
      frictionX: 10000,
      frictionY: 10000,
      dragX: 100,
      dragY: 100,
      classType: Bullet,
    });
    this.player = new Player(this, 50, 100);

    this.addTilemaps();
  }

  update() {
    this.fpsText.update();
    this.player.update();
  }

  private addTilemaps() {
    let map1 = this.add.tilemap('map1');
    let tilemap = map1.addTilesetImage('tileset_map1', 'tileset');

    let ground = map1.createStaticLayer('ground', [tilemap], 0, 0).setDepth(-1);
    let obstacle = map1
      .createStaticLayer('obstacle', [tilemap], 0, 0)
      .setDepth(1);

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, obstacle);
    this.physics.add.collider(this.bullets, ground, (d) => {
      d.destroy();
    });

    ground.setCollisionByProperty({collide: true});
    obstacle.setCollisionByProperty({collide: true});
  }
}
