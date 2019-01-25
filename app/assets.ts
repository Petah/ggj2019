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
    }
}
