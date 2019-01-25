import GM from "./gm";
import DefaultScene from "./scenes/default";
import Bullet from "./bullet";
import Entity from "./entity";
import Planet from "./planet";
import UI from "./ui";
import Team from "./team";

export default class Ship implements Entity {
    id: number;

    public image: Phaser.Physics.Arcade.Image;

    public speed: number = 0;
    public direction: number = 0;
    private acceleration: number = 50;
    private maxSpeed: number = 300;

    private stopOnPlanet: Planet = null;
    private stoppedOnPlanet: Planet = null;
    private mining: number = 0;
    private miningSpeed: number = 0.02;

    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private keyMine: Phaser.Input.Keyboard.Key;

    private money: number = 0;
    private colonists: number = 0;
    private maxColonists: number = 1999;
    private cargo: number = 0;
    private maxCargo: number = 1;
    private energy: number = 0;
    private maxEnergy: number = 1;
    private charge: number = 0;
    private maxCharge: number = 1;

    constructor(
        private scene: DefaultScene,
        private team: Team,
    ) {
        this.image = this.scene.physics.add.image(500, 500, 'ship');
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        this.keyMine = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.scene.input.on('pointerdown', (pointer) => {
            const px = this.scene.cameras.main.worldView.x + pointer.x;
            const py = this.scene.cameras.main.worldView.y + pointer.y;
            const direction = GM.pointDirection(this.x, this.y, this.scene.cameras.main.worldView.x + pointer.x, this.scene.cameras.main.worldView.y + pointer.y);
            if (pointer.buttons == 1) {
                if (this.mining <= 0) {
                    this.direction = direction;
                    this.speed = this.maxSpeed;
                    this.stoppedOnPlanet = null;
    
                    const planet = this.planetAtPoint(px, py, 2);
                    if (planet) {
                        this.stopOnPlanet = planet;
                    } else {
                        this.stopOnPlanet = null;
                    }
                }
            }
            if (pointer.buttons == 2) {
                const bullet = new Bullet(this.scene, this.x, this.y, direction);
                this.scene.addEntity(bullet);
            }
        });
    }

    update() {
        // if (this.cursors.space.isDown) {
        //     this.speed -= this.acceleration;
        // } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
        //     GM.motionAdd(this, this.acceleration, 45);
        // } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
        //     GM.motionAdd(this, this.acceleration, 135);
        // } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
        //     GM.motionAdd(this, this.acceleration, 225);
        // } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
        //     GM.motionAdd(this, this.acceleration, 315);
        // } else if (this.cursors.right.isDown) {
        //     GM.motionAdd(this, this.acceleration, 0);
        // } else if (this.cursors.down.isDown) {
        //     GM.motionAdd(this, this.acceleration, 90);
        // } else if (this.cursors.left.isDown) {
        //     GM.motionAdd(this, this.acceleration, 180);
        // } else if (this.cursors.up.isDown) {
        //     GM.motionAdd(this, this.acceleration, 270);
        // }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < 0) {
            this.speed = 0;
        }
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);
        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);

        const planet = this.planetAtPoint(this.x, this.y);
        if (planet && planet === this.stopOnPlanet) {
            this.speed = 0;
            this.stopOnPlanet = null;
            this.stoppedOnPlanet = planet;
            if (this.cargo > 0) {
                this.scene.ui.showModal('modal-sell');
            }
        }

        if (this.keyMine.isDown && this.stoppedOnPlanet) {
            if (this.mining <= 0) {
                this.mining = 1;
            }
        }
        if (this.mining > 0) {
            if (this.cargo < this.maxCargo) {
                this.mining -= this.miningSpeed;
                this.cargo += this.miningSpeed;
                console.log(this.cargo);
            } else {
                this.mining = 0;
            }
        }
    }

    private planetAtPoint(x: number, y: number, size: number = 1) {
        const closest = {
            planet: null,
            distance: null,
        };
        for (const planet of this.scene.level.planets) {
            const distance = GM.pointDistance(x, y, planet.x, planet.y);
            if (distance < (10 * size) && (closest.distance === null || distance < closest.distance)) {
                closest.planet = planet;
                closest.distance = distance;
            }
        }
        return closest.planet;
    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
