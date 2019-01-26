import Planet from "./planet";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetTypeFactory from "./game-objects/entity-types/planet-related-objects/planetTypeFactory";
import PlanetNameGenerator from "./game-objects/entity-types/planet-related-objects/planetNameGenerator";
import PopulationFactory from "./game-objects/entity-types/planet-related-objects/populationObjects/populationFactory";
import GM from "./gm";

export default class Level implements Entity {
    id: number
    public width: number = 6000;
    public height: number = 6000;
    private planetCount = 13;
    public planets: Planet[] = [];

    private planetNameGenerator: PlanetNameGenerator;
    private populationFactory: PopulationFactory;

    constructor(
        private scene: DefaultScene,
    ) {

        this.planetNameGenerator = new PlanetNameGenerator();
        this.populationFactory = new PopulationFactory();

        this.spawnBetween(0, 0, this.width / 2, this.height / 2, 1);
        this.spawnBetween(this.width / 2, 0, this.width / 2, this.height / 2, 3);
        this.spawnBetween(0, this.height / 2, this.width / 2, this.height / 2, 4);
        this.spawnBetween(this.width / 2, this.height / 2, this.width / 2, this.height / 2, 2);
    }

    spawnBetween(minX, minY, width, height, sectorNumber) {
        for (let i = 0; i < this.planetCount; i++) {
            let x;
            let y;
            let bail = 30;
            do {
                x = minX + Math.random() * width;
                y = minY + Math.random() * height;
                if (bail-- <= 0) {
                    break;
                }
            } while (!this.planetSpaceFree(x, y, minX, minY, width, height));

            const type = new PlanetTypeFactory().random();
            const planet = new Planet(
                this.scene,
                this.planetNameGenerator.generateName(type),
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
                Math.random() * 80 + 10, // resources
                1, // food
                Math.random() * 5 + 20, // planet size
                type,
                this.populationFactory,
                sectorNumber,
            );
            // planet.populations.setAllegianceForTeam(te)
            this.planets.push(planet);
            this.scene.addEntity(planet);
        }
    }

    planetSpaceFree(x: number, y: number, minX, minY, width, height): boolean {
        const gap = 300;
        if (x < minX + gap || x > minX + width - gap) {
            return false;
        }
        if (y < minY + gap || y > minY + height - gap) {
            return false;
        }
        for (const planet of this.planets) {
            const distance = GM.pointDistance(planet.x, planet.y, x, y);
            if (distance < gap) {
                return false;
            }
        }
        return true;
    }

    update() {
    }

    slowUpdate() {

    }
}

