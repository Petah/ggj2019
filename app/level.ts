import Planet from "./planet";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetTypeFactory from "./game-objects/entity-types/planet-related-objects/planetTypeFactory";
import PlanetNameGenerator from "./game-objects/entity-types/planet-related-objects/planetNameGenerator";

export default class Level implements Entity {
    id: number
    public width: number = 4000;
    public height: number = 4000;
    private planetCount = 100;
    public planets: Planet[] = [];
    private line: Phaser.Geom.Line;

    constructor(
        private scene: DefaultScene,
    ) {
        this.line = new Phaser.Geom.Line(0, 0, this.width, this.height);
        let planetNameGenerator = new PlanetNameGenerator();

        for (let i = 0; i < this.planetCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const type = new PlanetTypeFactory().random();

            const planet = new Planet(
                this.scene,
                planetNameGenerator.generateName(type),
                x,
                y,
                1,
                1,
                1,
                1,
                1,
                1,
                0, // population
                1,
                1,
                1,
                Math.random() * 0.2 + 0.1, // planet size
                type,
            );
            this.planets.push(planet);
            this.scene.addEntity(planet);
        }
    }

    update() {
        // this.scene.graphics.lineStyle(5, 0xFF00FF, 1.0);
        // this.scene.graphics.beginPath();
        // this.scene.graphics.moveTo(0, 0);
        // this.scene.graphics.lineTo(this.width, 0);
        // this.scene.graphics.lineTo(this.width, this.height);
        // this.scene.graphics.lineTo(0, this.height);
        // this.scene.graphics.closePath();
        // this.scene.graphics.strokePath();
    }
}

