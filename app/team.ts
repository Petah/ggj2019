import DefaultScene from "./scenes/default";
import Entity from "./entity";

export default class Team implements Entity {
    id: number;

    constructor(
        private scene: DefaultScene,
        private color: number,
    ) {
    }

    update() {
    }
};
