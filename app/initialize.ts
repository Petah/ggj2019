import DefaultScene from './scenes/default';
import UI from './ui';

const game = new Phaser.Game({
    // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    width: UI.width,
    height: UI.height,
    // zoom: 1,
    // resolution: 1,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    // canvas: null,
    // canvasStyle: null,
    // seed: null,
    title: '☕️ Brunch with Phaser and TypeScript', // 'My Phaser 3 Game'
    url: 'https://github.com/samme/brunch-phaser-typescript',
    version: '0.0.1',
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: true
    },
    // disableContextMenu: false,
    // banner: false
    banner: {
        // hidePhaser: false,
        // text: 'white',
        background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
    },
    // fps: {
    //   min: 10,
    //   target: 60,
    //   forceSetTimeout: false,
    // },
    // antialias: false,
    // pixelArt: false,
    // transparent: false,
    // clearBeforeRender: true,
    // backgroundColor: 0x000000, // black
    loader: {
        // baseURL: '',
        path: 'assets/',
        // maxParallelDownloads: 32,
        // crossOrigin: 'anonymous',
        // timeout: 0
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
            }
        }
    },
    scene: DefaultScene,
});
