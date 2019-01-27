import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";
import SoundManager from "./soundmanager";
import Planet from "./planet";

export default class Blast implements Entity {
    private image: Phaser.Physics.Arcade.Sprite;
    private blastLifeSpan = 10;
    private sprite: Phaser.GameObjects.Sprite;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        public blastDirection: number,
        public damage: number,
        spriteName: string,
        animationName: string,
        blastLifeSpan: number
    ) {
        this.blastLifeSpan = blastLifeSpan;
        this.sprite = this.scene.add.sprite(x, y, spriteName).setScale(0.5, 0.5);
        this.sprite.depth = 100;
        this.sprite.play(animationName);

        this.image = this.scene.physics.add
            .staticSprite(x, y, spriteName)
            .setScale(0.5, 0.5);
        this.image.depth = 300;
        this.image.play(animationName);

        this.scene.soundManager.playFromLocation("explosion", x, y);

        for (const entity of this.scene.entities) {
            if (entity instanceof Ship) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    entity.damage(this.damage, this.blastDirection);
                    return;
                }
            }
            if (entity instanceof Planet) {
                const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                if (distance < 25) {
                    entity.damage(this.damage, this.blastDirection);
                    return;
                }
            }
        }
    }

    update() {
        this.blastLifeSpan--;
        if (this.blastLifeSpan <= 0) {
            this.scene.removeEntity(this);
            this.image.destroy();
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
