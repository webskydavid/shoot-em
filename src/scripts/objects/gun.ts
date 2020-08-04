import Bullet from './bullet';

export default class Gun extends Phaser.GameObjects.Sprite {
  private canShoot: boolean = true;
  bullets: Phaser.GameObjects.Group;
  bullet: Bullet;
  body: Phaser.Physics.Arcade.Body;
  shoot: Phaser.Input.Keyboard.Key;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    bullets: Phaser.GameObjects.Group
  ) {
    super(scene, x, y, 'gun');
    this.bullets = bullets;
    this.create();
  }

  create() {
    console.log('Log: [Create]');
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.shoot = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    if (this.shoot.isDown && this.canShoot) {
      this.addBullet();
      this.canShoot = false;
    } else if (this.shoot.isUp) {
      this.canShoot = true;
    }
  }

  private addBullet() {
    let bullet = this.bullets.create(this.x, this.y);

    ///let bullet = this.bullets.add(new Bullet(this.scene, this.x, this.y));
    console.log(bullet);

    this.scene.physics.velocityFromRotation(
      this.rotation,
      400,
      bullet.body.velocity
    );
  }
}
