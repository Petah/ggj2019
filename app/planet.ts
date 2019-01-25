import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-related-objects/planetType";

export default class Planet implements Entity {
    id: number;
    private image: Phaser.GameObjects.Image;
    private maxPopulation: number;

    public maxMining: number;
    public maxSpacePort: number;
    public maxIndustry: number;
    public maxAgriculture: number;
    public maxDefence: number;
    public maxEducation: number;
    public maxInfastrucutre: number;
    public maxHealth: number;

    private circle: Phaser.Geom.Circle;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(
        private scene: DefaultScene,
        public name: string,
        public x: number,
        public y: number,

        // infrastructure
        public mining: number,
        public spacePort: number,
        public industry: number,
        public agriculture: number,
        public defence: number,
        public education: number,

        public population: number,
        public health: number,
        public money: number,
        public resources: number,
        public food: number,
        public planetSize: number,
        public plantetType: PlanetType
    ) {
        var sprite = this.scene.add.sprite(this.x, this.y, 'planet1').setScale(this.planetSize, this.planetSize);
        sprite.play('planet1-animation');

        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xdddddd,
            }
        });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, this.planetSize * 25 + 4);

        this.createMaxPopulationLimit();
    }

    update() {
    }

    private createMaxPopulationLimit() {
        // 0.3 large planet size
        // 0.1 small planet size

        var temp = 60000000000; // 60 billion
        this.maxPopulation = temp * this.plantetType.maxPopulationModifier * this.planetSize
        console.log("Max Population for: " + this.name + " is " + this.maxPopulation);
    }

    get infrastructure(): number {
        return this.education + this.industry; // @todo
    }

    draw() {
        this.graphics.clear();
        if (this.population > 0) {
            this.graphics.lineStyle(1, 0x00ff00);
        } else {
            this.graphics.lineStyle(1, 0xdddddd);
        }
        this.graphics.strokeCircleShape(this.circle);
    }
}
