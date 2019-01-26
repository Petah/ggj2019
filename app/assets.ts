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
        this.scene.load.image('ship2', 'ship2.png');
        this.scene.load.image('ship3', 'ship3.png');
        this.scene.load.image('ship4', 'ship4.png');
        this.scene.load.image('laser', 'laser.png');

        var planetNames = ["barren", "continental", "desert", "forest", "gaia", "gasgiant", "ice", "jungle", "ocean", "tundra", "volcanic"];
        for (var planetName of planetNames) {
            this.scene.load.spritesheet("planet-" + planetName, "planet-" + planetName + "-sprite.png", {
                frameWidth: 72,
                frameHeight: 69,
            });
        }
        this.scene.load.spritesheet("explosion", "explosion-sprite.png", {
            frameWidth: 64,
            frameHeight: 64,
        });


        this.scene.load.audio('bgm', 'audio/Warpath BGM.mp3');
        this.scene.load.audio('numkey', 'audio/numkey.wav');
        this.scene.load.audio('mining', 'audio/mining.mp3');
        this.scene.load.audio('explosion', 'audio/explosion.mp3');
        this.scene.load.audio('lazer', 'audio/lazer.wav');
        this.scene.load.audio('menu_switch', 'audio/menu_switch.mp3');
        this.scene.load.audio('nooo', 'nooo.mp3');
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
                frameRate: Math.random() * 10 + 10,
                repeat: -1,
            });
        }

        this.scene.anims.create({
            key: "explosion-animation",
            frames: this.scene.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 18,
            }),
            frameRate: Math.random() * 10 + 10,
            repeat: 0,
        });

    }
}
