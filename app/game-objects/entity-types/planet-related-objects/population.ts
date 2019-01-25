import Species from "./species";

export default class Population {
    constructor(
        public species: Species,
        public quantity: number,
        public health: number
    ) {

    }
}