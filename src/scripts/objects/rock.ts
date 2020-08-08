export default class Rock extends Phaser.GameObjects.Sprite {
  particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, 'rock');
    this.create();
  }

  create() {
    this.particles = this.scene.add.particles('smoke');

    var emitter = this.particles.createEmitter({
      frame: ['smoke', 'l_debris', 'm_debris', 's_debris'],
      maxParticles: 15,
      rotate: <any>{
        onEmit: (particle, key, t, value) => {
          return this.body.speed * 5;
        },
      },
      speed: <any>{
        onEmit: (particle, key, t, value) => {
          return this.body.speed * 0.1;
        },
      },
      lifespan: <any>{
        onEmit: (particle, key, t, value) => {
          return 2000;
        },
      },
      alpha: <any>{
        onEmit: (particle, key, t, value) => {
          return Phaser.Math.Percent(this.body.speed, 0, 300) * 1000;
        },
      },
      scale: {start: 2, end: 0},
    });

    emitter.startFollow(this);
  }

  update() {
    console.log(this.name);
    if (this.body.onFloor()) {
      this.destroy();
      this.particles.destroy();
    }
    // if (this.scene.game.loop.framesThisSecond % 10 === 0) {
    //   console.log('Rock', this.scene.game.loop.framesThisSecond);
    //   this.alpha -= 0.1;
    // }
  }
}
