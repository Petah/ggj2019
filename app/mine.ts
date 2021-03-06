import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Blast from "./blast";
import Ship from "./ship";
import { BulletType } from "./bulletTypeEnum";
import Planet from "./planet";

export default class Mine implements Entity {
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
        public bulletType: BulletType
    ) {


        this.image = this.getSprite(bulletType, owner.x, owner.y);
        this.startX = owner.x;
        this.startY = owner.y;
    }

    getSprite(bulletType: BulletType, x: number, y: number): Phaser.Physics.Arcade.Image {
        return this.scene.physics.add.image(x, y, 'mine').setScale(0.2, 0.2);
    }

    update() {
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);

        const distance = GM.pointDistance(this.owner.x, this.owner.y, this.x, this.y);
        const maxDistance = GM.pointDistance(this.startX, this.startY, this.dx, this.dy);
        if (distance >= maxDistance) {
            this.speed = 0;
        }

        for (const entity of this.scene.entities) {
            if (entity instanceof Ship && this.speed == 0) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    this.blast();
                    return;
                }
            }
            if (entity instanceof Planet && entity.species != this.owner.species && this.speed == 0) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    this.blast();
                    return;
                }
            }
        }
    }

    private blast() {
        this.image.destroy();
        this.scene.removeEntity(this);
        let blast;

        switch (this.bulletType) {
            case BulletType.nuke:
                this.scene.soundManager.playFromLocation("nuke-exp", this.x, this.y);
                blast = new Blast(this.scene, this.x, this.y, this.direction, this.damage, "nuclear-explosion", 'nuclear-explosion-animation', 15);
                break;

            case BulletType.laser:
            default:
                this.scene.soundManager.playFromLocation("explosion", this.x, this.y);
                const spriteName = "explosion" + (Math.floor(Math.random() * 4) + 1) + "";
                const animationName = spriteName + "-animation";

                blast = new Blast(this.scene, this.x, this.y, this.direction, this.damage, spriteName, animationName, 64);
                break;

        }
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
