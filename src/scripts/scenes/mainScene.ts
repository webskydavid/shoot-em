import FpsText from '../objects/fpsText';
import Player from '../objects/player';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './../../constants';
import Bullet from '../objects/bullet';
import PointerText from '../objects/pointerText';

export default class MainScene extends Phaser.Scene {
  c: Phaser.Input.Keyboard.Key;
  exp: Phaser.GameObjects.Group;
  bullets: Phaser.GameObjects.Group;
  player: Player;
  fpsText: Phaser.GameObjects.Text;
  pointerText: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'MainScene'});
  }

  create() {
    this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.fpsText = new FpsText(this, 5, 5);
    this.pointerText = new PointerText(this, 5, 15);
    this.bullets = this.physics.add.group({
      frictionX: 10000,
      frictionY: 10000,
      dragX: 100,
      dragY: 100,
      mass: 2000,
      quantity: 10,
      max: 10,
      classType: Bullet,
    });

    this.exp = this.physics.add.group({
      createCallback: (e) => {
        this.time.delayedCall(1200, () => e.destroy());
      },
      frameQuantity: 100,
      allowGravity: false,
      classType: Bullet,
    });

    // for (let i = 0; i < 50; i++) {
    //   let dust = <Bullet>(
    //     this.exp.create(
    //       Phaser.Math.RND.integerInRange(70 - 2, 70 + 4) +
    //         Phaser.Math.RND.frac(),
    //       Phaser.Math.RND.integerInRange(70 - 2, 70 + 4) -
    //         Phaser.Math.RND.frac(),
    //       'bullet'
    //     )
    //   );
    //   let dustBody = <Phaser.Physics.Arcade.Body>dust.body;
    //   dust.setScale(Phaser.Math.RND.frac());
    //   dustBody.setMass(dust.scaleX);
    //   dustBody.setDrag(100 * dustBody.mass, 100 * dustBody.mass);
    //   dustBody.setBounce(0.1, 0.1);
    // }

    this.player = new Player(this, 50, 100);

    this.addTilemaps();
  }

  explode(x: number, y: number) {
    for (let i = 0; i < 50; i++) {
      let dust = <Bullet>(
        this.exp.create(
          Phaser.Math.RND.integerInRange(x - 2, x + 4) + Phaser.Math.RND.frac(),
          Phaser.Math.RND.integerInRange(y - 2, y + 4) - Phaser.Math.RND.frac(),
          'bullet'
        )
      );
      let dustBody = <Phaser.Physics.Arcade.Body>dust.body;
      dust.setScale(Phaser.Math.RND.frac());
      dustBody.setMass(dust.scaleX);
      dustBody.setDrag(100 * dustBody.mass, 100 * dustBody.mass);
      dustBody.setBounce(0.1, 0.1);
    }
    console.log('Explode', this.exp.getChildren());
    let childs = this.exp.getChildren();

    for (let i = 0; i < childs.length; i++) {
      let dust = childs[i];
      let body = <Phaser.Physics.Arcade.Body>dust.body;
      let angle = Phaser.Math.Angle.Between(x, y + 20, body.x, body.y);
      body.allowGravity = true;
      body.setVelocity(
        Math.cos(angle) * 300 * body.mass,
        Math.sin(angle) * 300 * body.mass
      );
    }
  }

  update() {
    this.fpsText.update();
    this.pointerText.update();
    this.player.update();
    if (this.c.isDown) {
    }
  }

  private addTilemaps() {
    let map1 = this.add.tilemap('map1');
    let tilemap = map1.addTilesetImage('tileset_map1', 'tileset');

    let ground = map1.createStaticLayer('ground', [tilemap], 0, 0).setDepth(-1);
    let obstacle = map1
      .createStaticLayer('obstacle', [tilemap], 0, 0)
      .setDepth(1);

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.exp, ground);
    this.physics.add.collider(this.player, obstacle);
    this.physics.add.collider(this.bullets, ground, (d, c) => {
      let b = <Phaser.Physics.Arcade.Sprite>d;
      b.destroy();
      console.log(d, c);

      this.explode(b.x, b.y);
    });

    ground.setCollisionByProperty({collide: true});
    obstacle.setCollisionByProperty({collide: true});
  }
}
