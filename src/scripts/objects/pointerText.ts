export default class PointerText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '', {color: 'black', fontSize: '20px'});
    scene.add.existing(this);
    this.setOrigin(0);
    this.setScale(0.5);
  }

  public update() {
    var pointer = <Phaser.Input.Pointer>this.scene.input.activePointer;
    this.setText([
      'x: ' + pointer.x.toFixed(2),
      'y: ' + pointer.y.toFixed(2),
      // 'mid x: ' + pointer.midPoint.x,
      // 'mid y: ' + pointer.midPoint.y,
      // 'velocity x: ' + pointer.velocity.x,
      // 'velocity y: ' + pointer.velocity.y,
      // 'movementX: ' + pointer.movementX,
      // 'movementY: ' + pointer.movementY,
    ]);
  }
}
