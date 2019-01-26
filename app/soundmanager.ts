import GM from "./gm";
import DefaultScene from "./scenes/default";

export default class SoundManager {

    constructor(
        private scene: DefaultScene
    ) {

    }

    playFromLocation(name: string, x: number, y: number) {
        if (this.scene != null) {
            // var horizontalDistance = Math.abs(x - this.scene.playerShip.x);
            // var verticalDistance = Math.abs(y - this.scene.playerShip.y);
            // var distance = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance);
            var distance = GM.pointDistance(this.scene.playerShip.x, x, this.scene.playerShip.y, y);
            var maxDistance = 100.0;
            var volume = (distance < maxDistance) ? (maxDistance - distance) / maxDistance : 0.0;
            console.log("player: (x:" + this.scene.playerShip.x + ", y: " + this.scene.playerShip.y + ")");
            console.log("blast: (x:" + x + ", y: " + y + ")");
            console.log("distance: " + distance + ", volume: " + volume);
            this.play(name, volume);
        }
    }
    play(name: string, volume: number = null) {
        if (this.scene != null) {
            this.scene.sound.add(name).play(null, {
                volume: (volume != null) ? volume : 1.0
            });
        }
    }
    playLoop(name: string, duration: number, volume: number = null) {
        if (this.scene != null) {
            var loopMarker = {
                name: 'loop',
                start: 0,
                duration: duration,
                config: {
                    loop: true
                }
            };
            var music = this.scene.sound.add(name);
            music.addMarker(loopMarker);
            music.play('loop', {
                volume: (volume != null) ? volume : 1.0
            });
        }
    }

    
};