import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

export default class Blast implements Entity {
    private image: Phaser.GameObjects.Image;
    private life = 10;

    constructor(
        private scene: DefaultScene,
        x: number,
        y: number,
    ) {
        this.image = this.scene.add.image(x, y, 'red-circle');
        this.image.depth = 300;
    }

    update() {
        this.life--;
        if (this.life <= 0) {
            for (const entity of this.scene.entities) {
                if (entity instanceof Ship) {
                    const distance = GM.pointDistance(this.x, this.y, entity.x, entity.y);
                    if (distance < 10) {
                        entity.damage(0.1);
                    }
                }
            }
            this.image.destroy();
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
