export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '', {color: 'black', fontSize: '20px'});
    scene.add.existing(this);
    this.setOrigin(0);
    this.setScale(0.5);
  }

  public update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
