export default class Planet {
    private image: Phaser.Physics.Arcade.Image;

    constructor(private scene: Phaser.Scene, public x: number, public y: number) {

    }

    create() {
        this.image = this.scene.physics.add.image(this.x, this.y, 'green-circle');
        console.log(this.x, this.y);
    }

    update() {
    }
}
