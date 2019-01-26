import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";
import SoundManager from "./soundmanager";
import Planet from "./planet";

export default class Blast implements Entity {
    private image: Phaser.Physics.Arcade.Sprite;
    private life = 10;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
        public blastDirection: number,
        public damage: number,
    ) {
        const spriteName = "explosion" +  (Math.floor(Math.random() * 4) + 1) + "";
        const animationName = spriteName + "-animation";
        const scale = 1.0;
        this.life = 64;

        console.log(spriteName);

        this.image = this.scene.physics.add
            .staticSprite(x, y, spriteName)
            .setScale(scale, scale);
        this.image.depth = 100;
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
        this.life--;
        if (this.life <= 0) {
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
