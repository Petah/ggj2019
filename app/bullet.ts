import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";

export default class Bullet extends Entity{
    public image: Phaser.Physics.Arcade.Image;
    public speed: number = 600;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        private direction: number,
    ) {
        super(x, y)
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
