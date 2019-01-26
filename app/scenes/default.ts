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
import Human from "../game-objects/entity-types/planet-related-objects/populationObjects/human";
import Ork from "../game-objects/entity-types/planet-related-objects/populationObjects/ork";

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

        const maxEnemyTeams = 3;

        // Make the teams
        this.playerTeam = new Team(this, 0x00FF00, true, 1);
        for (let i = 0; i < maxEnemyTeams; i++) {
            const color = Team.randomColor();
            const enemyTeam = new Team(this, color, false, i + 2);
            this.enemyTeams.push(enemyTeam);

        }

        // Set the home planets
        let playerHomePlanet = Planet.getHabitablePlanetFromLevel(this.level);
        playerHomePlanet.populations.quantity = 1000;
        playerHomePlanet.populations.species = new Human();
        playerHomePlanet.team = this.playerTeam;
        playerHomePlanet.populations.setAllegianceForTeam(this.playerTeam, 100);

        const enemyHomePlanets = [];
        for (const enemyTeam of this.enemyTeams) {
            let enemyHomePlanet = Planet.getHabitablePlanetFromLevel(this.level);
            enemyHomePlanet.team = enemyTeam;
            enemyHomePlanet.populations.quantity = 1000;
            enemyHomePlanet.populations.species = new Ork();
            enemyHomePlanet.populations.setAllegianceForTeam(enemyTeam, 100);
            enemyHomePlanets.push(enemyHomePlanet);
        }

        // Spawn the ships
        this.playerShip = new Ship(this, this.playerTeam, playerHomePlanet);
        this.ui.playerShip = this.playerShip;
        this.addEntity(this.playerShip);
        playerHomePlanet.draw();
        
        for (let i = 0; i < maxEnemyTeams; i++) {
            const enemyTeam = this.enemyTeams[i];
            let enemyShip = new Enemy(this, enemyTeam, enemyHomePlanets[i]);
            this.enemyShips.push(enemyShip);
            this.ui["enemyShip"+i] = enemyShip;
            this.addEntity(enemyShip);
            enemyHomePlanets[i].draw();
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
            duration: 120.0,
            config: {
                loop: true
            }
        };
        var music = this.sound.add('bgm');
        music.addMarker(loopMarker);
        music.play('loop', {
            delay: 0,
            volume: 0.1
        });

    }

    update() {
        this.numUpdates++;
        let slowUpdate = false;
        if (this.numUpdates % 100 === 0) {
            this.gameTime++;
            slowUpdate = true;
            this.ui.slowUpdate();
        }
        for (const entity of this.entities) {
            entity.update();
            if (slowUpdate) {
                entity.slowUpdate();
            }
        }
        if (this.numUpdates % 3 === 0) {
            this.ui.updateUi();
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
