import Ship from "../ship";
import Assets from "../assets";
import Level from "../level";
import Stars from "../stars";
import Entity from "../entity";
import UI from "../ui";
import Team from "../team";
import Items from "../items";
import Population from "../game-objects/entity-types/planet-related-objects/populationObjects/population";
import PopulationFactory from "../game-objects/entity-types/planet-related-objects/populationObjects/populationFactory";
import Planet from "../planet";


export default class DefaultScene extends Phaser.Scene {

    private ship: Ship;
    public level: Level;
    public ui: UI;
    private assets: Assets;
    private stars: Stars;
    public graphics: Phaser.GameObjects.Graphics;
    public entities: Entity[] = [];
    public teams: Team[] = [];
    public team: Team;
    public items: Items;
    private numUpdates: number = 0;

    constructor() {
        super('default');
    }

    init(data) {
        console.debug('init', data, this);
        this.ui = new UI(this);
        this.addEntity(this.ui);
    }

    preload() {
        this.assets = new Assets(this);
        this.assets.preload();

        this.graphics = this.add.graphics({
        });

        this.load.image('sky', 'space3.png');
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    create() {
        this.assets.create();

        this.items = new Items(this);

        this.level = new Level(this);
        this.addEntity(this.level);

        this.stars = new Stars(this);
        this.addEntity(this.stars);

        const teamColor = 0x00FF00;
        this.team = new Team(this, teamColor);

        let homePlanet: Planet = null;
        let bail = 100;
        do {
            const tempPlanet = this.level.planets[Math.floor(Math.random() * this.level.planets.length)];
            if (tempPlanet.planetType.typeName === "Continental" && tempPlanet.populations.calculatePopulationConsumption() == 0) {
                homePlanet = tempPlanet;
                break;
            }

            if (bail-- <= 0) {
                throw new Error('Can not find home planet');
            }
        } while (homePlanet === null);


        homePlanet.populations = new PopulationFactory().generatePopulationForPlanet(homePlanet);

        this.ship = new Ship(this, this.team, homePlanet);
        this.ui.ship = this.ship;
        this.addEntity(this.ship);
        homePlanet.draw();

        this.ui.drawMiniMap();

        this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.startFollow(this.ship.image, true, 0.05, 0.05);
    }

    update() {
        this.numUpdates++;
        for (const entity of this.entities) {
            entity.update();
            if(entity instanceof Planet && this.numUpdates % 1000 === 0) {
              (entity as Planet).slowUpdate();
            }
        }
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }

    onLoadComplete(loader, totalComplete, totalFailed) {
        console.log('onLoadComplete');
    }

    onLoadProgress(progress) {
        console.log('onLoadProgress');
    }

};
