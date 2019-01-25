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

        this.scene.load.spritesheet('planet1', 'planet1-sprite.png', {
            frameWidth: 72,
            frameHeight: 72,
        });
    }

    create() {
        this.scene.anims.create({
            key: 'planet1-animation',
            frames: this.scene.anims.generateFrameNumbers('planet1', {
                start: 0,
                end: 18,
            }),
            frameRate: 30,
            repeat: -1,
        });
    }
}
