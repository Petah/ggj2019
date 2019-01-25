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

        this.scene.load.spritesheet('planet-gaia', 'planet-gaia-sprite.png', {
            frameWidth: 72,
            frameHeight: 69,
        });
        this.scene.load.spritesheet('planet-ice', 'planet-ice-sprite.png', {
            frameWidth: 72,
            frameHeight: 69,
        });
        this.scene.load.spritesheet('planet-tundra', 'planet-tundra-sprite.png', {
            frameWidth: 72,
            frameHeight: 69,
        });
        this.scene.load.spritesheet('planet-barren', 'planet-barren-sprite.png', {
            frameWidth: 72,
            frameHeight: 69,
        });
    }

    create() {
        this.scene.anims.create({
            key: 'planet-gaia-animation',
            frames: this.scene.anims.generateFrameNumbers('planet-gaia', {
                start: 0,
                end: 18,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'planet-ice-animation',
            frames: this.scene.anims.generateFrameNumbers('planet-ice', {
                start: 0,
                end: 18,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'planet-tundra-animation',
            frames: this.scene.anims.generateFrameNumbers('planet-tundra', {
                start: 0,
                end: 18,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'planet-barren-animation',
            frames: this.scene.anims.generateFrameNumbers('planet-barren', {
                start: 0,
                end: 18,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }
}
