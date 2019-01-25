import PlanetType from "./planetType";

export default class Species {
    constructor(
        public speciesName: string,
        public imageLocation: string,
        public populationUnitControl: string,
        public foodConsumption: string,
        public prefferedPlanetType: PlanetType
    ) {

    }
}