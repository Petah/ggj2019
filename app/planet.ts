import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-types/planetType";


export default class Planet extends Entity{
    private image: Phaser.Physics.Arcade.Image;
    private maxPopulation: number;

    public maxMining: number;
    public maxSpacePort: number;
    public maxIndustry: number;
    public maxAgriculture: number;
    public maxDefence: number;
    public maxEducation: number;

    constructor(
        public name: string,
        private scene: Phaser.Scene,
        x: number,
        y: number,
        public mining: number,
        public spacePort: number,
        public industry: number,
        public agriculture: number,
        public defence: number,
        public education: number,
        public population: number,
        public money: number,
        public resources: number,
        public food: number,
        public planetSize: number,
        public plantetType: PlanetType
    ) {
        super(x, y);
    }

    create() {
        this.image = this.scene.physics.add.image(this.x, this.y, 'green-circle');
    }

    update() {
    }
}
