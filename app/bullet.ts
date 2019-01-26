import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Blast from "./blast";

export default class Bullet implements Entity{
    private image: Phaser.Physics.Arcade.Image;
    private speed: number = 600;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        private dx: number,
        private dy: number,
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

        const distance = GM.pointDistance(this.x, this.y, this.dx, this.dy);
        if (distance < 10) {
            this.image.destroy();
            this.scene.removeEntity(this);
            const blast = new Blast(this.scene, this.x, this.y);
            this.scene.addEntity(blast);
        }
    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
