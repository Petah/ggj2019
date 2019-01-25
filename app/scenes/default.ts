import Ship from "../ship";
import Assets from "../assets";

export default class DefaultScene extends Phaser.Scene {

    private progressBar: Phaser.GameObjects.Graphics;
    private logo: Phaser.Physics.Arcade.Image;
    private ship: Ship;
    private assets: Assets;

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

        this.load.image('sky', 'space3.png');
        this.progressBar = this.add.graphics();
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    create() {
        this.ship = new Ship(this);
        this.ship.create();
    }

    update() {
        this.ship.update();
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
