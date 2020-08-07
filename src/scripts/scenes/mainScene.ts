import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../constants';
import Bullet from '../objects/bullet';
import PointerText from '../objects/pointerText';
import Rock from '../objects/rock';

export default class MainScene extends Phaser.Scene {
  private ground: Phaser.Tilemaps.StaticTilemapLayer;
  private obstacle: Phaser.Tilemaps.StaticTilemapLayer;

  exp: Phaser.GameObjects.Group;
  bullets: Phaser.GameObjects.Group;
  player: Player;
  fpsText: Phaser.GameObjects.Text;
  pointerText: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'MainScene'});
  }

  create() {
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.fpsText = new FpsText(this, 5, 5);
    this.pointerText = new PointerText(this, 5, 15);
    this.player = new Player(this, 50, 100);
    this.bullets = this.physics.add.group({
      dragX: 100,
      dragY: 100,
      mass: 2000,
      quantity: 10,
      max: 10,
      classType: Bullet,
    });

    // EXPLOSION GROUP
    this.exp = this.physics.add.group({
      runChildUpdate: true,
      classType: Rock,
    });

    this.addTilemaps();
  }

  explode(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      let explosionPower = 20;
      let rockPositionOffset = 1.5;
      let rndPositionOffset =
        Phaser.Math.RND.between(-5, 5) * Phaser.Math.RND.frac();
      let rock = <Rock>this.exp.create(x + rndPositionOffset, y);
      let body = <Phaser.Physics.Arcade.Body>rock.body;
      let size = Phaser.Math.RND.frac();
      let angle = Phaser.Math.Angle.Between(
        x,
        y,
        rock.x,
        rock.y - rockPositionOffset
      );

      rock.setScale(size * 3);
      body.setMass(rock.scale * 5);
      body.setSize(size, size);
      body.setDrag(2 * body.mass, 2 * body.mass);
      body.setBounce(0.1, 0.1);
      body.setFriction(100, 100);
      rock.flipX = !!rndPositionOffset;

      body.setVelocity(
        Math.cos(angle) * explosionPower * body.mass,
        Math.sin(angle) * explosionPower * body.mass
      );
      body.setAngularVelocity(angle * body.mass * rock.scale * explosionPower);

      // --- Debug elements
      //this.add.rectangle(x, y, 3, 3, 0xff0000); // bomb
      //this.add.rectangle(rock.x, rock.y - rockPositionOffset, 3, 3, 0x00ff00); // rocks
      // ---
    }
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
    this.physics.add.collider(this.exp, this.ground);
    this.physics.add.collider(this.player, this.obstacle);
    this.physics.add.collider(this.bullets, this.ground, (d, c) => {
      let b = <Phaser.Physics.Arcade.Sprite>d;
      b.destroy();

      this.explode(b.x, b.y);
    });

    this.ground.setCollisionByProperty({collide: true});
    this.obstacle.setCollisionByProperty({collide: true});
  }
}
