import Bullet from './bullet';
import MainScene from '../scenes/mainScene';

export default class Gun extends Phaser.GameObjects.Sprite {
  private canShoot: boolean = true;
  bullet: Bullet;
  body: Phaser.Physics.Arcade.Body;
  shoot: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'gun');
    this.create();
  }

  create() {
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
    let scene = <MainScene>this.scene;
    let bullet = scene.bullets.create(this.x, this.y, 'bullet');
    this.scene.physics.velocityFromRotation(
      this.rotation,
      400,
      bullet.body.velocity
    );
  }
}
