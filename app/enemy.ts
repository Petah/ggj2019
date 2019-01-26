import Ship from "./ship";
import DefaultScene from "./scenes/default";
import Team from "./team";
import Planet from "./planet";
import GM from "./gm";
import Bullet from "./bullet";
import ship from "./ship";

export enum EnemyState {
    ATTACK_ENEMY,
    ATTACK_PLANET,
    MINE_PLANET,
    EVADING
}

export default class Enemy extends Ship {

    public shildColor: number = 0xff0000;

    private states: EnemyState[] = [
        EnemyState.ATTACK_ENEMY,
        EnemyState.ATTACK_PLANET,
        EnemyState.MINE_PLANET
    ];

    private state: EnemyState;
    private framesInstate: number;
    private framesToStateChange: number;

    private minFramesToStateChange = 200;
    private maxFramesToStateChange = 800;

    private attackRange = 300;
    private damageDirection: number;

    constructor(scene: DefaultScene,
                team: Team,
                startPlanet: Planet,) {
        super(scene, team, startPlanet);

        this.changeState();
    }

    update() {
        if (this.checkDeath()) return;

        this.recharge();
        this.lockSpeed();

        if (this.framesInstate++ >= this.framesToStateChange) {
            this.changeState();
        }
        switch (this.state) {
            case EnemyState.ATTACK_ENEMY:
                this.tryShootEnemy();
                break;
            case EnemyState.ATTACK_PLANET:
                this.tryShootPlanet();
                break;
            case EnemyState.MINE_PLANET:
                this.tryMinePlanet();
                break;
            case EnemyState.EVADING:
                this.evade(this.damageDirection);
                break;
        }
    }

    private changeState() {
        this.state = this.states[Math.floor(Math.random() * this.states.length)];
        this.resetFramesInState();

        let stateString = "";
        switch (this.state) {
            case EnemyState.ATTACK_ENEMY:
                stateString = "Attack enemy";
                break;
            case EnemyState.ATTACK_PLANET:
                stateString = "Attack planet";
                break;
            case EnemyState.MINE_PLANET:
                stateString = "Mine planet";
                break;
            case EnemyState.EVADING:
                stateString = "Evading";
                break;
        }
        console.log("State changed to: " + stateString);
    }

    private resetFramesInState() {
        this.framesInstate = 0;
        this.framesToStateChange =
            this.maxFramesToStateChange -
            (Math.random() * this.minFramesToStateChange);
    }

    private tryShootEnemy() {
        const shipInRange = this.findShipToShoot();
        if (shipInRange) {
            this.shoot(shipInRange);
            this.approach(shipInRange);
        } else {
            this.changeState();
        }
    }

    private tryShootPlanet() {
        const planetInRange = this.findPlanetToShoot();
        if (planetInRange) {
            this.shoot(planetInRange);
            this.approach(planetInRange)

        } else {
            this.changeState();
        }
    }

    private tryMinePlanet() {
        const planetInRange = this.findPlanetToMine();
        if (planetInRange) {
            if (this.reachedPlanet(planetInRange)) {
                this.speed = 0;
                this.setStoppedOnPlanet(planetInRange);

                if (!this.mine()) {
                    this.changeState();
                }
            } else {
                this.approach(planetInRange);
            }
        } else {
            this.changeState();
        }
    }

    private approach(target: any) {
        this.direction = GM.pointDirection(this.x, this.y, target.x, target.y);
        this.speed = this.maxSpeed;
        this.move();
    }

    private move() {
        let vx = GM.lengthDirX(this.speed, this.direction);
        let vy = GM.lengthDirY(this.speed, this.direction);

        this.image.setVelocityX(vx);
        this.image.setVelocityY(vy);
    }

    private shoot(target: any) {
        if (GM.pointDistance(this.x, this.y, target.x, target.y) < this.attackRange) {
            const direction = GM.pointDirection(this.x, this.y, target.x, target.y);
            const bullet = new Bullet(this.scene, this.x, this.y, target.x, target.y, direction);
            this.scene.addEntity(bullet);
        }
    }

    private evade(attackDirection: number) {
        if (this.framesInstate % 50 === 0) {
            this.direction = attackDirection + (Math.PI * Math.random());
            this.speed = this.maxSpeed;
        }
        this.move();
    }

    private mine(): Boolean {
        if (this.stoppedOnPlanet && this.stoppedOnPlanet.canMine) {
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
                console.log('Mining...');
                return true;
            } else {
                this.mining = 0;
                console.log('Mining reached max cargo');
                return false;
            }
        }
        console.log('Mining finished');
        return false;
    }

    private trackCircular(target: any) {

    }

    damage(amount: number, blastDirection: number) {
        super.damage(amount, blastDirection);
        this.damageDirection = blastDirection;
        this.state = EnemyState.EVADING;
        this.resetFramesInState();
    }

    private findShipToShoot() {
        let closest = {
            distance: null,
            ship: null,
        };
        for (const ship of this.scene.entities) {
            if (ship instanceof Ship
                && ship !== this) {
                const distance = GM.pointDistance(this.x, this.y, ship.x, ship.y);
                if (!closest.ship || closest.distance > distance) {
                    closest.ship = ship;
                    closest.distance = distance;
                }
            }
        }
        return closest.ship;
    }

    private findPlanetToMine() {
        let closest = {
            distance: null,
            planet: null,
        };
        for (const planet of this.scene.entities) {
            if (planet instanceof Planet
                && !planet.team) {
                const distance = GM.pointDistance(this.x, this.y, planet.x, planet.y);
                if (!closest.planet || closest.distance > distance) {
                    closest.planet = planet;
                    closest.distance = distance;
                }
            }
        }
        return closest.planet;
    }

    private findPlanetToShoot() {
        let closest = {
            distance: null,
            planet: null,
        };
        for (const planet of this.scene.entities) {
            if (planet instanceof Planet
                && planet.team
                && planet.team !== this.team) {
                const distance = GM.pointDistance(this.x, this.y, planet.x, planet.y);
                if (!closest.planet || closest.distance > distance) {
                    closest.planet = planet;
                    closest.distance = distance;
                }
            }
        }
        return closest.planet;
    }

    private reachedPlanet(target: Planet): Boolean {
        return GM.pointDistance(this.x, this.y, target.x, target.y) < 20;
    }
}
