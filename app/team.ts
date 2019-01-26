import DefaultScene from "./scenes/default";
import Entity from "./entity";

export default class Team implements Entity {
    id: number;

    constructor(
        private scene: DefaultScene,
        public color: number,
        public isPlayerTeam: Boolean
    ) {
    }

    static randomColor() {
      return 0x1000000+(Math.random())*0xffffff;
    }

    update() {
    }
};
