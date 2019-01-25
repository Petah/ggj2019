export default class Assets {
    constructor(private scene: Phaser.Scene) {
    }

    preload() {
        this.scene.load.image('red-circle', 'red-circle.png');
    }
}
