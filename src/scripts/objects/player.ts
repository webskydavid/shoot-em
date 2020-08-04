import Gun from './gun';

export default class Player extends Phaser.GameObjects.Sprite {
  // Parameters
  private pointX = 0;
  private pointY = 0;
  private flip: boolean = false;
  private speed: number = 100;
  private jumpSpeed: number = 300;
  // GameObjects
  bullets: Phaser.GameObjects.Group;
  pointer: Phaser.GameObjects.Rectangle;
  gun: Gun;
  // Inputs
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  body: Phaser.Physics.Arcade.Body;
  gunUp: Phaser.Input.Keyboard.Key;
  gunDown: Phaser.Input.Keyboard.Key;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    bullets: Phaser.GameObjects.Group
  ) {
    super(scene, x, y, 'player');
    this.bullets = bullets;
    this.create();
  }

  create() {
    const {x, y} = this.getCenter();
    // Player setting
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.body.setSize(12, 24);
    this.body.setBounce(0.1, 0.1);
    this.body.setCollideWorldBounds(true);
    this.body.setMass(100);
    this.body.setFriction(1, 1);
    this.body.setMaxSpeed(this.speed + 20);
    this.body.setMaxVelocity(200);
    this.inputs();

    // Gun setting
    this.gun = new Gun(this.scene, x, y, this.bullets);

    this.pointX = x;
    this.pointY = y;
    this.pointer = this.scene.add.rectangle(x, y, 10, 10, 100);
    this.pointer.setVisible(false);
  }

  // UPDATE -------------
  update() {
    this.playerControl();
    this.gunControl();
  }

  private gunControl() {
    let {x, y} = this.getCenter();
    let target = Phaser.Math.Angle.Between(x, y, this.pointX, this.pointY);

    this.gun.update();
    this.gun.setPosition(x, y);
    this.gun.setOrigin(0.5, 0.5);
    this.gun.setRotation(target);

    if (!this.flip) {
      if (this.gunUp.isDown) {
        this.pointY -= 1;
      } else if (this.gunDown.isDown) {
        this.pointY += 1;
      }
      this.pointX = x + 30;
    } else {
      if (this.gunUp.isDown) {
        this.pointY -= 1;
      } else if (this.gunDown.isDown) {
        this.pointY += 1;
      }
      this.pointX = x - 30;
    }

    // TODO: delete this line
    this.pointer.setPosition(this.pointX, this.pointY);
  }

  private playerControl() {
    if (this.left.isDown) {
      this.flip = true;
      this.body.setVelocityX(-this.speed);
    } else if (this.right.isDown) {
      this.flip = false;

      this.body.setVelocityX(this.speed);
    } else {
      this.body.setVelocityX(0);
    }

    if (this.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-this.jumpSpeed);
    }
  }

  private inputs() {
    // Movement
    this.left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );

    // Gun movement
    this.gunUp = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.gunDown = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L
    );
  }
}
