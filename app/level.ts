import Planet from "./planet";
import DefaultScene from "./scenes/default";
import Entity from "./entity";

export default class Level implements Entity {
    id: number
    public width: number = 10000;
    public height: number = 10000;
    private planetCount = 100;
    public planets: Planet[] = [];
    private line: Phaser.Geom.Line;

    constructor(
        private scene: DefaultScene,
    ) {
        this.line = new Phaser.Geom.Line(0, 0, this.width, this.height);

        for (let i = 0; i < this.planetCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const planet = new Planet(this.scene,
                "Planet 1",
                x,
                y,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                null);
            planet.create();
            this.planets.push(planet);
        }
    }

    update() {
        this.scene.graphics.lineStyle(5, 0xFF00FF, 1.0);
        this.scene.graphics.beginPath();
        this.scene.graphics.moveTo(0, 0);
        this.scene.graphics.lineTo(this.width, this.height);
        this.scene.graphics.strokePath();

        for (const planet of this.planets) {
            planet.update();
        }
    }
}

