import Planet from "./planet";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetTypeFactory from "./game-objects/entity-types/planet-related-objects/planetTypeFactory";
import PlanetNameGenerator from "./game-objects/entity-types/planet-related-objects/planetNameGenerator";
import PopulationFactory from "./game-objects/entity-types/planet-related-objects/populationObjects/populationFactory";
import GM from "./gm";

export default class Level implements Entity {
    id: number
    public width: number = 5000;
    public height: number = 5000;
    private planetCount = 20;
    public planets: Planet[] = [];
    private line: Phaser.Geom.Line;

    constructor(
        private scene: DefaultScene,
    ) {
        this.line = new Phaser.Geom.Line(0, 0, this.width, this.height);
        let planetNameGenerator = new PlanetNameGenerator();
        let populationFactory = new PopulationFactory();

        for (let i = 0; i < this.planetCount; i++) {
            let x;
            let y;
            let bail = 100;
            do {
                x = Math.random() * this.width;
                y = Math.random() * this.height;
                if (bail-- <= 0) {
                    break;
                }
            } while (!this.planetSpaceFree(x, y));

            const type = new PlanetTypeFactory().random();

            const planet = new Planet(
                this.scene,
                planetNameGenerator.generateName(type),
                x,
                y,
                
                1, // mining
                1, // spacePort
                1, // industry
                1, // agriculture
                1, // defence
                1, // education

                null, // population
                0, // health
                1, // money
                Math.random() * 100, // resources
                1, // food
                Math.random() * 5 + 20, // planet size
                type,
            );

            planet.populations = populationFactory.generatePopulationForPlanet(planet);
            this.planets.push(planet);
            this.scene.addEntity(planet);
        }
    }

    planetSpaceFree(x: number, y: number): boolean {
        if (x < 100 || x > this.width - 100) {
            return false;
        }
        if (y < 100 || y > this.height - 100) {
            return false;
        }
        for (const planet of this.planets) {
            const distance = GM.pointDistance(planet.x, planet.y, x, y);
            if (distance < 100) {
                return false;
            }
        }
        return true;
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

