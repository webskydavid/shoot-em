import Rock from './rock';

export default class ExplosionGroup extends Phaser.Physics.Arcade.Factory {
  objGroup: Phaser.Physics.Arcade.Group;

  constructor(world: Phaser.Physics.Arcade.World) {
    super(world);
    this.objGroup = this.group({
      runChildUpdate: true,
      classType: Rock,
    });
  }

  explode(x: number, y: number) {
    for (let i = 0; i < 20; i++) {
      let explosionPower = 20;
      let rockPositionOffset = 1.5;
      let rndPositionOffset =
        Phaser.Math.RND.between(-5, 5) * Phaser.Math.RND.frac();
      let rock = <Rock>this.objGroup.create(x + rndPositionOffset, y);
      let body = <Phaser.Physics.Arcade.Body>rock.body;
      let size = Phaser.Math.RND.frac();
      let angle = Phaser.Math.Angle.Between(
        x,
        y,
        rock.x,
        rock.y - rockPositionOffset
      );

      rock.setScale(size * 3);
      body.setMass(rock.scale * 5);
      body.setSize(size, size);
      body.setDrag(2 * body.mass, 2 * body.mass);
      body.setBounce(0.1, 0.1);
      body.setFriction(100, 100);
      rock.flipX = !!rndPositionOffset;

      body.setVelocity(
        Math.cos(angle) * explosionPower * body.mass,
        Math.sin(angle) * explosionPower * body.mass
      );
      body.setAngularVelocity(angle * body.mass * rock.scale * explosionPower);

      // --- Debug elements
      //this.add.rectangle(x, y, 3, 3, 0xff0000); // bomb
      //this.add.rectangle(rock.x, rock.y - rockPositionOffset, 3, 3, 0x00ff00); // rocks
      // ---
    }
  }
}
