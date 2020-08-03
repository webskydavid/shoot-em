import Gun from './gun';

export default class Player extends Phaser.GameObjects.Sprite {
  private atTop: boolean = false;
  private atBottom: boolean = false;
  private gunTopRadius: number = 60;
  private gunBottomRadius: number = 20;
  private flip: boolean = false;
  private speed: number = 100;
  private jumpSpeed: number = 300;
  gun: Gun;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  body: Phaser.Physics.Arcade.Body;
  gunUp: Phaser.Input.Keyboard.Key;
  gunDown: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
  }

  create() {
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
    const {x, y} = this.getCenter();
    this.gun = new Gun(this.scene, x, y);
  }

  // UPDATE -------------
  update() {
    this.playerControl();
    this.gunControl();
  }

  private gunControl() {
    let vec1 = new Phaser.Math.Vector2(2, 2).normalize();
    let vec2 = new Phaser.Math.Vector2(1, 1).setToPolar(10, 40);

    const {angle, rotation} = this.gun;
    const {x, y} = this.getCenter();

    let reverse = Phaser.Math.Angle.Reverse(angle);
    let rad2Deg = Phaser.Math.RadToDeg(angle);
    let deg2Rad = Phaser.Math.DegToRad(rotation);

    console.log({angle, rotation}, {reverse, rad2Deg, deg2Rad});

    this.gun.setPosition(x, y);
    console.log(Math.cos(100), Math.sin(100));

    if (this.flip) {
      this.gun.setOrigin(1, 0.5);
      this.gun.flipX = true;
    } else {
      this.gun.setOrigin(0, 0.5);
      this.gun.flipX = false;
    }
    if (this.gunUp.isDown) {
      this.gun.body.setAngularVelocity(-40);
    } else if (this.gunDown.isDown) {
      this.gun.body.setAngularVelocity(40);
    } else {
      this.gun.body.setAngularVelocity(0);
    }

    // if (!this.flip) {
    //   if (angle < -60 && angle > -65) {
    //     this.gun.angle = -60;
    //   }
    //   if (angle > 20 && angle < 25) {
    //     this.gun.angle = 20;
    //   }
    //   if (angle >= -60 && angle <= 20) {
    //     if (this.gunUp.isDown) {
    //       this.gun.body.setAngularVelocity(-40);
    //     } else if (this.gunDown.isDown) {
    //       this.gun.body.setAngularVelocity(40);
    //     } else {
    //       this.gun.body.setAngularVelocity(0);
    //     }
    //   } else if (angle >= -120 && angle >= 160) {
    //     this.gun.angle = angle + 180;
    //   } else {
    //     this.gun.body.setAngularVelocity(0);
    //   }
    // } else {
    //   if (angle > -120 && angle < -115) {
    //     console.log(0);

    //     this.gun.angle = -120;
    //   }
    //   if (angle < 160 && angle > 155) {
    //     console.log(1);

    //     this.gun.angle = 160;
    //   }
    //   if (angle <= -120 && angle >= 160) {
    //     if (this.gunUp.isDown) {
    //       this.gun.body.setAngularVelocity(40);
    //     } else if (this.gunDown.isDown) {
    //       this.gun.body.setAngularVelocity(-40);
    //     } else {
    //       this.gun.body.setAngularVelocity(0);
    //     }
    //   } else if (angle >= -60 && angle <= 20) {
    //     this.gun.angle = -(angle + 180);
    //   } else {
    //     this.gun.body.setAngularVelocity(0);
    //   }
    // }

    // if (this.gunUp.isDown) {
    //   this.gun.body.setAngularVelocity(-40);
    // } else if (this.gunDown.isDown) {
    //   this.gun.body.setAngularVelocity(40);
    // } else {
    //   this.gun.body.setAngularVelocity(0);
    // }
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
