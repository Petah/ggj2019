import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Blast from "./blast";
import Ship from "./ship";

export default class Bullet implements Entity {
    private image: Phaser.Physics.Arcade.Image;
    private speed: number = 600;

    private startX: number;
    private startY: number;

    constructor(
        private scene: DefaultScene,
        private owner: any,
        private dx: number,
        private dy: number,
        public direction: number,
        public damage: number,
    ) {
        this.image = this.scene.physics.add.image(owner.x, owner.y, 'bullet');
        this.startX = owner.x;
        this.startY = owner.y;
    }

    update() {
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.angle = this.direction;
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);

        const distance = GM.pointDistance(this.owner.x, this.owner.y, this.x, this.y);
        const maxDistance = GM.pointDistance(this.startX, this.startY, this.dx, this.dy);
        if (distance >= maxDistance) {
            this.blast();
        }

        for (const entity of this.scene.entities) {
            if (entity instanceof Ship && entity != this.owner) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    this.blast();
                }
            }
        }
    }

    private blast() {
        this.image.destroy();
        this.scene.removeEntity(this);
        const blast = new Blast(this.scene, this.x, this.y, this.direction, this.damage);
        this.scene.addEntity(blast);
    }

    slowUpdate() {

    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
