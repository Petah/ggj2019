import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-types/planetType";


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
        this.scene.anims.create({
            key: 'start',
            frames: this.scene.anims.generateFrameNumbers('planet1',  { start: 0, end: 18 } ),
            frameRate: 30,
            repeat: -1
        });
        var scale = Math.random() * 0.2 + 0.1;
        var sprite = this.scene.add.sprite(50, 300, 'planet1').setScale(scale, scale)
        sprite.play('start');
    }

    update() {
    }
}
