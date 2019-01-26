import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";

export default class Stars implements Entity {
    id: number
    private layers: Layer[] = [];
    private layerCount: number = 3;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(
        private scene: DefaultScene,
    ) {
        for (let i = 0; i < this.layerCount; i++) {
            this.layers.push(new Layer(this.scene, i + 2));
        }


        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 0.25,
            },
        });
        this.graphics.depth = 50;

        const gridSize = 600;
        for (let x = gridSize; x < this.scene.level.width - gridSize; x += gridSize) {
            const line = new Phaser.Geom.Line(x, 0, x, this.scene.level.height);
            this.graphics.strokeLineShape(line);
        }
        for (let y = gridSize; y < this.scene.level.height - gridSize; y += gridSize) {
            const line = new Phaser.Geom.Line(0, y, this.scene.level.height, y);
            this.graphics.strokeLineShape(line);
        }
    }

    update() {
        for (const layer of this.layers) {
            layer.update();
        }
    }
    
    slowUpdate() {

    }
};

class Layer {
    private stars: Star[] = [];
    private starCount: number = 1000;
    constructor(
        private scene: DefaultScene,
        private offset,
    ) {
        for (let i = 0; i < this.starCount; i++) {
            const x = Math.random() * this.scene.level.width;
            const y = Math.random() * this.scene.level.height;
            const image = this.scene.add.image(x, y, 'star');
            image.depth = offset;
            const scale = offset * 0.15 + 0.1;
            image.setScale(scale, scale);
            image.setAlpha(1 / (offset / Math.random()) * 2);
            const star = new Star(x, y, image);
            this.stars.push(star);
        }
    }

    update() {
        for (const star of this.stars) {
            const ox = this.scene.cameras.main.worldView.x / this.offset;
            const oy = this.scene.cameras.main.worldView.y / this.offset;
            star.image.setPosition(star.x + ox, star.y + oy);
        }
    }
}

class Star {
    constructor(
        public x,
        public y,
        public image: Phaser.GameObjects.Image,
    ) {

    }
}