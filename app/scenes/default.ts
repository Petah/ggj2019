import Ship from "../ship";
import Assets from "../assets";
import Level from "../level";
import Stars from "../stars";
import Entity from "../entity";
import UI from "../ui";

export default class DefaultScene extends Phaser.Scene {

    private progressBar: Phaser.GameObjects.Graphics;
    private ship: Ship;
    public level: Level;
    public ui: UI;
    private assets: Assets;
    private stars: Stars;
    public graphics: Phaser.GameObjects.Graphics;
    public entities: Entity[] = [];

    constructor() {
        super('default');
        this.progressBar = null;
    }

    init(data) {
        console.debug('init', data, this);
        this.ui = new UI();
    }

    preload() {
        this.assets = new Assets(this);
        this.assets.preload();

        this.graphics = this.add.graphics({
        });

        this.load.image('sky', 'space3.png');
        this.progressBar = this.add.graphics();
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    create() {
        this.level = new Level(this);
        this.addEntity(this.level);

        this.stars = new Stars(this);
        this.addEntity(this.stars);

        this.ship = new Ship(this);
        this.addEntity(this.ship);

        this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.setBounds(0, 0, this.level.width, this.level.height);
        this.cameras.main.startFollow(this.ship.image, true, 0.05, 0.05);
    }

    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    onLoadComplete(loader, totalComplete, totalFailed) {
        console.debug('complete', totalComplete);
        console.debug('failed', totalFailed);
        this.progressBar.destroy();
    }

    onLoadProgress(progress) {
        console.debug('progress', progress);
        this.progressBar
            .clear()
            .fillStyle(0xffffff, 0.75)
            .fillRect(0, 0, 800 * progress, 50);
    }

};
