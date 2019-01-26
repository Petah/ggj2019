import Ship from "../ship";
import Assets from "../assets";
import Level from "../level";
import Stars from "../stars";
import Entity from "../entity";
import UI from "../ui";
import Team from "../team";
import Items from "../items";
import PopulationFactory from "../game-objects/entity-types/planet-related-objects/populationObjects/populationFactory";
import Planet from "../planet";
import Enemy from "../enemy";

export default class DefaultScene extends Phaser.Scene {

    public playerShip: Ship;
    public enemyShips: Ship[] = [];
    public level: Level;
    public ui: UI;
    private assets: Assets;
    private stars: Stars;
    public graphics: Phaser.GameObjects.Graphics;
    public entities: Entity[] = [];
    public enemyTeams: Team[] = [];
    public playerTeam: Team;
    public items: Items;
    private numUpdates: number = 0;
    public gameTime: number = 0;

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

        this.graphics = this.add.graphics({});

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

        this.playerTeam = new Team(this, 0x00FF00, true);

        const populationFactory = new PopulationFactory();

        let playerHomePlanet = Planet.getHabitablePlanetFromLevel(this.level);
        playerHomePlanet.populations = populationFactory.generatePopulationForPlanet();
        playerHomePlanet.team = this.playerTeam;
        this.playerShip = new Ship(this, this.playerTeam, playerHomePlanet);
        this.ui.playerShip = this.playerShip;
        this.addEntity(this.playerShip);
        playerHomePlanet.draw();

        //@TODO set back to 3
        const maxEnemyTeams = 3;
        for (let i = 0; i < maxEnemyTeams; i++) {
            let color = Team.randomColor();
            let team = new Team(this, color, false);
            this.enemyTeams.push(team);

            let homePlanet = Planet.getHabitablePlanetFromLevel(this.level);
            homePlanet.team = team;
            homePlanet.populations = populationFactory.generatePopulationForPlanet();

            let enemyShip = new Enemy(this, team, homePlanet);
            this.enemyShips.push(enemyShip);
            this.ui["enemyShip"+i] = enemyShip;
            this.addEntity(enemyShip);
            homePlanet.draw();
        }

        this.ui.drawMiniMap();
        this.ui.slowUpdate();

        this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.startFollow(this.playerShip.image, true, 0.05, 0.05);


        // turn on autdio with loop
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: 1.0,
            config: {
                loop: true
            }
        };
        var music = this.sound.add('bgm');
        music.addMarker(loopMarker);
        music.play('loop', {
            delay: 0
        });

    }

    update() {
        this.numUpdates++;
        let slowUpdate = false;
        if (this.numUpdates % 100 === 0) {
            this.gameTime++;
            slowUpdate = true;
        }
        for (const entity of this.entities) {
            entity.update();
            if (slowUpdate) {
                entity.slowUpdate();
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
    }

    onLoadProgress(progress) {
    }

};
