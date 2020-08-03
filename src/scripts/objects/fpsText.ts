export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, '', {color: 'black', fontSize: '28px'});
    scene.add.existing(this);
    this.setOrigin(0);
    // this.setResolution(800);
    this.setScale(0.5);
  }

  public update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
