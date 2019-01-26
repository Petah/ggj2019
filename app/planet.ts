import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-related-objects/planetType";
import Population from "./game-objects/entity-types/planet-related-objects/populationObjects/population";

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
    private planetScale: number;

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

        public populations: Population[],
        public health: number,
        public money: number,
        public resources: number,
        public food: number,
        public planetSize: number,
        public planetType: PlanetType
    ) {
        this.planetScale = planetSize / 74.0;
        var sprite = this.scene.add.sprite(this.x, this.y, this.spriteNameFor(planetType)).setScale(this.planetScale, this.planetScale);
        sprite.depth = 100;
        sprite.play(this.animationNameFor(planetType));

        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xdddddd,
            }
        });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, planetSize * 0.5 + 4);
        this.draw();
        this.createMaxPopulationLimit();
    }

    update() {
    }

    private createMaxPopulationLimit() {
        // 0.3 large planet size
        // 0.1 small planet size

        var temp = 60000000000; // 60 billion
        this.maxPopulation = temp * this.planetType.maxPopulationModifier * this.planetScale
    }

    get infrastructure(): number {
        return this.agriculture
            + this.defence
            + this.mining
            + this.spacePort
            + this.education;
    }

    draw() {
        this.graphics.clear();
        if (this.getTotalPopulationConsumed() > 0) {
            this.graphics.lineStyle(1, 0x00ff00);
        } else {
            this.graphics.lineStyle(1, 0xdddddd);
        }
        this.graphics.strokeCircleShape(this.circle);
    }

    get canSell(): boolean {
        // @todo check alliance
        return this.getTotalPopulationConsumed() > 0;
    }

    get canInvest(): boolean {
        // @todo check alliance
        return this.getTotalPopulationConsumed() > 0;
    }

    // private functions
    private spriteNameFor(planetType: PlanetType) {
        switch (planetType.typeName) {
            case "Gas Giant": return "planet-gasgiant";
            case "Volcanic": return "planet-volcanic";
            case "Continental": return "planet-continental";
            case "Jungle": return "planet-jungle";
            case "Forest": return "planet-forest";
            case "Desert": return "planet-desert";
            case "Barren": return "planet-barren";
            case "Ocean": return "planet-ocean";
            case "Ice": return "planet-ice";
            case "Tundra": return "planet-tundra";
            case "Gaia": return "planet-gaia";
        }
        return "planet-barren";
    }

    private animationNameFor(planetType: PlanetType) {
        switch (planetType.typeName) {
            case "Gas Giant": return "planet-gasgiant-animation";
            case "Volcanic": return "planet-volcanic-animation";
            case "Continental": return "planet-continental-animation";
            case "Jungle": return "planet-jungle-animation";
            case "Forest": return "planet-forest-animation";
            case "Desert": return "planet-desert-animation";
            case "Barren": return "planet-barren-animation";
            case "Ocean": return "planet-ocean-animation";
            case "Ice": return "planet-ice-animation";
            case "Tundra": return "planet-tundra-animation";
            case "Gaia": return "planet-gaia-animation";
        }
        return "planet-barren";
    }

    public getTotalPopulationConsumed(): number {
        let populationConsumed: number = 0;

        if (this.populations != null && this.populations.length > 0) {
            for (const populationGroup of this.populations) {
                populationConsumed += populationGroup.calculatePopulationConsumption(this);
            }
        }

        return populationConsumed;
    }
}
