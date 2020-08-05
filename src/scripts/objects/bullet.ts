export default class Bullet extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame?: number
  ) {
    super(scene, x, y, key);
    this.create();
  }

  create() {
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.body.setMass(200);
    this.body.setFriction(20, 20);
    this.body.setSize(8, 8);
    this.body.setBounce(0.01, 0.01);
  }

  update() {
    console.log('BULLET');
  }
}
