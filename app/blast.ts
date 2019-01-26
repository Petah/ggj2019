import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

export default class Blast implements Entity {
    private image: Phaser.Physics.Arcade.Sprite;
    private life = 10;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        public blastDirection: number
    ) {
        var sprite = this.scene.add.sprite(x, y, "explosion").setScale(0.5, 0.5);
        sprite.depth = 100;
        sprite.play("explosion-animation");

        this.image = this.scene.physics.add
            .staticSprite(x, y, "explosion")
            .setScale(0.5, 0.5);
        this.image.depth = 300;
        this.image.play("explosion-animation");



        this.scene.sound.add('explosion').play();
    }

    update() {
        this.life--;
        if (this.life <= 0) {
            for (const entity of this.scene.entities) {
                if (entity instanceof Ship) {
                    const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                    if (distance < 10) {
                        entity.damage(0.1, this.blastDirection);
                    }
                }
            }
            this.scene.removeEntity(this);
        }
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
