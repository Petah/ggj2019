import Planet from "./planet";

export default class Level {
    public width: number = 10000;
    public height: number = 10000;
    private planetCount = 100;
    public planets: Planet[] = [];
    constructor(private scene: Phaser.Scene) {
    }

    create() {

    // line1 = new Phaser.Line(handle1.x, handle1.y, handle2.x, handle2.y);
        for (let i = 0; i < this.planetCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const planet = new Planet(this.scene, x, y);
            planet.create();
            this.planets.push(planet);
        }
    }

    update() {
        for (const planet of this.planets) {
            planet.update();
        }
    }
}

