import DefaultScene from "./scenes/default";
import Entity from "./entity";
import PlanetType from "./game-objects/entity-types/planet-related-objects/planetType";
import Population from "./game-objects/entity-types/planet-related-objects/populationObjects/population";
import Level from "./level";
import GM from "./gm";
import Ship from "./ship";
import Bullet from "./bullet";
import Team from "./team";

export default class Planet implements Entity {
    private image: Phaser.Physics.Arcade.Sprite;
    private maxPopulation: number;

    public maxMining: number;
    public maxSpacePort: number;
    public maxIndustry: number;
    public maxAgriculture: number;
    public maxDefence: number;
    public maxEducation: number;
    public maxInfastrucutre: number;
    public maxHealth: number;
    public team: Team = null;

    public planetType: PlanetType;
    public isShipStopped: boolean = false;
    public isCursorOn: boolean = false;

    private circle: Phaser.Geom.Circle;
    private rectangles: Array<Phaser.Geom.Rectangle>;
    private graphics: Phaser.GameObjects.Graphics;
    private planetScale: number;
    private planetSize: number;
    private nameText: Phaser.GameObjects.Text;

    public attackRange = 200;
    public attackPower = 200;

    public shield: number = 0;
    public maxShield: number = 0;

    constructor(
        private scene: DefaultScene,
        public name: string,
        public x: number,
        public y: number,
        // infrastructure
        public mining: number,
        public spacePort: number,
        public industry: number,
        public agriculture: number,
        public defence: number,
        public education: number,
        public populations: Population,
        public health: number,
        public money: number,
        public resources: number,
        public food: number,
        public size: number,
        public type: PlanetType
    ) {
        this.planetSize = size;
        this.planetScale = size / 74.0;
        this.planetType = type;

        var sprite = this.scene.add.sprite(this.x, this.y, this.spriteNameFor(type)).setScale(this.planetScale, this.planetScale);
        sprite.depth = 100;
        sprite.play(this.animationNameFor(type));

        this.nameText = this.scene.add.text(x + 15, y + 15, "");
        this.image = this.scene.physics.add
            .staticSprite(this.x, this.y, this.spriteNameFor(this.planetType))
            .setScale(this.planetScale, this.planetScale);

        this.image.depth = 100;
        this.image.play(this.animationNameFor(this.planetType));

        this.scene.physics.world.step(0);

        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xdddddd,
            }
        });
        this.circle = new Phaser.Geom.Circle(this.x - 1, this.y - 1, size * 0.5 + 1);
        this.rectangles = Array<Phaser.Geom.Rectangle>();
        for (let i = 0; i < 3; i++) {
            this.rectangles.push(new Phaser.Geom.Rectangle(this.x - size * 0.5, this.y - size * 0.5, size, size));
        }

        this.createMaxPopulationLimit();
    }

    update() {
        this.graphics.clear();

        var color = 0xffffff; // unoccupied - white
        var colorText = "#ffffff";

        if (this.getTotalPopulationConsumed() > 0) {
            if (false) { // neutral - yellow
                color = 0xffff00;
                colorText = "#ffff00";
            } else if (true) { // ally - green
                color = 0x00ff00;
                colorText = "#00ff00";
            } else if (true) { // enemy - red
                color = 0xff0000;
                colorText = "#ff0000";
            }
        }

        // circle
        this.graphics.lineStyle(1, color);
        this.graphics.strokeCircleShape(this.circle);

        // text
        if (this.isShipStopped || this.isCursorOn) {
            this.graphics.strokeLineShape(new Phaser.Geom.Line(
                this.x,
                this.y,
                this.x + 15,
                this.y + 15));
            this.nameText.setText(this.name);
            this.nameText.setColor(colorText)
        }
        else {
            this.nameText.setText("");
        }

        // shield - blue square
        for (var i = 0; i < this.rectangles.length; i++) {
            if (i >= this.maxShield) {
                continue;
            }
            let color = 0x0000FF;
            if (i == 0) {
                color = this.getShieldColor(this.shield % 1);
            }
            var rectangle = this.rectangles[i];
            var padding = 6.0;
            var randomRange = 3.0;
            rectangle.setTo(
                (this.x - 1) - this.planetSize * 0.5 - padding + (Math.random() * randomRange * 2.0 - randomRange),
                (this.y - 1) - this.planetSize * 0.5 - padding + (Math.random() * randomRange * 2.0 - randomRange),
                this.planetSize + padding * 2.0 + (Math.random() * randomRange * 2.0 - randomRange),
                this.planetSize + padding * 2.0 + (Math.random() * randomRange * 2.0 - randomRange),
            );
            this.graphics.lineStyle(1, color, 0.7);
            this.graphics.strokeRectShape(rectangle);
        }

        const shipToShoot = this.findShipToShootAt();
        if (shipToShoot && this.team && shipToShoot.team !== this.team) {
            const direction = GM.pointDirection(this.x, this.y, shipToShoot.x, shipToShoot.y);
            const bullet = new Bullet(this.scene, this.x, this.y, shipToShoot.x, shipToShoot.y, direction);
            this.scene.addEntity(bullet);
        }
    }

    private getShieldColor(amount) {
        amount = Math.ceil(amount * 5);
        switch (amount) {
            case 1: return 0xFF0000;
            case 2: return 0xFF0077;
            case 3: return 0xFF00FF;
            case 4: return 0x7700FF;
            case 5: return 0x0000FF;
        }
        return 0x0000FF;
    }

    private findShipToShootAt() {
        let closest = {
            distance: null,
            ship: null,
        };
        for (const ship of this.scene.entities) {
            if (ship instanceof Ship) {
                const distance = GM.pointDistance(this.x, this.y, ship.x, ship.y);
                if (!closest.ship || closest.distance > distance) {
                    closest.ship = ship;
                    closest.distance = distance;
                }
            }
        }
        if (closest.distance < this.attackRange) {
            return closest.ship;
        }
        return null;
    }

    slowUpdate() {
        this.draw();
        this.populations.calculatePopulationChange(this.maxPopulation);
    }

    private createMaxPopulationLimit() {
        var temp = 10000000;
        this.maxPopulation = temp * this.planetType.maxPopulationModifier * this.planetSize;
    }

    get infrastructureLevel(): number {
        return this.agriculture
            + this.industry
            + this.defence
            + this.mining
            + this.spacePort
            + this.education;
    }

    get maxInfrastructureLevel(): number {
        return this.maxAgriculture
            + this.maxIndustry
            + this.maxDefence
            + this.maxMining
            + this.spacePort
            + this.maxEducation
    }

    draw() {
        this.graphics.clear();
        if (this.getTotalPopulationConsumed() > 0) {
            this.graphics.lineStyle(1, 0x00ff00);
        } else {
            this.graphics.lineStyle(1, 0xdddddd);
        }
        this.graphics.strokeCircleShape(this.circle);
    }

    get canSell(): boolean {
        // @todo check alliance
        return this.getTotalPopulationConsumed() > 0;
    }

    get canMine(): boolean {
        // @todo check alliance
        return this.getTotalPopulationConsumed() <= 0;
    }

    public canInvest(team: Team): boolean {
        let canInvest = true;

        if (this.getTotalPopulationConsumed() <= 0
            || this.infrastructureLevel >= this.maxInfrastructureLevel
            || this.populations.getAllegianceForPlayer(team) <= 0) {
            canInvest = false;
        }

        return canInvest
    }

    // private functions
    private spriteNameFor(planetType: PlanetType) {
        switch (planetType.typeName) {
            case "Gas Giant":
                return "planet-gasgiant";
            case "Volcanic":
                return "planet-volcanic";
            case "Continental":
                return "planet-continental";
            case "Jungle":
                return "planet-jungle";
            case "Forest":
                return "planet-forest";
            case "Desert":
                return "planet-desert";
            case "Barren":
                return "planet-barren";
            case "Ocean":
                return "planet-ocean";
            case "Ice":
                return "planet-ice";
            case "Tundra":
                return "planet-tundra";
            case "Gaia":
                return "planet-gaia";
        }
        return "planet-barren";
    }

    private animationNameFor(planetType: PlanetType) {
        switch (planetType.typeName) {
            case "Gas Giant":
                return "planet-gasgiant-animation";
            case "Volcanic":
                return "planet-volcanic-animation";
            case "Continental":
                return "planet-continental-animation";
            case "Jungle":
                return "planet-jungle-animation";
            case "Forest":
                return "planet-forest-animation";
            case "Desert":
                return "planet-desert-animation";
            case "Barren":
                return "planet-barren-animation";
            case "Ocean":
                return "planet-ocean-animation";
            case "Ice":
                return "planet-ice-animation";
            case "Tundra":
                return "planet-tundra-animation";
            case "Gaia":
                return "planet-gaia-animation";
        }
        return "planet-barren-animation";
    }

    public getTotalPopulationConsumed(): number {
        let populationConsumed: number = 0;

        if (this.populations !== undefined || this.populations != null) {
            populationConsumed += this.populations.calculatePopulationConsumption();
        }

        return populationConsumed;
    }

    static getHabitablePlanetFromLevel(level: Level): Planet {
        let planet: Planet = null;
        let bail = 100;
        do {
            const tempPlanet = level.planets[Math.floor(Math.random() * level.planets.length)];
            if (tempPlanet.populations.calculatePopulationConsumption() == 0) {
                planet = tempPlanet;
                break;
            }
            if (bail-- <= 0) {
                throw new Error('Can not find home planet');
            }
        } while (planet === null);

        return planet;
    }
}
