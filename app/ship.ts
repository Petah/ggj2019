import GM from "./gm";

export default class Ship {
    private image: Phaser.Physics.Arcade.Image;
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    public speed: number = 0;
    public direction: number = 0;
    private acceleration: number = 50;
    private maxSpeed: number = 300;

    constructor(private scene: Phaser.Scene) {
    }

    create() {
        this.image = this.scene.physics.add.image(100, 100, 'red-circle');
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.right.isDown) {
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
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);
    }
};
