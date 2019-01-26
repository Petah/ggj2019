import Ship from "./ship";
import DefaultScene from "./scenes/default";
import Team from "./team";
import Planet from "./planet";

export default class Enemy extends Ship {

    public shildColor: number = 0xff0000;

    constructor(scene: DefaultScene,
                team: Team,
                startPlanet: Planet,) {
        super(scene, team, startPlanet);
    }


}