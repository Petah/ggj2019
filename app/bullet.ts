import GM from "./gm";
import DefaultScene from "./scenes/default";

export default class Bullet {
    public image: Phaser.Physics.Arcade.Image;
    public speed: number = 600;

    constructor(
        private scene: DefaultScene,
        private x: number,
        private y: number,
        private direction: number,
    ) {
        this.image = this.scene.physics.add.image(x, y, 'bullet');
    }

    update() {
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.angle = this.direction;
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);
    }
};
