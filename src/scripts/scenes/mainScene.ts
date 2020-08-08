import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../constants';
import Bullet from '../objects/bullet';
import PointerText from '../objects/pointerText';
import ExplosionGroup from '../objects/explosionGroup';
import BulletsGroup from '../objects/bulletsGroup';

export default class MainScene extends Phaser.Scene {
  private ground: Phaser.Tilemaps.StaticTilemapLayer;
  private obstacle: Phaser.Tilemaps.StaticTilemapLayer;
  explosion: ExplosionGroup;
  bullets: BulletsGroup;
  player: Player;
  fpsText: Phaser.GameObjects.Text;
  pointerText: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'MainScene'});
  }

  create() {
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // GAME OBJECTS
    this.fpsText = new FpsText(this, 5, 5);
    this.pointerText = new PointerText(this, 5, 15);
    this.player = new Player(this, 50, 100);

    // GROUPS
    this.explosion = new ExplosionGroup(this.physics.world);
    this.bullets = new BulletsGroup(this.physics.world);

    this.addTilemaps();
  }

  update() {
    this.fpsText.update();
    this.pointerText.update();
    this.player.update();
  }

  private addTilemaps() {
    let map1 = this.add.tilemap('map1');
    let tilemap = map1.addTilesetImage('tileset_map1', 'tileset');

    this.ground = map1
      .createStaticLayer('ground', [tilemap], 0, 0)
      .setDepth(-1);
    this.obstacle = map1
      .createStaticLayer('obstacle', [tilemap], 0, 0)
      .setDepth(1);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.obstacle);

    this.physics.add.collider(this.explosion.objGroup, this.ground);
    this.physics.add.collider(this.bullets.objGroup, this.ground, (d, c) => {
      let b = <Phaser.Physics.Arcade.Sprite>d;
      b.destroy();
      this.explosion.explode(b.x, b.y);
    });

    this.ground.setCollisionByProperty({collide: true});
    this.obstacle.setCollisionByProperty({collide: true});
  }
}
