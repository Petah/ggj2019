import Ship from "../ship";
import Assets from "../assets";
import Level from "../level";
import Stars from "../stars";

export default class DefaultScene extends Phaser.Scene {

    private progressBar: Phaser.GameObjects.Graphics;
    private ship: Ship;
    public level: Level;
    private assets: Assets;
    private stars: Stars;
    public graphics: Phaser.GameObjects.Graphics;

    constructor() {
        super('default');
        this.progressBar = null;
    }

    init(data) {
        console.debug('init', data, this);
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
        this.level.create();
        this.ship = new Ship(this);
        this.ship.create();
        this.stars = new Stars(this);
        this.stars.create();

        this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.cameras.main.startFollow(this.ship.image, true, 0.05, 0.05);
    }

    update() {
        this.ship.update();
        this.level.update();
        this.stars.update();
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
