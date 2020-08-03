export default class Gun extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'gun');
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
  }

  update() {
    console.log('GUN');
  }
}
