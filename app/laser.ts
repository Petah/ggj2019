import GM from "./gm";
import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Blast from "./blast";
import Ship from "./ship";

export default class Laser implements Entity{
    private image: Phaser.Physics.Arcade.Image;
    private speed: number = 800;

    private line: Phaser.Geom.Line;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(
        private scene: DefaultScene,
        private ship: Ship,
        private dx: number,
        private dy: number,
        private direction: number,
    ) {
        this.image = this.scene.physics.add.image(ship.x, ship.y, 'laser');
        
        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0x00ff00,
            }
        });
        this.graphics.depth = 300;
        this.line = new Phaser.Geom.Line(this.x, this.y, this.ship.x, this.ship.y);
    }

    update() {
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.angle = this.direction;
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);
        
        this.line.x1 = this.x;
        this.line.y1 = this.y;
        this.line.x2 = this.ship.x;
        this.line.y2 = this.ship.y;
        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);

        const distance = GM.pointDistance(this.x, this.y, this.dx, this.dy);
        if (distance < 10) {
            this.graphics.destroy();
            this.scene.removeEntity(this);
            const blast = new Blast(this.scene, this.x, this.y, this.direction);
            this.scene.addEntity(blast);
        }
    }
    
    slowUpdate() {

    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
