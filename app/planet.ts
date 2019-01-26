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

    public planetType: PlanetType;

    private circle: Phaser.Geom.Circle;
    private rectangles: Array<Phaser.Geom.Rectangle>;
    private graphics: Phaser.GameObjects.Graphics;
    private planetScale: number;
    private planetSize: number;
    

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

        public populations: Population,
        public health: number,
        public money: number,
        public resources: number,
        public food: number,
        public size: number,
        public type: PlanetType
    ) {
        this.planetSize = size;
        this.planetScale = size / 74.0;
        this.planetType = type;

        var sprite = this.scene.add.sprite(this.x, this.y, this.spriteNameFor(type)).setScale(this.planetScale, this.planetScale);
        sprite.depth = 100;
        sprite.play(this.animationNameFor(type));

        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xdddddd,
            }
        });
        this.circle = new Phaser.Geom.Circle(this.x, this.y, size * 0.5 + 1);
        this.rectangles = Array<Phaser.Geom.Rectangle>();
        for (var i = 0; i < 3; i++) {
            this.rectangles.push(new Phaser.Geom.Rectangle(this.x - size * 0.5, this.y - size * 0.5, size, size));
        }


        this.createMaxPopulationLimit();
    }

    update() {
        this.graphics.clear();

        //this.graphics.lineStyle(1, 0xffffff); // unoccupied - white
        //this.graphics.lineStyle(1, 0xffff00); // neutral - yellow
        this.graphics.lineStyle(1, 0x00ff00); // ally - green
        //this.graphics.lineStyle(1, 0xff0000); // enemy - red
        this.graphics.strokeCircleShape(this.circle);


        // shield - blue square
        this.graphics.lineStyle(1, 0x0000ff); // blue
        for (var i = 0; i < this.rectangles.length; i++) {
            var rectangle = this.rectangles[i];
            var padding = 6.0;
            var randomRange = 4.0;
            rectangle.setTo(this.x - this.planetSize * 0.5 - padding + (Math.random() * randomRange * 2.0 - randomRange),
                this.y - this.planetSize * 0.5 - padding + (Math.random() * randomRange * 2.0 - randomRange),
                this.planetSize + padding * 2.0 + (Math.random() * randomRange * 2.0 - randomRange),
                this.planetSize + padding * 2.0 + (Math.random() * randomRange * 2.0 - randomRange));
            this.graphics.strokeRectShape(rectangle);
        }


    }

    slowUpdate() {
        this.draw();
        this.populations.calculatePopulationChange(this.maxPopulation);
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

    get canMine(): boolean {
        // @todo check alliance
        return this.getTotalPopulationConsumed() <= 0;
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
        return "planet-barren-animation";
    }

    public getTotalPopulationConsumed(): number {
        let populationConsumed: number = 0;

        if (this.populations !== undefined || this.populations != null) {
            populationConsumed += this.populations.calculatePopulationConsumption(this);
        }

        return populationConsumed;
    }
}
