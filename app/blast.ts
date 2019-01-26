import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";
import SoundManager from "./soundmanager";

export default class Blast implements Entity {
    private image: Phaser.Physics.Arcade.Sprite;
    private life = 10;
    private sprite: Phaser.GameObjects.Sprite;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        public blastDirection: number,
        public damage: number,
    ) {
        this.sprite = this.scene.add.sprite(x, y, "explosion").setScale(0.5, 0.5);
        this.sprite.depth = 100;
        this.sprite.play("explosion-animation");

        this.image = this.scene.physics.add
            .staticSprite(x, y, "explosion")
            .setScale(0.5, 0.5);
        this.image.depth = 300;
        this.image.play("explosion-animation");

        this.scene.soundManager.playFromLocation("explosion", x, y);

        for (const entity of this.scene.entities) {
            if (entity instanceof Ship) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    entity.damage(this.damage, this.blastDirection);
                }
            }
        }
    }

    update() {
        this.life--;
        if (this.life <= 0) {
            this.scene.removeEntity(this);
            this.sprite.destroy();
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
