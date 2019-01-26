import GM from "./gm";
import DefaultScene from "./scenes/default";
import Bullet from "./bullet";
import Entity from "./entity";
import Planet from "./planet";
import UI from "./ui";
import Team from "./team";
import { Item } from "./items";
import Laser from "./laser";

class ShipItem {
    public amount: number = 0;

    constructor(
        public item: Item,
    ) {
    }
}

interface ItemMap { [key: string]: ShipItem; };

export default class Ship implements Entity {
    id: number;

    public image: Phaser.Physics.Arcade.Image;

    public speed: number = 0;
    public direction: number = 0;
    private acceleration: number = 50;
    private maxSpeed: number = 300;

    private stopOnPlanet: Planet = null;
    public stoppedOnPlanet: Planet = null;
    private mining: number = 0;
    private miningSpeed: number = 0.02;

    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private keyMine: Phaser.Input.Keyboard.Key;

    public money: number = 500;
    public colonists: number = 0;
    public maxColonists: number = 1999;
    public cargo: number = 0;
    public maxCargo: number = 1;
    public energy: number = 1;
    public maxEnergy: number = 1;
    public charge: number = 1;
    public maxCharge: number = 1;

    public dead: number = 0;

    public items: ItemMap = {};
    public isGathering: boolean;

    private graphics: Phaser.GameObjects.Graphics;

    constructor(
        private scene: DefaultScene,
        private team: Team,
        startPlanet: Planet,
    ) {
        this.stoppedOnPlanet = startPlanet;
        this.image = this.scene.physics.add.image(startPlanet.x, startPlanet.y - 10, 'ship');
        this.image.depth = 200;
        this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        this.keyMine = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        
        this.scene.input.on('pointerdown', (pointer) => {
            if (this.dead > 0) {
                return;
            }
            
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
                // const bullet = new Bullet(this.scene, this.x, this.y, px, py, direction);
                // this.scene.addEntity(bullet);

                const fireCost = 0.1; // @todo get charge amount from item
                if (this.charge > fireCost) {
                    this.charge -= fireCost;
                    const laser = new Laser(this.scene, this, px, py, direction);
                    this.scene.addEntity(laser);
                }
            }
        });

        for (const item of this.scene.items.items) {
            this.items[item.key] = new ShipItem(item);
        }

        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xdddddd,
            }
        });
        this.isGathering = true; // tmp...
    }

    update() {
        if (this.dead > 0) {
            this.dead--;
            if (this.dead <= 0) {
                this.image.alpha = 1;
                // @todo respawn as owned planet
            }
            return;
        }

        this.charge += 0.001;
        if (this.charge > this.maxCharge) {
            this.charge = this.maxCharge;
        }
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
            if (this.cargo > 0 && this.stoppedOnPlanet.canSell) {
                this.scene.ui.showModalSell();
            }
        }

        if (this.keyMine.isDown && this.stoppedOnPlanet && this.stoppedOnPlanet.canMine) {
            if (this.mining <= 0) {
                this.mining = 0.50 + (0.45 * Math.random());
            }
        }
        if (this.mining > 0) {
            if (this.cargo < this.maxCargo) {
                let miningAmount = 0;
                if (this.stoppedOnPlanet.resources > this.miningSpeed) {
                    miningAmount = this.miningSpeed;
                } else if (this.stoppedOnPlanet.resources > 0) {
                    miningAmount = this.stoppedOnPlanet.resources;
                } else {
                    this.mining = 0;
                }
                if (this.cargo + miningAmount > this.maxCargo) {
                    miningAmount = this.maxCargo - this.cargo;
                }
                this.stoppedOnPlanet.resources -= miningAmount;
                this.mining -= miningAmount;
                this.cargo += miningAmount;
            } else {
                this.mining = 0;
            }
        }


        this.graphics.clear();

        if (this.isGathering) {
            if (this.stoppedOnPlanet != null) {          
                this.graphics.lineStyle(1, 0x0000ff); // blue
                for (var i=0; i<10; i++) {
                    var randomRange = 20.0;
                    var line = new Phaser.Geom.Line(
                        this.x, 
                        this.y, 
                        this.stoppedOnPlanet.x + (Math.random() * randomRange*2.0 - randomRange), 
                        this.stoppedOnPlanet.y + (Math.random() * randomRange*2.0 - randomRange));
                    this.graphics.strokeLineShape(line);
                }
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
            if (distance < (50 * size) && (closest.distance === null || distance < closest.distance)) {
                closest.planet = planet;
                closest.distance = distance;
            }
        }
        return closest.planet;
    }

    sell(amount: number = null) {
        if (!this.stoppedOnPlanet || this.cargo <= 0) {
            return;
        }
        if (!amount || amount > this.cargo) {
            amount = this.cargo;
        }
        this.cargo -= amount;
        this.stoppedOnPlanet.resources += amount;
        // @todo make planet adjust price based on demand
        this.money += amount * 1000;
    }

    buyItem(item: Item, amount: number) {
        if (item.key == 'cargo-pod') {
            if (this.maxCargo < 6) {
                this.maxCargo += 1;
                this.money -= item.price;
            }
        } else if (item.key == 'energy-pod') {
            if (this.maxEnergy < 6) {
                this.maxEnergy += 1;
                this.money -= item.price;
            }
        } else if (item.key == 'charge-pod') {
            if (this.maxCharge < 6) {
                this.maxCharge += 1;
                this.money -= item.price;
            }
        } else {
            if (item.price * amount > this.money) {
                amount = Math.floor(this.money / item.price);
            }
            this.items[item.key].amount += amount;
            this.money -= item.price * amount;
        }
    }

    damage(amount: number) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.dead = 100;
            this.image.alpha = 0;
        }
    }

    get x() {
        return this.image.x;
    }

    get y() {
        return this.image.y;
    }
};
