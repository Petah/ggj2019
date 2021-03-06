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
        this.scene.load.image('torpedo', 'torpedo.png')
        this.scene.load.image('mine', 'mine.png');
        this.scene.load.image('hot-torpedo', 'hot-torpedo.png')
        this.scene.load.image('nuke', 'nuke.png')
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

        this.scene.load.spritesheet("nuclear-explosion", "explosion-sprite2.png", {
            frameWidth: 126,
            frameHeight: 124,
        });

        for (const explosionName of ["explosion", "explosion1", "explosion2", "explosion3", "explosion4"]) {
            this.scene.load.spritesheet(explosionName, explosionName + "-sprite.png", {
                frameWidth: 64,
                frameHeight: 64,
            });
        }

        this.scene.load.audio('bgm', 'audio/Warpath BGM.mp3');
        this.scene.load.audio('numkey', 'audio/numkey.wav');
        this.scene.load.audio('mining', 'audio/mining.mp3');
        this.scene.load.audio('explosion', 'audio/explosion.mp3');
        this.scene.load.audio('lazer', 'audio/lazer.wav');
        this.scene.load.audio('laser', 'audio/laser.mp3');
        this.scene.load.audio('laser-hit', 'audio/laser-hit.wav');
        this.scene.load.audio('nuke-exp', 'audio/nuke-exp.wav');
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
        var explosionNames = ["explosion1", "explosion2", "explosion3", "explosion4"];
        for (var explosionName of explosionNames) {
            this.scene.anims.create({
                key: explosionName + "-animation",
                frames: this.scene.anims.generateFrameNumbers(explosionName, {
                    start: 0,
                    end: 64,
                }),
                frameRate: 200,
                repeat: 0,
            });
        }
        

        this.scene.anims.create({
            key: "nuclear-explosion-animation",
            frames: this.scene.anims.generateFrameNumbers("nuclear-explosion", {
                start: 0,
                end: 15,
            }),
            frameRate: Math.random() * 10 + 10,
            repeat: 0,
        });
    }
}
