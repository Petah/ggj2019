import GM from "./gm";
import DefaultScene from "./scenes/default";

export default class Ship {
    public image: Phaser.Physics.Arcade.Image;
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    public speed: number = 0;
    public direction: number = 0;
    private acceleration: number = 50;
    private maxSpeed: number = 300;

    constructor(private scene: DefaultScene) {
    }

    create() {
        this.image = this.scene.physics.add.image(500, 500, 'red-circle');
        // this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
    }

    update() {
        if (this.cursors.space.isDown) {
            this.speed -= this.acceleration;
        } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
            GM.motionAdd(this, this.acceleration, 45);
        } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
            GM.motionAdd(this, this.acceleration, 135);
        } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
            GM.motionAdd(this, this.acceleration, 225);
        } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
            GM.motionAdd(this, this.acceleration, 315);
        } else if (this.cursors.right.isDown) {
            GM.motionAdd(this, this.acceleration, 0);
        } else if (this.cursors.down.isDown) {
            GM.motionAdd(this, this.acceleration, 90);
        } else if (this.cursors.left.isDown) {
            GM.motionAdd(this, this.acceleration, 180);
        } else if (this.cursors.up.isDown) {
            GM.motionAdd(this, this.acceleration, 270);
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < 0) {
            this.speed = 0;
        }
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);
    }
};
