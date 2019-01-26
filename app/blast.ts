import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";

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
            this.image.destroy();
            this.scene.removeEntity(this);
        }
    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
