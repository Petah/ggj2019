import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-types/planetType";


export default class Planet implements Entity {
    id: number;
    private image: Phaser.Physics.Arcade.Image;
    private maxPopulation: number;

    public maxMining: number;
    public maxSpacePort: number;
    public maxIndustry: number;
    public maxAgriculture: number;
    public maxDefence: number;
    public maxEducation: number;

    constructor(
        private scene: DefaultScene,
        public name: string,
        private x: number,
        private y: number,
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

    }

    create() {
        this.image = this.scene.physics.add.image(this.x, this.y, 'green-circle');
    }

    update() {
    }
}
