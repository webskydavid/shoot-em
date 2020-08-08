import Rock from './rock';
import Bullet from './bullet';

export default class BulletsGroup extends Phaser.Physics.Arcade.Factory {
  objGroup: Phaser.Physics.Arcade.Group;

  constructor(world: Phaser.Physics.Arcade.World) {
    super(world);
    this.objGroup = this.group({
      dragX: 100,
      dragY: 100,
      mass: 2000,
      quantity: 10,
      max: 10,
      classType: Bullet,
    });
  }
}
