import DefaultScene from "./scenes/default";

export default class Assets {
    constructor(private scene: DefaultScene) {
    }

    preload() {
        this.scene.load.image('red-circle', 'red-circle.png');
        this.scene.load.image('green-circle', 'green-circle.png');
        this.scene.load.image('blue-circle', 'blue-circle.png');
        this.scene.load.image('star', 'star.png');
        this.scene.load.image('bullet', 'bullet.png');
        this.scene.load.image('ship', 'ship.png');

        
        var planetNames = ["barren", "continental", "desert", "forest", "gaia", "gasgiant", "ice", "jungle", "ocean", "tundra", "volcanic"];
        for (var planetName of planetNames) {
            this.scene.load.spritesheet("planet-" + planetName, "planet-" + planetName + "-sprite.png", {
                frameWidth: 72,
                frameHeight: 69,
            });    
        }


    }

    create() {
        var planetNames = ["barren", "continental", "desert", "forest", "gaia", "gasgiant", "ice", "jungle", "ocean", "tundra", "volcanic"];
        for (var planetName of planetNames) {
            this.scene.anims.create({
                key: "planet-" + planetName + "-animation",
                frames: this.scene.anims.generateFrameNumbers("planet-" + planetName, {
                    start: 0,
                    end: 18,
                }),
                frameRate: Math.random() * 2,
                repeat: -1,
            });
        }

    }
}
